import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const sitemapCount = 3;

    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${Array.from({ length: sitemapCount }).map((_, i) => `
            <sitemap>
                <loc>https://sorgulat.com/sitemap-${i + 1}.xml</loc>
            </sitemap>`).join("")}
    </sitemapindex>`;

    return new NextResponse(sitemapIndex, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
