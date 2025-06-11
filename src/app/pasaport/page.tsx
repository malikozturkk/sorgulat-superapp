import PassportMap from '@/components/PassportMap';
import { generateMetadata } from '../layout';
import { getRequest } from '@/utils/api';
import Link from 'next/link';
import { sliceData } from '@/utils/generator';
import { TravelArticle } from '@/components/Blog/blog.types';
import VerticalBox from '@/components/Blog/ArticleBox/VerticalBox';
import { FiGlobe, FiMapPin, FiArrowRight, FiStar, FiShield, FiClock, FiCheckCircle } from "react-icons/fi";

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
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-8 pb-6 md:pb-12">
            {/* Hero Section */}
            <div className="w-full aspect-[16/9] bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-2xl border border-green-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/icons/worldMap.svg')] bg-no-repeat bg-center bg-contain opacity-30"></div>
                <div className="relative z-10 w-full md:w-2/3 flex flex-col gap-4 md:gap-8 items-center text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Türkiye Vize Haritası
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Türkiye'den vizesiz veya farklı vize türleriyle gidilebilen ülkeleri keşfedin!
                    </p>
                </div>
            </div>

            {/* Interactive Map Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <FiGlobe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">İnteraktif Vize Haritası</h2>
                        <p className="text-gray-600">Türk pasaportu ile gidilebilen ülkeleri harita üzerinden keşfedin</p>
                    </div>
                </div>
                <PassportMap countries={countries} counts={counts} />
            </div>

            {/* Vize Türleri Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Vizesiz Ülkeler */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            <FiCheckCircle className="w-3 h-3" />
                            VİZESİZ
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <FiCheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Vizesiz Ülkeler</h2>
                            <p className="text-gray-600">Türk pasaportu ile vizesiz seyahat edilebilen ülkeler</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {slicedVisaFree.map((visaFree: TravelArticle) => (
                            <VerticalBox data={visaFree} key={visaFree.documentId} />
                        ))}
                    </div>
                    
                    <Link 
                        href="pasaport/vizesiz-seyahat" 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Tümünü Gör
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Vize Gereken Ülkeler */}
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            <FiShield className="w-3 h-3" />
                            VİZE GEREKLİ
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <FiShield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Vize Gereken Ülkeler</h2>
                            <p className="text-gray-600">Türk pasaportu ile vize alınması gereken ülkeler</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {slicedVisa.map((visa: TravelArticle) => (
                            <VerticalBox data={visa} key={visa.documentId} />
                        ))}
                    </div>
                    
                    <Link 
                        href="pasaport/vizeli-seyahat" 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Tümünü Gör
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Alt Vize Türleri Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Kapıda Vize */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            <FiClock className="w-3 h-3" />
                            KAPIDA VİZE
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                            <FiClock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Kapıda Vize Veren Ülkeler</h2>
                            <p className="text-gray-600">Havalimanında veya sınırda vize alınabilen ülkeler</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {slicedVisaOnArrival.map((visaOnArrival: TravelArticle) => (
                            <VerticalBox data={visaOnArrival} key={visaOnArrival.documentId} />
                        ))}
                    </div>
                    
                    <Link 
                        href="pasaport/kapida-vize-seyahat" 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Tümünü Gör
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* eTA */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            <FiStar className="w-3 h-3" />
                            eTA
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                            <FiStar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">eTA Gereken Ülkeler</h2>
                            <p className="text-gray-600">Elektronik seyahat izni gerektiren ülkeler</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {slicedVisaEta.map((eta: TravelArticle) => (
                            <VerticalBox data={eta} key={eta.documentId} />
                        ))}
                    </div>
                    
                    <Link 
                        href="pasaport/eta-seyahat" 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Tümünü Gör
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}