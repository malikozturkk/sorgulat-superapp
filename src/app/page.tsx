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
    
    return (
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col pb-6 md:pb-12 gap-8">
        {/* Hero Section */}
        <div className="w-full aspect-[16/9] bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl border border-blue-100 flex items-center justify-center relative overflow-hidden">
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

        {/* YKS Tercih Robotu - Yeni Özellik */}
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

        {/* Ana Özellikler Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Saat Kaç Kartı */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FiClock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Saat Kaç?</h2>
                <p className="text-gray-600">Dünyanın her yerinde anlık saat bilgisine ulaşın!</p>
              </div>
            </div>
            
            <div className="mb-6">
              <LiveClock initialTime={getUserData} fontSizeType="small" />
            </div>
            
            <Link 
              href="/saat-kac" 
              target="_blank" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Daha Fazla Bilgi
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Vize Haritası Kartı */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FiGlobe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Türkiye Vize Haritası</h2>
                <p className="text-gray-600">Türkiye'den vizesiz veya farklı vize türleriyle gidilebilen ülkeleri keşfedin!</p>
              </div>
            </div>
            
            <div className="mb-6">
              <PassportMap countries={countries} counts={counts} mapSize="lg" />
            </div>
            
            <Link 
              href="/pasaport" 
              target="_blank" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Daha Fazla Bilgi
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Saat Farkı Kartı */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <FiMapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Saat Farkı Bul</h2>
              <p className="text-gray-600">İki şehir seçerek, aralarındaki saat farkını öğrenin!</p>
            </div>
          </div>
          
          <div className="w-full">
            <CompareForm />
          </div>
        </div>

        {/* Blog Bölümü */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FiBookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Seyahat Etmeden Önce Bilmeniz Gerekenler</h2>
                  <p className="text-gray-600">Ülkelere özel seyahat rehberleri, vize gereklilikleri ve kapsamlı seyahat bilgileriyle yolculuklarınızı planlamanıza yardımcı olacak bloglarımızı keşfedin.</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/blog" 
              target="_blank" 
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Tüm Blogları Gör
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <Link 
            href="/blog" 
            target="_blank" 
            className="flex lg:hidden items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Tüm Blogları Gör
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
}
