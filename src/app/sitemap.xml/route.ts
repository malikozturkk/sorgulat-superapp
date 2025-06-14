import { NextResponse } from "next/server";
import { getAllUrls, chunkArray, generateSitemapIndex } from "@/utils/sitemap";

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

export async function GET() {
    try {
        // Tüm URL'leri al
        const allUrls = await getAllUrls();
        
        // URL'leri 50.000'lik parçalara böl
        const urlChunks = chunkArray(allUrls, 50000);
        
        // Sitemap index dosyası oluştur
        const sitemapIndex = generateSitemapIndex(urlChunks.length);

        return new NextResponse(sitemapIndex, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=3600, s-maxage=3600",
            },
        });
    } catch (error) {
        console.error("Sitemap index generation error:", error);
        return new NextResponse("Error generating sitemap", { status: 500 });
    }
}