import { NextResponse } from "next/server";
import { countries, cities } from "../data";
import { getLocationSuffix } from "@/utils/formatter";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const name = url.pathname.split("/").pop();

    if (!name) {
        return NextResponse.json({ error: "Eksik parametre" }, { status: 400 });
    }

    const found = cities.find((c) => c.slug === name) || countries.find((c) => c.slug === name);

    if (!found) {
        return NextResponse.json({ error: "Böyle bir şehir veya ülke bulunamadı" }, { status: 404 });
    }

    try {
        const now = new Date();
        const timeZone = found.timezone;

        const localeDate = new Intl.DateTimeFormat("en-US", {
            timeZone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            fractionalSecondDigits: 3,
            weekday: "long",
        }).formatToParts(now);

        const getPart = (type: string) => localeDate.find(p => p.type === type)?.value || "";

        const suffix = getLocationSuffix(found.country || found.name);
        const response = {
            year: Number(getPart("year")),
            month: Number(getPart("month")),
            day: Number(getPart("day")),
            hour: Number(getPart("hour")),
            minute: Number(getPart("minute")),
            seconds: Number(getPart("second")),
            milliSeconds: Number(getPart("fractionalSecond")) || 0,
            dateTime: new Date(now.toLocaleString("en-US", { timeZone })).toISOString(),
            date: `${getPart("month")}/${getPart("day")}/${getPart("year")}`,
            time: `${getPart("hour")}:${getPart("minute")}`,
            dayOfWeek: getPart("weekday"),
            dstActive: now.toString().includes("DST"),
            timezone: found,
            locationText: `${found.country || found.name}’${suffix}`,
            populerCities: cities.slice(0, 5).map(city => {
                const timeZone = city.timezone
                const cityDate = new Intl.DateTimeFormat("en-US", {
                    timeZone,
                    hour: "2-digit",
                    minute: "2-digit"
                }).formatToParts(now);
                return {
                    slug: city.slug,
                    name: city.name,
                    hour: Number(cityDate.find(p => p.type === "hour")?.value || 0),
                    minute: Number(cityDate.find(p => p.type === "minute")?.value || 0),
                    // dateTime: new Date(now.toLocaleString("en-US", { timeZone })).toISOString(),
                    dateTime: new Date("2025-02-24T20:11:08.000Z"),
                    selected: city.slug === name
                };
            })
        };

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error: "Saat hesaplanırken hata oluştu" }, { status: 400 });
    }
}