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
    <loc>https://sorgulat.com/sitemap/${index + 1}</loc>
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

    try {
        console.log("Fetching API data...");
        console.log("Base URL:", baseUrl);
        
        const [cities, countries, compares, getAllPassport]: [TimezoneData[], TimezoneData[], string[], any] = await Promise.all([
            getRequest("/timezones/city").catch(() => []),
            getRequest("/timezones/country").catch(() => []),
            getRequest("/compare/sitemap").catch(() => []),
            getRequest(`/api/passport-blogs?populate=*&sort=createdAt:desc`, baseUrl).catch(() => ({ data: [] }))
        ]);

        console.log("Cities count:", cities?.length || 0);
        console.log("Countries count:", countries?.length || 0);
        console.log("Compares count:", compares?.length || 0);
        console.log("Passport blogs count:", getAllPassport?.data?.length || 0);

        const dynamicUrls = [
            ...(cities || []).map((city) => `https://sorgulat.com/saat-kac/${city.slug}`),
            ...(countries || []).map((country) => `https://sorgulat.com/saat-kac/${country.slug}`),
            ...(compares || []).map((slug: string) => `https://sorgulat.com/saat-kac/fark/${slug}`),
            ...(getAllPassport?.data || []).map((passport: TravelArticle) => `https://sorgulat.com/blog/pasaport/${passport.slug}`)
        ];

        const allUrls = [...staticPages, ...dynamicUrls];
        console.log("Total URLs:", allUrls.length);
        
        return allUrls;
    } catch (error) {
        console.error("Error in getAllUrls:", error);
        // Hata durumunda sadece static sayfaları döndür
        return staticPages;
    }
} 