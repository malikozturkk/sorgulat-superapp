'use client';
import { TimeData, PopulerCities } from '@/app/saat-kac/types/Timezone.types';
import { getRequest } from '@/utils/api';
import { padZero } from '@/utils/formatter';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function LiveClock({ initialTime, fontSizeType = 'large' }: { initialTime: TimeData, fontSizeType?: 'large' | 'small' }) {
    const [clientData, setClientData] = useState(initialTime)
    const [currentTime, setCurrentTime] = useState<Date>(new Date(initialTime.dateTime));
    const [fullScreen, setFullScreen] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchTime = async () => {
            const response: TimeData = await getRequest(`/timezones/${initialTime.timezone.slug}`);
            setCurrentTime(new Date(response?.dateTime || Date.now()));
            setClientData(response)
        };

        const fetchInterval = setInterval(fetchTime, 10000);
        return () => clearInterval(fetchInterval);
    }, []);

    const date = new Date(clientData.dateTime);

    const formattedDate = new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
    }).format(date);

    const fontSize = fullScreen ? "20vw" : fontSizeType === 'small' ? '6vw' : '12vw'

    return (
        <div className='flex flex-col gap-4 w-full mx-auto max-w-7xl'>
            <button
                className={`transition-all duration-300 gap-2 md:gap-4
                ${fullScreen
                        ? "fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-white z-50 p-6 md:p-8"
                        : "flex flex-col items-center justify-center text-xl p-4 border-4 rounded-2xl shadow-xl border-primary relative"
                    } ${fontSizeType === "small" ? "m-0" : "mx-4 sm:mx-6 lg:mx-8" }`}
                onClick={() => setFullScreen(!fullScreen)}
            >
                {fullScreen &&
                    <div className='absolute right-8 top-8 w-9 md:w-12 curspo' onClick={() => setFullScreen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path
                                fill="#646ecb"
                                fillRule="evenodd"
                                d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414Z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                }
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-extrabold text-xl md:text-4xl'>{clientData?.timezone?.name}'<span className='font-normal'>{clientData?.locationText} saat kaç</span></h1>
                    {!fullScreen && clientData?.timezone?.name !== clientData.timezone.country && (<div className='font-extrabold text-xs p-1 absolute -right-4 -top-4 bg-primary text-white rounded-full md:p-2 md:text-xl'>{clientData.timezone.country}</div>)}
                </div>
                <time className='font-bold leading-none' style={{ fontSize }}>
                    {new Intl.DateTimeFormat('tr-TR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                        timeZone: clientData?.timezone.timezone,
                    }).format(currentTime)}
                </time>
                <p className='text-lg md:text-4xl w-full text-right'>{formattedDate}</p>
            </button>
            <summary className={`text-base flex items-center flex-wrap gap-2 justify-end max-w-7xl md:text-2xl ${fontSizeType === "small" ? "m-0" : "mx-4 sm:mx-6 lg:mx-8" }`}>
                Güneş:
                <Image src="/icons/sunrise.svg" width={36} height={36} alt="Sunrise Icon" />
                {initialTime.sunrise}
                <Image src="/icons/sunset.svg" width={36} height={36} alt="Sunset Icon" />
                {initialTime.sunset} ({initialTime.sunsetDifference})
            </summary>
            {!fullScreen && (
  <ul className={`flex gap-3 justify-end flex-wrap max-w-7xl ${fontSizeType === "small" ? "m-0" : "mx-4 sm:mx-6 lg:mx-8" }`}>
    {clientData?.populerCities?.map((city: PopulerCities) => (
      <li
        key={city.name}
        className={`px-4 py-1.5 md:px-5 md:py-2 hover:bg-primary hover:text-white ${
          city.selected ? "bg-primary text-white" : "bg-[#eee]"
        }`}
      >
        <Link href={`/saat-kac/${city.slug}`} className="block text-center text-base md:text-xl">
          <b>{city.name}</b>
          <p>
            {padZero(city.hour)}:{padZero(city.minute)}
          </p>
        </Link>
      </li>
            ))}
        </ul>
        )}
        </div>
    );
}
