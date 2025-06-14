import { NextResponse } from "next/server";
import { getAllUrls, chunkArray, generateSitemapXml } from "@/utils/sitemap";

export const dynamic = "force-dynamic";

// Route segment config
export const runtime = 'nodejs';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const sitemapId = parseInt(id);
        
        if (isNaN(sitemapId) || sitemapId < 1) {
            return new NextResponse("Invalid sitemap ID", { status: 400 });
        }
        
        // Tüm URL'leri al
        const allUrls = await getAllUrls();
        
        // URL'leri 50.000'lik parçalara böl
        const urlChunks = chunkArray(allUrls, 50000);
        
        // İstenen sitemap ID'si mevcut mu kontrol et
        if (sitemapId > urlChunks.length) {
            return new NextResponse("Sitemap not found", { status: 404 });
        }
        
        // İstenen sitemap parçasını oluştur (array 0-indexed olduğu için -1)
        const sitemapUrls = urlChunks[sitemapId - 1];
        const sitemapXml = generateSitemapXml(sitemapUrls);

        return new NextResponse(sitemapXml, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=3600, s-maxage=3600",
            },
        });
    } catch (error) {
        console.error("Sitemap generation error:", error);
        return new NextResponse("Error generating sitemap", { status: 500 });
    }
} 