import LiveClock from "@/components/Timezone/LiveClock";
import { DifferenceData, TimeData } from "../types/Timezone.types";
import { getRequest } from "@/utils/api";
import TimeDifferenceGraph from "@/components/Timezone/TimeDifferenceGraph";
import { defaultGenerateMetadata } from "@/app/metadataConfig";
import AllCitiesByCountry from "@/components/Timezone/AllCitiesByCountry";
import NotFound from "@/app/not-found";
import { FiSun, FiSunrise, FiSunset, FiClock, FiMapPin, FiInfo, FiGlobe } from "react-icons/fi";
import { Metadata } from "next";
import LayoutShiftPrevention from "@/components/LayoutShiftPrevention";
import LazyLoad from "@/components/LazyLoad";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params
    try {
        if (!slug) {
            return defaultGenerateMetadata()
        }
        const data: TimeData = await getRequest(`/timezones/${slug}`);
        const name = `${data.timezone.name}'${data.locationText}`

        return {
            title: `${name} saat kaç? | Sorgulat`,
            description: `Anlık olarak ${name} saatini öğrenin, popüler şehirlerle saat farkını keşfedin ve güneşin doğuş/batış saatlerini görüntüleyin.`,
            robots: "index, follow",
            keywords: `saat kac, ${name} saat kac, populer sehirlerde saat kac, saati sorgula`,
            authors: [
                {
                    name: `${name} Saat Kaç`,
                    url: `https://www.sorgulat.com/saat-kac/${data.timezone.slug}`,
                },
            ],
            icons: '/favicon.ico',
            alternates: {
                canonical: `https://www.sorgulat.com/saat-kac/${data.timezone.slug}`,
            },
            openGraph: {
                title: `${name} Saat Kaç | Sorgulat`,
                description: `Anlık olarak ${name} saatini öğrenin, popüler şehirlerle saat farkını keşfedin ve güneşin doğuş/batış saatlerini görüntüleyin.`,
                url: `https://www.sorgulat.com/saat-kac/${data.timezone.slug}`,
                images:
                    '/images/openGraph/time-detail.png',
                type: 'website',
                siteName: 'Sorgulat',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${name} Saat Kaç | Sorgulat`,
                description: `Anlık olarak ${name} saatini öğrenin, popüler şehirlerle saat farkını keşfedin ve güneşin doğuş/batış saatlerini görüntüleyin.`,
                images: '/images/openGraph/time-detail.png',
                site: '@Sorgulat',
            },
        }
    } catch (e) {
        console.error(slug, e, '-> error')
        return defaultGenerateMetadata()
    }
}

export default async function WhatTimeIsIt({ params }: { params: Params }) {
    const { slug } = await params

    const timeDifferenceCalculator = (fromHour: number, fromMinute: number, toHour: number, toMinute: number): number => {
        const fromTotalMinutes = fromHour * 60 + fromMinute;
        const toTotalMinutes = toHour * 60 + toMinute;
        const diffInMinutes = toTotalMinutes - fromTotalMinutes;
        const diffInHours = diffInMinutes / 60;

        return Math.round(diffInHours * 10) / 10;
    };

    try {
        const getTime: TimeData = await getRequest(`/timezones/${slug}`);
        const differenceTime: DifferenceData = await getRequest(`/timezones/difference/${slug}`);
        const date = new Date(getTime.dateTime);
        const formattedDate = new Intl.DateTimeFormat('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long',
        }).format(date);
        const calculatedDifference = timeDifferenceCalculator(getTime.hour, getTime.minute, getTime.populerCities[0].hour, getTime.populerCities[0].minute)

        return (
            <LayoutShiftPrevention className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-6 pb-6 md:pb-12">
                <LayoutShiftPrevention className="text-center" minHeight="120px">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        {getTime.timezone.name} Saat Kaç?
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {getTime.timezone.name} için anlık saat bilgisi, güneş doğuş/batış saatleri ve popüler şehirlerle saat farkları
                    </p>
                </LayoutShiftPrevention>

                <LazyLoad minHeight="200px">
                    <LayoutShiftPrevention className="flex justify-center" minHeight="200px">
                        <LiveClock initialTime={getTime} />
                    </LayoutShiftPrevention>
                </LazyLoad>

                <div className="space-y-8">
                    <LazyLoad minHeight="400px">
                        <LayoutShiftPrevention className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100" minHeight="400px">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                    <FiMapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Saat Farkları
                                    </h2>
                                    <p className="text-gray-600">
                                        {getTime.timezone.name} ile diğer şehirler arasındaki saat farkları
                                    </p>
                                </div>
                            </div>
                            
                            <TimeDifferenceGraph differenceTime={differenceTime} initialTime={getTime} />
                        </LayoutShiftPrevention>
                    </LazyLoad>

                    {getTime.allCities && getTime.allCities.length > 0 && (
                        <LazyLoad minHeight="300px">
                            <LayoutShiftPrevention className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100" minHeight="300px">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                        <FiGlobe className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Tüm Şehirler
                                        </h2>
                                        <p className="text-gray-600">
                                            {getTime.timezone.country} ülkesindeki tüm şehirlerin saatleri
                                        </p>
                                    </div>
                                </div>
                                
                                <AllCitiesByCountry allCities={getTime.allCities} />
                            </LayoutShiftPrevention>
                        </LazyLoad>
                    )}

                    <LayoutShiftPrevention className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100" minHeight="150px">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <FiInfo className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                    {getTime.timezone.name} Hakkında Bilgiler
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Bugünün tarihi: {formattedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Öğle vakti: {getTime.noonTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>DST: {getTime.dstActive ? 'Aktif' : 'Pasif'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Zaman dilimi: {getTime.timezone.timezone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LayoutShiftPrevention>
                </div>

                <script type="application/ld+json" suppressHydrationWarning>
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                        {
                            "@type": "Question",
                            "name": `${getTime.timezone.name}'${getTime.locationText} saat kaç?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${getTime.timezone.name} için güncel saat: ${getTime.time}. Bu sayfada saat her saniye otomatik olarak güncellenmektedir.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${getTime.timezone.name}'${getTime.locationText} bugünün tarihi nedir ve haftanın hangi günü?`,
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": `${getTime.timezone.name}'${getTime.locationText} bugünün tarihi: ${formattedDate}.`
                            }
                        },                          
                        {
                            "@type": "Question",
                            "name": `${getTime.timezone.name} ile İstanbul arasındaki saat farkı nedir?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${getTime.timezone.name} ile İstanbul arasındaki saat farkı yaklaşık ${calculatedDifference} saat olarak hesaplanmaktadır.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${getTime.timezone.name}'${getTime.locationText} öğle vakti saat kaçta?`,
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": `Bu bölgede öğle vakti saati: ${getTime.noonTime}. Güneşin en yüksek noktada olduğu vakittir.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${getTime.timezone.name}'${getTime.locationText} gün ışığından yararlanma saati (DST) aktif mi?`,
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": `${getTime.dstActive ? 'Evet' : 'Hayır'}, şu anda gün ışığından yararlanma saati ${getTime.dstActive ? 'aktif' : 'pasif'} durumdadır.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${getTime.timezone.name} saat diliminde gün doğumu ile batımı arasındaki süre ne kadar?`,
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": `Gün doğumu ${getTime.sunrise}, gün batımı ise ${getTime.sunset}. Aradaki fark: ${getTime.sunsetDifference}.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${getTime.timezone.name}'${getTime.locationText} güneş saat kaçta doğar ve batar?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${getTime.timezone.name}'${getTime.locationText} güneşin doğuş saati ${getTime.sunrise}, batış saati ise ${getTime.sunset} olarak belirlenmiştir.`
                            }
                        }
                        ]
                    })}
                </script>
            </LayoutShiftPrevention>
        );
    }
    catch (e) {
        return (
            <NotFound />
        )
    }
}
