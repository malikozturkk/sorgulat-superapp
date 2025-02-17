'use client';
import { PopulerCities, TimeData, TimezoneData } from '@/app/api/timezones/data';
import { getRequest } from '@/utils/api';
import { padZero } from '@/utils/formatter';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function LiveClock({ initialTime }: { initialTime: TimeData }) {
    const [currentTime, setCurrentTime] = useState<Date>(new Date(initialTime.dateTime));

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
        <div className='flex flex-col gap-4'>
            <div className="flex flex-col items-center justify-center text-xl p-4 border rounded-lg shadow-md mx-4 max-w-7xl sm:mx-6 lg:mx-8">
                <div className='w-full'>
                    <h1 className='font-extrabold text-xl md:text-4xl'>{initialTime.timezone.name}, <span className='font-normal'>{initialTime.locationText} saat kaç</span></h1>
                </div>
                <time className='font-bold leading-none' style={{ fontSize: "15vw" }}>
                    {padZero(currentTime.getHours())}:{padZero(currentTime.getMinutes())}:
                    {padZero(currentTime.getSeconds())}
                </time>
                <p className='text-4xl w-full text-right'>{formattedDate}</p>
            </div>
            <ul className='flex gap-3 justify-end flex-wrap mx-4 max-w-7xl sm:mx-6 lg:mx-8'>
                {initialTime?.populerCities?.map((city: PopulerCities) => (
                    <Link href={`/saat-kac/${city.slug}`} className='text-center text-xl' key={city.name}>
                        <li className={`px-5 py-2 hover:bg-primary hover:text-white ${city.selected ? "bg-primary text-white" : "bg-[#eee]"}`}>
                            <b>{city.name}</b>
                            <p>{padZero(city.hour)}:{padZero(city.minute)}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
