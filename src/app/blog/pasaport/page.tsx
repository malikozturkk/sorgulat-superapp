import { generateMetadata } from "@/app/layout";
import { getRequest } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/formatter';

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'pasaport-blog' } });
};

export default async function PassportBlog() {
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
    const getAllPassport = await getRequest(`/api/passport-blogs?populate=*&sort=createdAt:desc`, baseUrl);

    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col pb-6 md:pb-12 gap-8">
            <div className='text-center'>
                <h1 className='text-2xl md:text-4xl font-extrabold mb-1 md:mb-2'>Pasaport Blog ve Haberleri</h1>
                <p className='text-lg text-gray-500'>Türkiye’den vizesiz seyahat edilebilen ülkeler, saat bilgileri ve pasaport hakkında güncel haberler</p>
            </div>
            <div className='flex flex-col md:flex-row gap-8'>
                <div className='lg:w-2/3 pb-8'>
                    <div className='flex flex-col gap-4 md:gap-6'>
                        {getAllPassport.data.map((passport: any) => (
                            <article className='bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-md' key={passport.slug + passport.id}>
                                <Link href={`/blog/pasaport/${passport.slug}`}>
                                    <figure>
                                        <Image src={baseUrl + passport.mainPhoto.url} alt={passport.title} width={900} height={500} className='rounded-lg transition-transform duration-300 hover:scale-105' itemProp='image' />
                                    </figure>
                                </Link>
                                <div className='p-4 flex flex-col flex-grow'>
                                    <div className='flex items-center text-xs text-gray-500 mb-2'>
                                        <time dateTime={formatDate(passport.createdAt).isoDate} itemProp="datePublished" className='min-w-fit'> {formatDate(passport.createdAt).formattedDate} </time>
                                        <span className="mx-2">•</span>
                                        <div className="truncate max-w-full">
                                            <span className="text-primary">
                                                Pasaport
                                            </span>
                                        </div>
                                    </div>
                                    <Link href={`/blog/pasaport/${passport.slug}`} itemProp='url'>
                                        <title className='text-lg font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary' itemProp='headline'>{passport.title}</title>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow" itemProp="description">{passport.description}</p>
                                        <div className="text-primary text-sm font-medium hover:opacity-80 inline-flex items-center mt-auto">
                                            <span>Devamını oku</span> 
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </div>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                <div className='lg:w-1/3 pb-8'>
                    <div className='sticky top-4 md:top-6 space-y-6'>
                        <div className="bg-white rounded-lg shadow-sm p-5">
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                            <div className="text-lg font-semibold text-gray-900">Öne Çıkan Yazılar</div>
                        </div>
                        <div className="space-y-4">
                            {getAllPassport.data.map((slicedPassport: any, index: number) => (
                                <div className="flex items-start" key={slicedPassport.slug + slicedPassport.id}>
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primaryLight text-primary flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                                {index + 1}
                                </span>
                                <div>
                                <div className="text-sm font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2">
                                    <Link href={`/blog/pasaport/${slicedPassport.slug}`}>
                                    {slicedPassport.title}
                                    </Link>
                                </div>
                                <time dateTime={formatDate(slicedPassport.createdAt).isoDate} itemProp="datePublished" className="text-xs text-gray-500 block mt-1"> {formatDate(slicedPassport.createdAt).formattedDate} </time>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}