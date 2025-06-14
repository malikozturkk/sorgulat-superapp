import { NextResponse } from "next/server";
import { getRequest } from "@/utils/api";
import { TimezoneData } from "../saat-kac/types/Timezone.types";
import { TravelArticle } from "@/components/Blog/blog.types";

export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
    
    try {
        const staticPages = [
            "https://sorgulat.com/",
            "https://sorgulat.com/saat-kac",
            "https://sorgulat.com/gizlilik",
            "https://sorgulat.com/iletisim",
            "https://sorgulat.com/hakkinda",
            "https://sorgulat.com/pasaport",
            "https://sorgulat.com/pasaport/vizesiz-seyahat",
            "https://sorgulat.com/pasaport/vizeli-seyahat",
            "https://sorgulat.com/pasaport/kapida-vize-seyahat",
            "https://sorgulat.com/pasaport/eta-seyahat",
            "https://sorgulat.com/blog",
            "https://sorgulat.com/blog/pasaport",
        ];

        const [cities, countries, getAllPassport]: [TimezoneData[], TimezoneData[], any] = await Promise.all([
            getRequest("/timezones/city"),
            getRequest("/timezones/country"),
            getRequest(`/api/passport-blogs?populate=*&sort=createdAt:desc`, baseUrl)
        ]);
        
        const dynamicUrls = [
            ...cities.map((city) => `https://sorgulat.com/saat-kac/${city.slug}`),
            ...countries.map((country) => `https://sorgulat.com/saat-kac/${country.slug}`),
            ...getAllPassport.data.map((passport: TravelArticle) => `https://sorgulat.com/blog/pasaport/${passport.slug}`)
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
        return new NextResponse("Error generating main sitemap", { status: 500 });
    }
} 