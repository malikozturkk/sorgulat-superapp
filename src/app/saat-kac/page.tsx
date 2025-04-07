import { getRequest, getUserLocation } from "@/utils/api";
import { TimezoneData, TimeData } from "./types/Timezone.types";
import LiveClock from "@/components/Timezone/LiveClock";
import RandomItems from "@/components/Timezone/RandomItems";
import { generateMetadata } from '../layout'
import { headers } from 'next/headers'
import CompareForm from "@/components/Timezone/CompareForm";

export const dynamic = "force-dynamic";

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'saat-kac' } })
}

export default async function WhatTime() {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "auto";
    const userLocation = await getUserLocation(ip)
    const [getCitiesTimezones, getCountriesTimezones, getUserData]: [TimezoneData[], TimezoneData[], TimeData] =
        await Promise.all([
        getRequest("/timezones/city?limit=45"),
        getRequest("/timezones/country?limit=45"),
        getRequest(`/timezones/${encodeURIComponent(userLocation)}`).catch(() =>
        getRequest("/timezones/turkiye")
        ),
        ]);
        return (
            <div className="flex flex-col items-center gap-5 md:gap-10">
                <LiveClock initialTime={getUserData} />
                <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col pb-6 md:pb-12 gap-4 md:gap-8">
                    <h1 className="text-3xl font-bold">İki şehir arasındaki saat farkını bulun</h1>
                    <CompareForm />
                </div>
                <RandomItems getCitiesTimezones={getCitiesTimezones} getCountriesTimezones={getCountriesTimezones} />
            </div>
        );
}
