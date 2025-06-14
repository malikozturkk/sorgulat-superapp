import { NextResponse } from "next/server";
import { getRequest } from "@/utils/api";

export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = "https://sorgulat.com";
    
    try {
        // Compare verilerini al ve kaç parça olacağını hesapla
        const compares: string[] = await getRequest("/compare/sitemap");
        const CHUNK_SIZE = 50000;
        const chunkCount = Math.ceil(compares.length / CHUNK_SIZE);
        
        // Dinamik compare parçalarını oluştur
        const compareSitemaps = [];
        if (chunkCount === 1) {
            compareSitemaps.push(`${baseUrl}/sitemap-compares.xml`);
        } else {
            for (let i = 1; i <= chunkCount; i++) {
                compareSitemaps.push(`${baseUrl}/sitemap-compares-${i}.xml`);
            }
        }
    
        const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <sitemap>
                <loc>${baseUrl}/sitemap-static.xml</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </sitemap>
            <sitemap>
                <loc>${baseUrl}/sitemap-cities.xml</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </sitemap>
            <sitemap>
                <loc>${baseUrl}/sitemap-countries.xml</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </sitemap>
            ${compareSitemaps.map(url => `<sitemap>
                <loc>${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </sitemap>`).join("")}
            <sitemap>
                <loc>${baseUrl}/sitemap-blogs.xml</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </sitemap>
        </sitemapindex>`;

        return new NextResponse(sitemapIndex, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } catch (error) {
        return new NextResponse("Error generating sitemap index", { status: 500 });
    }
} 