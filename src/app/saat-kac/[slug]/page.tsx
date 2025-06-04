import LiveClock from "@/components/Timezone/LiveClock";
import { DifferenceData, TimeData } from "../types/Timezone.types";
import { getRequest } from "@/utils/api";
import TimeDifferenceGraph from "@/components/Timezone/TimeDifferenceGraph";
import { defaultGenerateMetadata } from "@/app/metadataConfig";
import AllCitiesByCountry from "@/components/Timezone/AllCitiesByCountry";
import NotFound from "@/app/not-found";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
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
            <>
                <LiveClock initialTime={getTime} />
                <TimeDifferenceGraph differenceTime={differenceTime} initialTime={getTime} />
                {getTime.allCities && getTime.allCities.length > 0 &&
                    <AllCitiesByCountry allCities={getTime.allCities} />
                }
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
            </>
        );
    }
    catch (e) {
        return (
            <NotFound />
        )
    }
}
