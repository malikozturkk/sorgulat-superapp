import { NextResponse } from "next/server";
import { getRequest } from "@/utils/api";
import { TimezoneData } from "../saat-kac/types/Timezone.types";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cities: TimezoneData[] = await getRequest("/timezones/city");
        
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${cities
                .map((city) => `<url>
                <loc>https://sorgulat.com/saat-kac/${city.slug}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
                <lastmod>${new Date().toISOString()}</lastmod>
                </url>`)
                .join("")}
        </urlset>`;

        return new NextResponse(sitemap, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } catch (error) {
        return new NextResponse("Error generating cities sitemap", { status: 500 });
    }
} 