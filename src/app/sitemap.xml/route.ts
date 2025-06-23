import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = "https://sorgulat.com";
    
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
            <loc>${baseUrl}/sitemap-main.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
        <sitemap>
            <loc>${baseUrl}/sitemap-compare-1.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
        <sitemap>
            <loc>${baseUrl}/sitemap-compare-2.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
        <sitemap>
            <loc>${baseUrl}/sitemap-compare-3.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
        <sitemap>
            <loc>${baseUrl}/sitemap-compare-4.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
        <sitemap>
            <loc>${baseUrl}/sitemap-compare-5.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
        <sitemap>
            <loc>${baseUrl}/sitemap-compare-6.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
        <sitemap>
            <loc>${baseUrl}/sitemap-compare-7.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>   
        <sitemap>
            <loc>${baseUrl}/sitemap-compare-8.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>   
        <sitemap>
            <loc>${baseUrl}/sitemap-compare-9.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap> 
        <sitemap>
            <loc>${baseUrl}/sitemap-compare-10.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>        
        <sitemap>
            <loc>${baseUrl}/sitemap-universities.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
    </sitemapindex>`;

    return new NextResponse(sitemapIndex, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}