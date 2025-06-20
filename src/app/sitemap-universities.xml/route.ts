import { NextResponse } from "next/server";
import { getRequest } from "@/utils/api";
import { University } from "../egitim/types";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const universities = await getRequest("/schools/universities");
        
        const dynamicUrls = universities.map((university: University) => `https://sorgulat.com/egitim/${university.slug}`);

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${dynamicUrls
            .map(
                (url: string) => `<url>
            <loc>${url}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>`
            )
            .join("\n")}
        </urlset>`;

        return new NextResponse(sitemap, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } catch (error) {
        return new NextResponse("Error generating universities sitemap", { status: 500 });
    }
} 