import { defaultGenerateMetadata } from '@/app/metadataConfig';
import PassportMap from '@/components/PassportMap';
import { getRequest } from '@/utils/api';
import { FilterType, VisaCountry } from '../types/passport.types';
import { generateVisaType } from '@/utils/formatter';
import { TravelArticle } from '@/components/Blog/blog.types';
import HorizontalBox from '@/components/Blog/ArticleBox/HorizontalBox';
import NotFound from '@/app/not-found';

type Params = Promise<{ slug: string }>;

const titleMap = {
    "visa-free": "Vizesiz Ülkeler",
    "visa": "Vize Gereken Ülkeler",
    "visa-on-arrival": "Kapıda Vize Veren Ülkeler",
    "eta": "Elektronik Vize Gereken Ülkeler"
}

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params
    
    try {
        if (!slug) {
            return defaultGenerateMetadata()
        }

        const filteredPassport = await getRequest(`/passport/${slug}`);
        const { countries, count, filter, filter_type } = filteredPassport as {
            countries: VisaCountry[];
            count: number;
            filter: string;
            filter_type: FilterType;
        };

        const descriptionText = `${count} ülkeye ${filter.toLowerCase()} olarak seyahat edebilirsin.`;

        return {
            title: `${titleMap[filter_type]} | Sorgulat`,
            description: descriptionText,
            robots: "index, follow",
            keywords: `${filter} ülkeler, ${titleMap[filter_type].toLowerCase()}, vizesiz seyahat, ${count} ülke, Türkiye pasaportu, vize politikası`,
            authors: [
                {
                    name: `${titleMap[filter_type]}`,
                    url: `https://www.sorgulat.com/pasaport/${slug}`,
                },
            ],
            icons: '/favicon.ico',
            openGraph: {
                title: `${titleMap[filter_type]} | Sorgulat`,
                description: descriptionText,
                url: `https://www.sorgulat.com/pasaport/${slug}`,
                images: `/images/openGraph/${filter_type}.png`,
                type: 'website',
                siteName: 'Sorgulat',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${titleMap[filter_type]} | Sorgulat`,
                description: descriptionText,
                images: `/images/openGraph/${filter_type}.png`,
                site: '@Sorgulat',
            },
            alternates: {
                canonical: `/images/openGraph/${filter_type}.png`,
                types: {
                  "application/opensearchdescription+xml": "/opensearch.xml",
                  "application/rss+xml": "https://sorgulat.com/rss.xml",
                },
              },
        }
    } catch (e) {
        console.error(slug, e, '-> error')
        return defaultGenerateMetadata()
    }
}


export default async function FilteredPassport({ params }: { params: Params }) {
    const { slug } = await params
    try {
        const filteredPassport = await getRequest(`/passport/${slug}`);
        const { countries, count, filter, filter_type } = filteredPassport as {
            countries: VisaCountry[];
            count: number;
            filter: string;
            filter_type: FilterType;
        };

        const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
        const type = generateVisaType(slug)
        const getBlogData = await getRequest(`/api/passport-blogs?populate[author][populate]=photo&populate=mainPhoto&filters[visaStatus][$eq]=${type}`, baseUrl);

        return (
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-1 pb-6 md:pb-12 md:gap-2">
                <PassportMap countries={countries} counts={count} />
                <div className='flex items-center justify-between gap-4 mb-2 md:mb-4'>
                    <h1 className='text-2xl md:text-3xl font-extrabold mb-2 md:mb-4'>{titleMap[filter_type]}</h1> 
                    <span className='inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium ring-1 ring-gray-500/10 ring-inset'>{count} ülke</span>
                </div>
                <section className='grid grid-cols-1 gap-8'>
                    {getBlogData.data.map((blog: TravelArticle) => (
                        <HorizontalBox data={blog} />
                    ))}
                </section>
            </div>
        )
    } catch (e) {
        return (
            <NotFound />
        )
    }
}