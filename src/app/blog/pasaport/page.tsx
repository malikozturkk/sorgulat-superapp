import { getRequest } from '@/utils/api';
import { generateMetadata } from '@/app/layout';
import PopularCard from '@/components/Blog/PopularCard';
import { SearchParams, TravelArticle } from '@/components/Blog/blog.types';
import LargeBox from '@/components/Blog/ArticleBox/LargeBox';
import Pagination from '@/components/Blog/Pagination';
import FilterSortControls from '@/components/Blog/FilterSortControls';
import { sliceData } from '@/utils/generator';
import NotFound from '@/app/not-found';

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'pasaport-blog' } });
};

export default async function Blog({ searchParams }: SearchParams) {
    const { page: defaultPage, sort = 'createdAt:desc' } = await searchParams;
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
    const currentPage = Number(defaultPage) || 1;
    const pageSize = 5;

    const getAllPassport = await getRequest(
        `/api/passport-blogs?populate=*&sort=${sort}&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
        baseUrl
    );

    const { data, meta } = getAllPassport;
    const { page, pageCount } = meta.pagination;

    const getAllBlog = await getRequest(`/api/passport-blogs?populate[author][populate]=photo&populate=mainPhoto`, baseUrl);
    const shuffledData: TravelArticle[] = [...getAllBlog.data].sort(() => Math.random() - 0.5)
    const slicedRandom: TravelArticle[] = sliceData(shuffledData, 5)

    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col pb-6 md:pb-12 gap-8">
            {data && data.length > 0 ? 
                <>
                    <div className='text-center'>
                    <h1 className='text-2xl md:text-4xl font-extrabold mb-1 md:mb-2'>Pasaport Blog ve Haberleri</h1>
                    <p className='text-lg text-gray-500'>Türkiye’den vizesiz seyahat edilebilen ülkeler ve pasaport hakkında güncel haberler</p>
                    </div>
                    <FilterSortControls currentSort={sort} />
                    <div className='flex flex-col md:flex-row gap-8'>
                        <div className='lg:w-2/3 pb-8'>
                            <div className='flex flex-col gap-4 md:gap-6'>
                                {data.map((passport: TravelArticle) => (
                                    <LargeBox key={passport.id} data={passport} />
                                ))}
                            </div>
                            <Pagination currentPage={page} totalPages={pageCount} />
                        </div>
                        <div className='lg:w-1/3 pb-8'>
                            <PopularCard slicedRandom={slicedRandom} />
                        </div>
                    </div>
                </>
            :  
                <NotFound />
            }
        </div>
    );
}