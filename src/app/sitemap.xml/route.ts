import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = "https://sorgulat.com";
    
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
        <sitemap>
            <loc>${baseUrl}/sitemap-compares.xml</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
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
} 