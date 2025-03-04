import LiveClock from "@/components/Timezone/LiveClock";
import { DifferenceData, TimeData } from "../types/Timezone.types";
import { getRequest } from "@/utils/api";
import TimeDifferenceGraph from "@/components/Timezone/TimeDifferenceGraph";
import { defaultGenerateMetadata } from "@/app/metadataConfig";
import AllCitiesByCountry from "@/components/Timezone/AllCitiesByCountry";

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
                    '/images/detail-open-graph.png',
                type: 'website',
                siteName: 'Sorgulat',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${name} Saat Kaç | Sorgulat`,
                description: `Anlık olarak ${name} saatini öğrenin, popüler şehirlerle saat farkını keşfedin ve güneşin doğuş/batış saatlerini görüntüleyin.`,
                images: '/images/detail-open-graph.png',
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
    try {
        const getTime: TimeData = await getRequest(`/timezones/${slug}`);
        const differenceTime: DifferenceData = await getRequest(`/timezones/difference/${slug}`);

        return (
            <>
                <LiveClock initialTime={getTime} />
                <TimeDifferenceGraph differenceTime={differenceTime} />
                {getTime.allCities && getTime.allCities.length > 0 &&
                    <AllCitiesByCountry allCities={getTime.allCities} />
                }
            </>
        );
    }
    catch (e) {
        return (
            <div>bu adres için saat verisi alınamadı</div>
        )
    }
}
