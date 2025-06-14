import { NextResponse } from "next/server";
import { getRequest } from "@/utils/api";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const compares: string[] = await getRequest("/compare/sitemap");
        const CHUNK_SIZE = 50000;
        
        // URL'leri 50.000'lik parçalara böl
        const chunks = [];
        for (let i = 0; i < compares.length; i += CHUNK_SIZE) {
            chunks.push(compares.slice(i, i + CHUNK_SIZE));
        }
        
        // Eğer tek parça varsa direkt sitemap döndür
        if (chunks.length === 1) {
            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${chunks[0]
                    .map((slug: string) => `<url>
                    <loc>https://sorgulat.com/saat-kac/fark/${slug}</loc>
                    <changefreq>weekly</changefreq>
                    <priority>0.7</priority>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    </url>`)
                    .join("")}
            </urlset>`;

            return new NextResponse(sitemap, {
                headers: {
                    "Content-Type": "application/xml",
                },
            });
        }
        
        // Birden fazla parça varsa sitemap index döndür
        const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${chunks.map((_, index) => `<sitemap>
            <loc>https://sorgulat.com/sitemap-compares-${index + 1}.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            </sitemap>`).join("")}
        </sitemapindex>`;

        return new NextResponse(sitemapIndex, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } catch (error) {
        return new NextResponse("Error generating compares sitemap", { status: 500 });
    }
} 