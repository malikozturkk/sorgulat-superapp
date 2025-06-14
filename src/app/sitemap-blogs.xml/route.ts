import { NextResponse } from "next/server";
import { getRequest } from "@/utils/api";
import { TravelArticle } from "@/components/Blog/blog.types";

export const dynamic = "force-dynamic";

export async function GET() {
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
    
    try {
        const getAllPassport = await getRequest(`/api/passport-blogs?populate=*&sort=createdAt:desc`, baseUrl);
        
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${getAllPassport.data
                .map((passport: TravelArticle) => `<url>
                <loc>https://sorgulat.com/blog/pasaport/${passport.slug}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.6</priority>
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
        return new NextResponse("Error generating blogs sitemap", { status: 500 });
    }
} 