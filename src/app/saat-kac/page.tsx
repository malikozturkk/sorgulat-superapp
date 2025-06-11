import { getRequest, getUserLocation } from "@/utils/api";
import { TimezoneData, TimeData } from "./types/Timezone.types";
import LiveClock from "@/components/Timezone/LiveClock";
import RandomItems from "@/components/Timezone/RandomItems";
import { generateMetadata } from '../layout'
import { headers } from 'next/headers'
import CompareForm from "@/components/Timezone/CompareForm";
import { FiClock, FiGlobe, FiSearch, FiInfo, FiArrowRight, FiStar } from "react-icons/fi";

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
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <FiClock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Anlık Saat</h2>
                            <p className="text-gray-600">Bulunduğunuz konumun güncel saati</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <LiveClock initialTime={getUserData} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    {/* Saat Farkı Bulma Section */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                <FiStar className="w-3 h-3" />
                                POPÜLER
                            </div>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div className="flex-1 text-center lg:text-left">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                                    <FiSearch className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                    İki Şehir Arasındaki Saat Farkını Bulun
                                </h2>
                                <p className="text-gray-600 mb-6 max-w-2xl">
                                    Şehir veya ülke seçerek anlık saat farkını öğrenin. 
                                    Dünyanın herhangi iki noktası arasındaki zaman farkını kolayca hesaplayın.
                                </p>
                            </div>
                            
                            <div className="flex-1 w-full">
                                <div className="bg-white rounded-xl p-6 border border-green-200 shadow-lg">
                                    <CompareForm />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bilgi Kartı */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                    <FiInfo className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                    Saat Farkı Hesaplama Özellikleri
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 min-w-8 min-h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                                <FiClock className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="font-medium text-blue-900">Anlık saat farkını öğrenin</span>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 min-w-8 min-h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                                <FiGlobe className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="font-medium text-blue-900">Şu anki saat bilgisine ulaşın</span>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 min-w-8 min-h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                                <FiSearch className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="font-medium text-blue-900">Zaman dilimi farkını görüntüleyin</span>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 min-w-8 min-h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                                <FiInfo className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="font-medium text-blue-900">Karşılaştırmalı saat tablosunu inceleyin</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popüler Şehirler ve Ülkeler */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
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
