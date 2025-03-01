import LiveClock from "@/components/Timezone/LiveClock";
import { TimeData } from "../types/Timezone.types";
import { getRequest } from "@/utils/api";

type Params = Promise<{ slug: string }>;

export default async function WhatTimeIsIt({ params }: { params: Params }) {
    const { slug } = await params
    try {
        const getTime: TimeData = await getRequest(`/timezones/${slug}`);

        return (
            <LiveClock initialTime={getTime} />
        );
    }
    catch (e) {
        return (
            <div>bu adres için saat verisi alınamadı</div>
        )
    }
}
