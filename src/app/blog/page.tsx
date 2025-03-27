import { getRequest } from '@/utils/api';
import { generateMetadata } from '../layout';
import BlogPagination from '@/components/Blog/BlogPagination';
import PopularCard from '@/components/Blog/PopularCard';

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'blog' } });
};

export default async function Blog({ searchParams }: { searchParams: { page?: string } }) {
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
    const getAllPassport = await getRequest(`/api/passport-blogs?populate=*&pagination[limit]=100`, baseUrl);
    const shuffledData = getAllPassport.data.sort(() => Math.random() - 0.5);
    const page = Number(searchParams?.page) || 1;
    const limit = 10; 
    const getPaginationPassport = await getRequest(`/api/passport-blogs?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${limit}`, baseUrl);

    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col pb-6 md:pb-12 gap-8">
            <div className='text-center'>
                <h1 className='text-2xl md:text-4xl font-extrabold mb-1 md:mb-2'>Blog ve Haberler</h1>
                <p className='text-lg text-gray-500'>Türkiye’den vizesiz seyahat edilebilen ülkeler, saat bilgileri ve pasaport hakkında güncel haberler</p>
            </div>
            <div className='flex flex-col md:flex-row gap-8'>
                <div className='lg:w-2/3 pb-8'>
                    <div className='flex flex-col gap-4 md:gap-6'>
                        <BlogPagination initialData={getPaginationPassport} currentPage={page} />
                    </div>
                </div>
                <div className='lg:w-1/3 pb-8'>
                    <PopularCard data={shuffledData} />
                </div>
            </div>
        </div>
    );
}