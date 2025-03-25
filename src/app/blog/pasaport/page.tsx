import { generateMetadata } from "@/app/layout";
import { getRequest } from '@/utils/api';
import PopularCard from "@/components/Blog/PopularCard";
import { TravelArticle } from "@/components/Blog/blog.types";
import LargeBox from '@/components/Blog/ArticleBox/LargeBox';

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
                        {getAllPassport.data.map((passport: TravelArticle) => (
                            <LargeBox data={passport} />
                        ))}
                    </div>
                </div>
                <div className='lg:w-1/3 pb-8'>
                <PopularCard data={getAllPassport.data} />
                </div>
            </div>
        </div>
    );
}