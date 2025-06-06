import { defaultGenerateMetadata } from "@/app/metadataConfig";
import VerticalBox from "@/components/Blog/ArticleBox/VerticalBox";
import { TravelArticle } from "@/components/Blog/blog.types";
import RichTextRenderer from "@/components/Blog/RichTextRenderer";
import { getRequest } from "@/utils/api";
import { formatDate, generateVisaUrl, getVisaInfo } from "@/utils/formatter";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import NotFound from "@/app/not-found";


type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

    try {
        if (!slug) {
            return defaultGenerateMetadata();
        }

        const getPassport = await getRequest(
            `/api/passport-blogs/slug/${slug}?populate=*&sort=createdAt:desc`,
            baseUrl
        );

        if (!getPassport) {
            return defaultGenerateMetadata();
        }

        const visa = getVisaInfo(getPassport.visaStatus);

        const { title, description, createdAt, coverImage, keywords, mainPhoto } = getPassport;
        const formattedDate = new Date(createdAt).toLocaleDateString("tr-TR");

        return {
            title: `${title} | Sorgulat`,
            description: description || "Pasaport hakkında detaylı bilgi edinin.",
            robots: "index, follow",
            keywords: `${keywords}, pasaport, vize, seyahat, ${visa.text} Ülkeler`,
            authors: [
                {
                    name: "Sorgulat",
                    url: `https://www.sorgulat.com/blog/pasaport/${slug}`,
                },
            ],
            icons: "/favicon.ico",
            openGraph: {
                title: `${title} | Sorgulat`,
                description: description || "Pasaport bilgileri ve seyahat detayları.",
                url: `https://www.sorgulat.com/blog/pasaport/${slug}`,
                images: baseUrl + mainPhoto.url,
                type: "article",
                siteName: "Sorgulat",
                publishedTime: createdAt,
            },
            twitter: {
                card: "summary_large_image",
                title: `${title} | Sorgulat`,
                description: description || "Pasaport bilgileri ve seyahat detayları.",
                images: baseUrl + mainPhoto.url,
                site: "@Sorgulat",
            },
            alternates: {
                canonical: `https://www.sorgulat.com/blog/pasaport/${slug}`,
                types: {
                    "application/opensearchdescription+xml": "/opensearch.xml",
                    "application/rss+xml": "https://sorgulat.com/rss.xml",
                },
            },
        };
    } catch (e) {
        console.error(`Error fetching metadata for slug: ${slug}`, e);
        return defaultGenerateMetadata();
    }
}



export default async function PassportBlogDetail({ params }: { params: Params }) {
    const { slug } = await params
    try {
        const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
        const getPassport: TravelArticle = await getRequest(`/api/passport-blogs/slug/${slug}?populate=*&sort=createdAt:desc`, baseUrl);
        const getPopular = await getRequest(`/api/passport-blogs?populate[author][populate]=photo&populate=mainPhoto`, baseUrl);
        const shuffledData: TravelArticle[] = getPopular.data
        .filter((item: TravelArticle) => item.slug !== slug)
        .sort(() => Math.random() - 0.5)
        const slicedPopular: TravelArticle[] = shuffledData.slice(0, 4);
        
        const visa = getVisaInfo(getPassport.visaStatus)
        const visaMainUrl = generateVisaUrl(getPassport.visaStatus)
        const icons: Record<string, JSX.Element> = {
            instagram: <FaInstagram className="text-pink-500 w-6 h-6" />,
            x: <FaXTwitter className="w-6 h-6" />,
            linkedin: <FaLinkedin className="text-blue-600 w-6 h-6" />,
        };

        return (
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-1 pb-6 md:pb-12 md:gap-2">
                <div className="bg-white rounded-lg shadow-xl p-2 sm:p-6">
                <div className="mb-4 md:mb-8 text-center mx-auto md:max-w-4xl">
                    <figure> 
                        <Image src={baseUrl + getPassport.mainPhoto.url} alt={getPassport.title} className="w-full rounded-lg transition-transform duration-300" itemProp="image" width={900} height={500} />
                    </figure>
                </div>
                
                <article>
                    <header className="mb-4">
                        <h1 className="text-2xl md:text-4xl font-extrabold mb-4">{getPassport.title}</h1>
                        <div className="text-sm text-gray-600 mt-2 not-prose mb-4"> <span>Vize Durumu:</span> <strong style={{ color: visa.color }}>{visa.text}</strong></div>
                        <div className='flex items-center gap-2 pt-2 md:pt-4 border-t'>
                            <Image src={baseUrl + getPassport?.author?.photo?.url} alt={getPassport.author.name} width={32} height={32} />
                            <div className='text-sm'>
                                <p>{getPassport.author.name}</p>
                                <p className="text-sm"> Yayınlanma tarihi: <time dateTime={formatDate(getPassport.createdAt).isoDate}>{formatDate(getPassport.createdAt).formattedDate}</time></p>
                            </div>
                        </div>
                    </header>
                    <div className="pb-4 lg:pb-8">
                        <RichTextRenderer content={getPassport.content} />
                    </div>
                    {getPassport.warnings.map((warning: any) => (
                        <div className="mb-4 flex items-center justify-center flex-col text-center rounded-md bg-gray-100 p-2 text-xs font-medium text-gray-600 gap-1 md:gap-2">
                            <svg fill="#f39c12" version="1.1" width={16} height={16} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 478.125 478.125" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <circle cx="239.904" cy="314.721" r="35.878"></circle> <path d="M256.657,127.525h-31.9c-10.557,0-19.125,8.645-19.125,19.125v101.975c0,10.48,8.645,19.125,19.125,19.125h31.9 c10.48,0,19.125-8.645,19.125-19.125V146.65C275.782,136.17,267.138,127.525,256.657,127.525z"></path> <path d="M239.062,0C106.947,0,0,106.947,0,239.062s106.947,239.062,239.062,239.062c132.115,0,239.062-106.947,239.062-239.062 S371.178,0,239.062,0z M239.292,409.734c-94.171,0-170.595-76.348-170.595-170.596c0-94.248,76.347-170.595,170.595-170.595 s170.595,76.347,170.595,170.595C409.887,333.387,333.464,409.734,239.292,409.734z"></path> </g> </g> </g> </g></svg><strong>{warning.title}:</strong> {warning.description}
                        </div>
                    ))}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-lang="tr">
                        {getPassport.photos.map((photo: any) => (
                            <Image src={baseUrl + photo.url} alt={getPassport.title} width={200} height={128} itemProp='image' className="w-full h-32 min-h-32 object-cover rounded-lg shadow-lg" />
                        ))}
                        
                    </div>
                    <div className="text-center">
                        <nav aria-label="Breadcrumb" className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                            <ul className="flex justify-center items-center flex-wrap w-full list-none p-0 not-prose">
                                <li> 
                                    <Link href="/" className="hover:underline text-primary mx-1 my-1">Ana Sayfa</Link>
                                </li>
                                <li>
                                    <span aria-hidden="true">/</span>
                                </li>
                                <li> 
                                    <Link href="/pasaport" className="hover:underline text-primary mx-1 my-1">Pasaport</Link>
                                </li>
                                <li>
                                    <span aria-hidden="true">/</span>
                                </li>
                                <li>
                                    <Link href={`/pasaport/${visaMainUrl.slug}`} className="hover:underline text-primary mx-1 my-1">{visaMainUrl.text}</Link>
                                    </li>
                                <li>
                                    <span aria-hidden="true">/</span></li>
                            </ul>
                        </nav>
                        <div className="inline-flex flex-wrap justify-center space-x-2 not-prose">
                            {getPassport.keywords.map((keyword: string) => (
                                <span key={keyword} className="inline-flex items-center px-3 py-1 my-1 rounded-full text-sm font-medium bg-primaryLight text-primary">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-6 mt-4 bg-gray-50 flex-col md:flex-row'>
                        <Image src={baseUrl + getPassport?.author?.photo?.url} alt={getPassport.author.name} width={56} height={56} className="rounded-full" />
                        <div className='text-lg font-bold'>
                            <p>{getPassport.author.name}</p>
                        </div>
                        {getPassport.author.bio &&
                            <div className="border-t pt-4 md:border-l md:pl-4 md:pt-0 md:border-t-0 border-solid border-gray-200 flex flex-col">
                                <RichTextRenderer content={getPassport.author.bio} />
                                <div className="flex items-center gap-2 flex-wrap">
                                    {Object.entries(getPassport.author.socialLinks).map(([platform, url]) => (
                                        <Link
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition"
                                        >
                                        {icons[platform] || <span className="capitalize">{platform}</span>}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <div className='flex items-center justify-between mt-6'>
                        <h1 className='text-2xl md:text-3xl font-extrabold mb-2 md:mb-4'>Popüler Yazılar</h1>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        {slicedPopular.map((popular: TravelArticle) => (
                            <VerticalBox data={popular} key={popular.documentId} />
                        ))}
                    </div>
                </article>
                </div>
                <script type="application/ld+json" suppressHydrationWarning>
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                        {
                            "@type": "Question",
                            "name": `${getPassport.title} nedir?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": getPassport.description || `${getPassport.title} hakkında detaylı bilgi için yazımızı okuyun.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${getPassport.title} için vize gerekli mi?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Vize durumu: ${visa.text}.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${getPassport.title} ne zaman yayımlandı?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Bu yazı ${formatDate(getPassport.createdAt).formattedDate} tarihinde yayımlandı.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${getPassport.title} yazısının yazarı kimdir?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${getPassport.author.name} tarafından yazılmıştır.`
                            }
                        },
                        ...(getPassport.warnings.length > 0
                            ? getPassport.warnings.map((warning: any) => ({
                                "@type": "Question",
                                "name": `${warning.title} hakkında uyarı var mı?`,
                                "acceptedAnswer": {
                                "@type": "Answer",
                                "text": warning.description
                                }
                            }))
                            : [])
                        ]
                    })}
                </script>
            </div>
        )
    } catch (e) {
        return (
            <NotFound />
        )
    }
}