import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const staticPages = [
        { url: "https://sorgulat.com/", priority: "1.0", changefreq: "daily" },
        { url: "https://sorgulat.com/saat-kac", priority: "0.9", changefreq: "weekly" },
        { url: "https://sorgulat.com/gizlilik", priority: "0.3", changefreq: "monthly" },
        { url: "https://sorgulat.com/iletisim", priority: "0.5", changefreq: "monthly" },
        { url: "https://sorgulat.com/hakkinda", priority: "0.5", changefreq: "monthly" },
        { url: "https://sorgulat.com/pasaport", priority: "0.8", changefreq: "weekly" },
        { url: "https://sorgulat.com/pasaport/vizesiz-seyahat", priority: "0.8", changefreq: "weekly" },
        { url: "https://sorgulat.com/pasaport/vizeli-seyahat", priority: "0.8", changefreq: "weekly" },
        { url: "https://sorgulat.com/pasaport/kapida-vize-seyahat", priority: "0.8", changefreq: "weekly" },
        { url: "https://sorgulat.com/pasaport/eta-seyahat", priority: "0.8", changefreq: "weekly" },
        { url: "https://sorgulat.com/blog", priority: "0.7", changefreq: "weekly" },
        { url: "https://sorgulat.com/blog/pasaport", priority: "0.7", changefreq: "weekly" },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticPages
            .map((page) => `<url>
            <loc>${page.url}</loc>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
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