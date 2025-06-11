import { getRequest, getUserLocation } from "@/utils/api";
import { TimezoneData, TimeData } from "./types/Timezone.types";
import LiveClock from "@/components/Timezone/LiveClock";
import RandomItems from "@/components/Timezone/RandomItems";
import { generateMetadata } from '../layout'
import { headers } from 'next/headers'
import CompareForm from "@/components/Timezone/CompareForm";
import { FiClock, FiGlobe, FiSearch, FiInfo } from "react-icons/fi";

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
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-6 pb-6 md:pb-12">
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Dünya Saatleri
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Dünyanın her yerinde anlık saat bilgisine ulaşın ve şehirler arası saat farklarını keşfedin
                    </p>
                </div>

                {/* Live Clock Section */}
                <div className="flex justify-center">
                    <LiveClock initialTime={getUserData} />
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    {/* Saat Farkı Bulma Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primaryDark rounded-xl flex items-center justify-center">
                                    <FiSearch className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        İki Şehir Arasındaki Saat Farkını Bulun
                                    </h2>
                                    <p className="text-gray-600">
                                        Şehir veya ülke seçerek anlık saat farkını öğrenin
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <CompareForm />
                    </div>

                    {/* Bilgi Kartı */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <FiInfo className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                    Saat Farkı Hesaplama Özellikleri
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Anlık saat farkını öğrenin</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Şu anki saat bilgisine ulaşın</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Zaman dilimi farkını görüntüleyin</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Karşılaştırmalı saat tablosunu inceleyin</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popüler Şehirler ve Ülkeler */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                <FiGlobe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Popüler Şehirler ve Ülkeler
                                </h2>
                                <p className="text-gray-600">
                                    Dünyanın farklı yerlerindeki anlık saatleri keşfedin
                                </p>
                            </div>
                        </div>
                        
                        <RandomItems getCitiesTimezones={getCitiesTimezones} getCountriesTimezones={getCountriesTimezones} />
                    </div>
                </div>
            </div>
        );
}
