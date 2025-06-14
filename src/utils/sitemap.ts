import { getRequest } from "@/utils/api";
import { TimezoneData } from "@/app/saat-kac/types/Timezone.types";
import { TravelArticle } from "@/components/Blog/blog.types";

// URL'leri parçalara bölen yardımcı fonksiyon
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

// Sitemap dosyalarını oluşturan yardımcı fonksiyon
export function generateSitemapXml(urls: string[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => `<url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
</url>`).join("")}
</urlset>`;
}

// Sitemap index dosyası oluşturan yardımcı fonksiyon
export function generateSitemapIndex(chunkCount: number): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${Array.from({ length: chunkCount }, (_, index) => `<sitemap>
    <loc>https://sorgulat.com/sitemap-${index + 1}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</sitemap>`).join("")}
</sitemapindex>`;
}

// Tüm URL'leri toplayan fonksiyon
export async function getAllUrls(): Promise<string[]> {
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
    
    const staticPages = [
        "https://sorgulat.com/",
        "https://sorgulat.com/saat-kac",
        "https://sorgulat.com/gizlilik",
        "https://sorgulat.com/iletisim",
        "https://sorgulat.com/hakkinda",
        "https://sorgulat.com/pasaport",
        "https://sorgulat.com/pasaport/vizesiz-seyahat",
        "https://sorgulat.com/pasaport/vizeli-seyahat",
        "https://sorgulat.com/pasaport/kapida-vize-seyahat",
        "https://sorgulat.com/pasaport/eta-seyahat",
        "https://sorgulat.com/blog",
        "https://sorgulat.com/blog/pasaport",
    ];

    const [cities, countries, compares, getAllPassport]: [TimezoneData[], TimezoneData[], string[], any] = await Promise.all([
        getRequest("/timezones/city"),
        getRequest("/timezones/country"),
        getRequest("/compare/sitemap"),
        getRequest(`/api/passport-blogs?populate=*&sort=createdAt:desc`, baseUrl)
    ]);

    const dynamicUrls = [
        ...cities.map((city) => `https://sorgulat.com/saat-kac/${city.slug}`),
        ...countries.map((country) => `https://sorgulat.com/saat-kac/${country.slug}`),
        ...compares.map((slug: string) => `https://sorgulat.com/saat-kac/fark/${slug}`),
        ...getAllPassport.data.map((passport: TravelArticle) => `https://sorgulat.com/blog/pasaport/${passport.slug}`)
    ];

    return [...staticPages, ...dynamicUrls];
} 