'use client';
import { PopulerCities, TimeData } from '@/app/api/timezones/data';
import { getRequest } from '@/utils/api';
import { padZero } from '@/utils/formatter';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function LiveClock({ initialTime }: { initialTime: TimeData }) {
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
            const response: TimeData = await getRequest(`/api/timezones/${initialTime.timezone.slug}`);
            setCurrentTime(new Date(response.dateTime));
        };

        const fetchInterval = setInterval(fetchTime, 60000);
        return () => clearInterval(fetchInterval);
    }, []);

    const date = new Date(initialTime.dateTime);

    const formattedDate = new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
    }).format(date);

    return (
        <div className='flex flex-col gap-4 w-full'>
            <button
                className={`transition-all duration-300 
                ${fullScreen
                        ? "fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-white z-50 p-8"
                        : "flex flex-col items-center justify-center text-xl p-4 border rounded-lg shadow-md mx-4 max-w-7xl sm:mx-6 lg:mx-8"
                    }`}
                onClick={() => setFullScreen(!fullScreen)}
            >
                {fullScreen &&
                    <div className='absolute right-8 top-8 w-9 md:w-12 curspo' onClick={() => setFullScreen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path
                                id="SVGRepo_iconCarrier"
                                fill="#646ecb"
                                fillRule="evenodd"
                                d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414Z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                }
                <div className='w-full'>
                    <h1 className='font-extrabold text-xl md:text-4xl'>{initialTime.timezone.name}, <span className='font-normal'>{initialTime.locationText} saat kaç</span></h1>
                </div>
                <time className='font-bold leading-none' style={{ fontSize: fullScreen ? "20vw" : "15vw" }}>
                    {padZero(currentTime.getHours())}:{padZero(currentTime.getMinutes())}:
                    {padZero(currentTime.getSeconds())}
                </time>
                <p className='text-4xl w-full text-right'>{formattedDate}</p>
            </button>
            {!fullScreen && (
                <ul className='flex gap-3 justify-end flex-wrap mx-4 max-w-7xl sm:mx-6 lg:mx-8'>
                    {initialTime?.populerCities?.map((city: PopulerCities) => {
                        const populerCurrentTime = new Date(city.dateTime)
                        console.log(city.dateTime, "city.dateTime malik1")
                        console.log(city, "city malik2")
                        return (
                            <Link href={`/saat-kac/${city.slug}`} className='text-center text-xl' key={city.name}>
                                <li className={`px-5 py-2 hover:bg-primary hover:text-white ${city.selected ? "bg-primary text-white" : "bg-[#eee]"}`}>
                                    <b>{city.name}</b>
                                    <p>{padZero(populerCurrentTime.getHours())}:{padZero(populerCurrentTime.getMinutes())}</p>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            )}
        </div>
    );
}
