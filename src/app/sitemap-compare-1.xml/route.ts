import { NextResponse } from "next/server";
import { getRequest } from "@/utils/api";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const compares = await getRequest("/compare/sitemap");
        
        // İlk 40.000 URL'yi al
        const limitedCompares = compares.slice(0, 40000);
        
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
        return new NextResponse("Error generating compare sitemap 1", { status: 500 });
    }
} 