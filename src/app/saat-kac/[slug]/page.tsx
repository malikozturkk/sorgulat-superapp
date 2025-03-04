import LiveClock from "@/components/Timezone/LiveClock";
import { DifferenceData, TimeData } from "../types/Timezone.types";
import { getRequest } from "@/utils/api";
import TimeDifferenceGraph from "@/components/Timezone/TimeDifferenceGraph";

type Params = Promise<{ slug: string }>;

export default async function WhatTimeIsIt({ params }: { params: Params }) {
    const { slug } = await params
    try {
        const getTime: TimeData = await getRequest(`/timezones/${slug}`);
        const differenceTime: DifferenceData = await getRequest(`/timezones/difference/${slug}`);

        return (
            <>
                <LiveClock initialTime={getTime} />
                <TimeDifferenceGraph differenceTime={differenceTime} />
            </>
        );
    }
    catch (e) {
        return (
            <div>bu adres için saat verisi alınamadı</div>
        )
    }
}
