import { NextResponse } from "next/server";
import { getRequest } from "@/utils/api";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: { chunk: string } }
) {
    try {
        const compares: string[] = await getRequest("/compare/sitemap");
        const CHUNK_SIZE = 50000;
        const chunkIndex = parseInt(params.chunk) - 1;
        
        // URL'leri 50.000'lik parçalara böl
        const chunks = [];
        for (let i = 0; i < compares.length; i += CHUNK_SIZE) {
            chunks.push(compares.slice(i, i + CHUNK_SIZE));
        }
        
        // Geçersiz chunk index kontrolü
        if (chunkIndex < 0 || chunkIndex >= chunks.length) {
            return new NextResponse("Chunk not found", { status: 404 });
        }
        
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${chunks[chunkIndex]
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
    } catch (error) {
        return new NextResponse("Error generating compare chunk sitemap", { status: 500 });
    }
} 