import PassportMap from '@/components/PassportMap';
import { generateMetadata } from '../layout';
import { getRequest } from '@/utils/api';
import Link from 'next/link';
import { sliceData } from '@/utils/generator';
import { TravelArticle } from '@/components/Blog/blog.types';
import VerticalBox from '@/components/Blog/ArticleBox/VerticalBox';

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
                        <VerticalBox data={visaFree} key={visaFree.documentId} />
                    ))}
                </div>

                <div className='flex items-center justify-between mt-8 md:mt-16'>
                    <h1 className='text-2xl md:text-3xl font-extrabold mb-2 md:mb-4'>Vize Gereken Ülkeler</h1>
                    <Link className='text-primary hover:underline text-sm' href="pasaport/vizeli-seyahat">Tümünü gör</Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {slicedVisa.map((visa: TravelArticle) => (
                        <VerticalBox data={visa} key={visa.documentId} />
                    ))}
                </div>

                <div className='flex items-center justify-between mt-8 md:mt-16'>
                    <h1 className='text-2xl md:text-3xl font-extrabold mb-2 md:mb-4'>Kapıda Vize Veren Ülkeler</h1>
                    <Link className='text-primary hover:underline text-sm' href="pasaport/kapida-vize-seyahat">Tümünü gör</Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {slicedVisaOnArrival.map((visaOnArrival: TravelArticle) => (
                            <VerticalBox data={visaOnArrival} key={visaOnArrival.documentId} />
                        ))}
                </div>


                <div className='flex items-center justify-between mt-8 md:mt-16'>
                    <h1 className='text-2xl md:text-3xl font-extrabold mb-2 md:mb-4'>eTA Gereken Ülkeler</h1>
                    <Link className='text-primary hover:underline text-sm' href="pasaport/eta-seyahat">Tümünü gör</Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {slicedVisaEta.map((eta: TravelArticle) => (
                            <VerticalBox data={eta} key={eta.documentId} />
                        ))}
                </div>
            </section>
        </div>
    )
}