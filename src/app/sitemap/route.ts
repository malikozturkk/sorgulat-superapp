import { NextResponse } from "next/server";
import { getRequest } from "@/utils/api";
import { TimezoneData } from "../api/timezones/data";

export async function GET() {
    try {
        const staticPages = [
            "https://sorgulat.com/",
            "https://sorgulat.com/saat-kac",
        ];

        const [cities, countries]: [TimezoneData[], TimezoneData[]] = await Promise.all([
            getRequest("/api/timezones/cities"),
            getRequest("/api/timezones/countries"),
        ]);

        const dynamicUrls = [
            ...cities.map((city) => `https://sorgulat.com/saat-kac/${city.slug}`),
            ...countries.map((country) => `https://sorgulat.com/saat-kac/${country.slug}`),
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${[...staticPages, ...dynamicUrls]
                .map((url) => `<url>
                <loc>${url}</loc>
                <changefreq>weekly</changefreq>
                <priority>1.0</priority>
                </url>`)
                .join("")}
        </urlset>`;

        return new NextResponse(sitemap, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } catch (error) {
        return new NextResponse("Error generating sitemap", { status: 500 });
    }
}
