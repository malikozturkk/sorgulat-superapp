import { NextResponse } from "next/server";
import { getRequest } from "@/utils/api";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const compares = await getRequest("/compare/sitemap");
        
        // 138.000-187.000 arası URL'leri al (49.000 URL)
        const limitedCompares = compares.slice(138000, 187000);
        
        const dynamicUrls = limitedCompares.map((slug: string) => `https://sorgulat.com/saat-kac/fark/${slug}`);

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${dynamicUrls
                .map((url: string) => `<url>
                <loc>${url}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
                </url>`)
                .join("")}
        </urlset>`;

        return new NextResponse(sitemap, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } catch (error) {
        return new NextResponse("Error generating compare sitemap 4", { status: 500 });
    }
} 