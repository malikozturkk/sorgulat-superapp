import { getRequest, getUserLocation } from "@/utils/api";
import PassportMap from "@/components/PassportMap";
import { headers } from "next/headers";
import { TimeData } from "./saat-kac/types/Timezone.types";
import LiveClock from "@/components/Timezone/LiveClock";
import Link from "next/link";
import VerticalBox from "@/components/Blog/ArticleBox/VerticalBox";
import { TravelArticle } from "@/components/Blog/blog.types";
import SearchForm from "@/components/Timezone/SearchForm";
import CompareForm from "@/components/Timezone/CompareForm";
import { FiClock, FiGlobe, FiMapPin, FiSearch, FiArrowRight, FiBookOpen, FiStar, FiTrendingUp } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function Home() {
    const passportResponse = await getRequest(`/passport`);
    const countries = passportResponse?.countries || [];
    const counts = passportResponse?.counts || {};

    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "auto";
    const userLocation = await getUserLocation(ip)
    
    let getUserData: TimeData;
    try {
        const timezoneResponse = await getRequest(`/timezones/${encodeURIComponent(userLocation)}`);
        getUserData = timezoneResponse || await getRequest("/timezones/turkiye");
    } catch {
        getUserData = await getRequest("/timezones/turkiye");
    }

    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
    const getPopular = await getRequest(`/api/passport-blogs?populate[author][populate]=photo&populate=mainPhoto`, baseUrl);
    const shuffledData: TravelArticle[] = getPopular?.data?.sort(() => Math.random() - 0.5) || [];
    const slicedPopular: TravelArticle[] = shuffledData.slice(0, 4);
    
    return (
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col pb-6 md:pb-12 gap-8">
        <div className="w-full p-3 aspect-[16/9] bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl border border-blue-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/icons/worldMap.svg')] bg-no-repeat bg-center bg-contain opacity-30"></div>
          <div className="relative z-10 w-full md:w-2/3 flex flex-col gap-4 md:gap-8 items-center text-center">
            <h1 className='text-xl md:text-5xl font-extrabold text-gray-900'>
              Dünyanın Saatini, Vizelerini, Eğitim Rehberlerini ve Seyahat Bilgilerini Keşfedin!
            </h1>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl">
              Anlık saat bilgilerini görüntüleyin, vize gerekliliklerini haritadan keşfedin, YKS tercih robotumuzla üniversite seçiminizi kolaylaştırın ve seyahat rehberlerimizle yolculuğunuza hazırlanın.
            </p>
            <div className="hidden lg:block w-full max-w-2xl">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <SearchForm />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <FiStar className="w-3 h-3" />
              YENİ
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                <FiBookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                YKS Tercih Robotu
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl">
                Size en uygun üniversite ve bölümleri bulmak için akıllı tercih robotumuzu kullanın. 
                Puanınıza, sıralamanıza ve tercihlerinize göre en iyi seçenekleri keşfedin.
              </p>
              <Link 
                href="/egitim/tercih-robotu" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Tercih Robotunu Kullan
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FiTrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Akıllı Filtreleme</h3>
                  </div>
                  <p className="text-sm text-gray-600">Şehir, üniversite ve bölüm tercihlerinize göre filtreleme</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <FiSearch className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Detaylı Analiz</h3>
                  </div>
                  <p className="text-sm text-gray-600">Puan ve sıralama analizi ile en uygun seçenekler</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <FiClock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Saat Kaç?
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl">
                  Dünyanın her yerinde anlık saat bilgisine ulaşın! Farklı zaman dilimlerini keşfedin ve global saat bilgilerini takip edin.
                </p>
                <div className="mb-6">
                  <LiveClock initialTime={getUserData} fontSizeType="small" />
                </div>
                <Link 
                  href="/saat-kac" 
                  target="_blank" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Daha Fazla Bilgi
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <FiGlobe className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Global Saat</h3>
                    </div>
                    <p className="text-sm text-gray-600">Dünyanın her yerindeki anlık saat bilgileri</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                        <FiSearch className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Kolay Arama</h3>
                    </div>
                    <p className="text-sm text-gray-600">Şehir ve ülke bazında hızlı saat arama</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <FiGlobe className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Türkiye Vize Haritası
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl">
                  Türkiye'den vizesiz veya farklı vize türleriyle gidilebilen ülkeleri keşfedin! 
                  Seyahat planlarınızı kolayca yapın.
                </p>
                <Link 
                  href="/pasaport" 
                  target="_blank" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Haritayı Keşfet
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="flex-1">
                <div className="mb-6">
                  <PassportMap countries={countries} counts={counts} mapSize="lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <FiMapPin className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Vize Durumu</h3>
                    </div>
                    <p className="text-sm text-gray-600">Ülkelere göre vize gereklilikleri</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <FiTrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Güncel Bilgi</h3>
                    </div>
                    <p className="text-sm text-gray-600">En güncel vize ve pasaport bilgileri</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                <FiMapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Saat Farkı Bul
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl">
                İki şehir seçerek, aralarındaki saat farkını öğrenin! 
                Seyahat planlarınız için zaman hesaplamalarını kolayca yapın.
              </p>
              <Link 
                href="/saat-kac/fark" 
                target="_blank" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Saat Farkı Hesapla
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="flex-1">
              <div className="w-full mb-6">
                <CompareForm />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <FiClock className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Hızlı Hesaplama</h3>
                  </div>
                  <p className="text-sm text-gray-600">Anında saat farkı hesaplama</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                      <FiSearch className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Kolay Seçim</h3>
                  </div>
                  <p className="text-sm text-gray-600">Şehir listesinden kolay seçim</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                <FiBookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Seyahat Rehberleri
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl">
                Ülkelere özel seyahat rehberleri, vize gereklilikleri ve kapsamlı seyahat bilgileriyle 
                yolculuklarınızı planlamanıza yardımcı olacak bloglarımızı keşfedin.
              </p>
              <Link 
                href="/blog" 
                target="_blank" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Tüm Blogları Gör
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="flex-1">
              {slicedPopular.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
                  {slicedPopular.slice(0, 2).map((popular: TravelArticle) => (
                    <VerticalBox data={popular} key={popular.documentId} />
                  ))}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-indigo-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <FiBookOpen className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Detaylı Rehberler</h3>
                  </div>
                  <p className="text-sm text-gray-600">Kapsamlı seyahat ve vize rehberleri</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-indigo-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FiTrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Güncel İçerik</h3>
                  </div>
                  <p className="text-sm text-gray-600">Sürekli güncellenen seyahat bilgileri</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
