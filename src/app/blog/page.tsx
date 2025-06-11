import { getRequest } from '@/utils/api';
import { generateMetadata } from '../layout';
import PopularCard from '@/components/Blog/PopularCard';
import { SearchParams, TravelArticle } from '@/components/Blog/blog.types';
import LargeBox from '@/components/Blog/ArticleBox/LargeBox';
import Pagination from '@/components/Blog/Pagination';
import FilterSortControls from '@/components/Blog/FilterSortControls';
import { sliceData } from '@/utils/generator';
import NotFound from '../not-found';
import { FiBookOpen, FiTrendingUp, FiArrowRight, FiStar, FiSearch, FiClock } from "react-icons/fi";

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'blog' } });
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
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-8 pb-6 md:pb-12">
            {data && data.length > 0 ? 
                <>
                    {/* Hero Section */}
                    <div className="w-full aspect-[16/9] bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl border border-purple-100 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/icons/worldMap.svg')] bg-no-repeat bg-center bg-contain opacity-30"></div>
                        <div className="relative z-10 w-full md:w-2/3 flex flex-col gap-4 md:gap-8 items-center text-center">
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                                Blog ve Haberler
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Türkiye'den vizesiz seyahat edilebilen ülkeler, saat bilgileri ve pasaport hakkında güncel haberler
                            </p>
                        </div>
                    </div>

                    {/* Filter Controls */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <FiSearch className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Filtreleme ve Sıralama</h2>
                                <p className="text-gray-600">Blog yazılarını istediğiniz şekilde filtreleyin ve sıralayın</p>
                            </div>
                        </div>
                        <FilterSortControls currentSort={sort} />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Blog Posts */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <FiBookOpen className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Blog Yazıları</h2>
                                        <p className="text-gray-600">En güncel seyahat rehberleri ve haberler</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-6">
                                    {data.map((passport: TravelArticle) => (
                                        <LargeBox key={passport.id} data={passport} />
                                    ))}
                                </div>
                                
                                <div className="mt-8">
                                    <Pagination currentPage={page} totalPages={pageCount} />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 relative overflow-hidden">
                                <div className="absolute top-4 right-4">
                                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <FiTrendingUp className="w-3 h-3" />
                                        POPÜLER
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                                        <FiTrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Popüler Yazılar</h2>
                                        <p className="text-gray-600">En çok okunan blog yazıları</p>
                                    </div>
                                </div>
                                
                                <PopularCard slicedRandom={slicedRandom} />
                            </div>
                        </div>
                    </div>
                </>
            :  
                <NotFound />
            }
        </div>
    );
}
