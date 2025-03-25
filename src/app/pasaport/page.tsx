import PassportMap from '@/components/PassportMap';
import { generateMetadata } from '../layout';
import { getRequest } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/formatter';
import { sliceData } from '@/utils/generator';
import { TravelArticle } from '@/components/Blog/blog.types';

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'pasaport' } });
};

export default async function Passport() {
    const response = await getRequest(`/passport`);
    const { countries, counts } = response;
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
    const visaStatuses = ["visa-free", "visa", "visa-on-arrival", "eta"];
    const blogs = await Promise.all(visaStatuses.map(status => getRequest(`/api/passport-blogs?populate[author][populate]=photo&populate=mainPhoto&filters[visaStatus][$eq]=${status}`, baseUrl)));
    const [slicedVisaFree, slicedVisa, slicedVisaOnArrival, slicedVisaEta]: TravelArticle[][] = blogs.map(blog =>
        sliceData(blog.data, 4) as TravelArticle[]
    );
    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-1 pb-6 md:pb-12 md:gap-2">
            <PassportMap countries={countries} counts={counts} />
            <section>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl md:text-3xl font-extrabold mb-2 md:mb-4'>Vizesiz Ülkeler</h1>
                    <Link className='text-primary hover:underline text-sm' href="pasaport/vizesiz-seyahat">Tümünü gör</Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {slicedVisaFree.map((visaFree: TravelArticle) => (
                        <Link className='border rounded-lg p-2 bg-white flex justify-between gap-4 flex-col' href={`/blog/pasaport/${visaFree.slug}`}>
                            <div>
                                <Image className='mb-2' src={baseUrl + visaFree.mainPhoto.url} alt={visaFree.title} width={900} height={500} itemProp='image' />
                                <h3 className='text-base font-semibold mb-2 text-primary hover:underline' itemProp='name'>{visaFree.title}</h3>
                                <p className='text-gray-600 dark:text-gray-400 text-sm' itemProp='description'>{visaFree.description}</p>
                            </div>
                            <div className='flex items-center gap-2 pt-2 md:pt-4 border-t'>
                                <Image src={baseUrl + visaFree.author.photo.url} alt={visaFree.author.name} width={32} height={32} />
                                <div className='text-sm'>
                                    <p>{visaFree.author.name}</p>
                                    <time className='text-sm' dateTime={formatDate(visaFree.createdAt).isoDate}>{formatDate(visaFree.createdAt).formattedDate}</time>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className='flex items-center justify-between mt-8 md:mt-16'>
                    <h1 className='text-2xl md:text-3xl font-extrabold mb-2 md:mb-4'>Vize Gereken Ülkeler</h1>
                    <Link className='text-primary hover:underline text-sm' href="pasaport/vizeli-seyahat">Tümünü gör</Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {slicedVisa.map((visa: TravelArticle) => (
                            <Link className='border rounded-lg p-2 bg-white flex justify-between gap-4 flex-col' href={`/blog/pasaport/${visa.slug}`}>
                                <div>
                                    <Image className='mb-2' src={baseUrl + visa.mainPhoto.url} alt={visa.title} width={900} height={500} itemProp='image' />
                                    <h3 className='text-base font-semibold mb-2 text-primary hover:underline' itemProp='name'>{visa.title}</h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-sm' itemProp='description'>{visa.description}</p>
                                </div>
                                <div className='flex items-center gap-2 pt-2 md:pt-4 border-t'>
                                    <Image src={baseUrl + visa.author.photo.url} alt={visa.author.name} width={32} height={32} />
                                    <div className='text-sm'>
                                        <p>{visa.author.name}</p>
                                        <time className='text-sm' dateTime={formatDate(visa.createdAt).isoDate}>{formatDate(visa.createdAt).formattedDate}</time>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>

                <div className='flex items-center justify-between mt-8 md:mt-16'>
                    <h1 className='text-2xl md:text-3xl font-extrabold mb-2 md:mb-4'>Kapıda Vize Veren Ülkeler</h1>
                    <Link className='text-primary hover:underline text-sm' href="pasaport/kapida-vize-seyahat">Tümünü gör</Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {slicedVisaOnArrival.map((visa: TravelArticle) => (
                            <Link className='border rounded-lg p-2 bg-white flex justify-between gap-4 flex-col' href={`/blog/pasaport/${visa.slug}`}>
                                <div>
                                    <Image className='mb-2' src={baseUrl + visa.mainPhoto.url} alt={visa.title} width={900} height={500} itemProp='image' />
                                    <h3 className='text-base font-semibold mb-2 text-primary hover:underline' itemProp='name'>{visa.title}</h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-sm' itemProp='description'>{visa.description}</p>
                                </div>
                                <div className='flex items-center gap-2 pt-2 md:pt-4 border-t'>
                                    <Image src={baseUrl + visa.author.photo.url} alt={visa.author.name} width={32} height={32} />
                                    <div className='text-sm'>
                                        <p>{visa.author.name}</p>
                                        <time className='text-sm' dateTime={formatDate(visa.createdAt).isoDate}>{formatDate(visa.createdAt).formattedDate}</time>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>


                <div className='flex items-center justify-between mt-8 md:mt-16'>
                    <h1 className='text-2xl md:text-3xl font-extrabold mb-2 md:mb-4'>eTA Gereken Ülkeler</h1>
                    <Link className='text-primary hover:underline text-sm' href="pasaport/eta-seyahat">Tümünü gör</Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {slicedVisaEta.map((visa: TravelArticle) => (
                            <Link className='border rounded-lg p-2 bg-white flex justify-between gap-4 flex-col' href={`/blog/pasaport/${visa.slug}`}>
                                <div>
                                    <Image className='mb-2' src={baseUrl + visa.mainPhoto.url} alt={visa.title} width={900} height={500} itemProp='image' />
                                    <h3 className='text-base font-semibold mb-2 text-primary hover:underline' itemProp='name'>{visa.title}</h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-sm' itemProp='description'>{visa.description}</p>
                                </div>
                                <div className='flex items-center gap-2 pt-2 md:pt-4 border-t'>
                                    <Image src={baseUrl + visa.author.photo.url} alt={visa.author.name} width={32} height={32} />
                                    <div className='text-sm'>
                                        <p>{visa.author.name}</p>
                                        <time className='text-sm' dateTime={formatDate(visa.createdAt).isoDate}>{formatDate(visa.createdAt).formattedDate}</time>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </section>
        </div>
    )
}