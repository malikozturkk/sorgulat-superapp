import { getRequest, getUserLocation } from "@/utils/api";
import PassportMap from "@/components/PassportMap";
import { headers } from "next/headers";
import { TimeData } from "./saat-kac/types/Timezone.types";
import LiveClock from "@/components/Timezone/LiveClock";
import Link from "next/link";
import VerticalBox from "@/components/Blog/ArticleBox/VerticalBox";
import { TravelArticle } from "@/components/Blog/blog.types";
import SearchForm from "@/components/Timezone/SearchForm";

export const dynamic = "force-dynamic";

export default async function Home() {
    const passportResponse = await getRequest(`/passport`);
    const { countries, counts } = passportResponse;

    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "auto";
    const userLocation = await getUserLocation(ip)
    const [getUserData]: [TimeData] = await Promise.all([
      getRequest(`/timezones/${encodeURIComponent(userLocation)}`)
        .catch(() => getRequest("/timezones/turkiye"))
    ]);

    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
    const getPopular = await getRequest(`/api/passport-blogs?populate[author][populate]=photo&populate=mainPhoto`, baseUrl);
    const shuffledData: TravelArticle[] = getPopular.data.sort(() => Math.random() - 0.5)
    const slicedPopular: TravelArticle[] = shuffledData.slice(0, 4);
    
    return (
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col pb-6 md:pb-12 gap-8">
        <div className="w-full aspect-[16/9] bg-[url('/icons/worldMap.svg')] bg-no-repeat bg-center bg-contain flex items-center justify-center">
          <div className="w-full md:w-2/3 flex flex-col gap-4 md:gap-8 items-center">
            <h1 className='text-xl md:text-5xl font-extrabold text-center'>Dünyanın Saatini, Vizelerini ve Seyahat Rehberlerini Keşfedin!</h1>
            <p className="text-sm md:text-lg text-center text-gray-500">Anlık saat bilgilerini görüntüleyin, vize gerekliliklerini haritadan keşfedin ve seyahat rehberlerimizle yolculuğunuza hazırlanın.</p>
            <div className="hidden lg:block"><SearchForm /></div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="border border-gray-200 rounded-lg p-4 w-full md:w-1/2 flex-1 flex items-stretch justify-between flex-col">
            <div className="w-full">
              <h1 className='text-lg md:text-2xl font-extrabold mb-2 md:mb-4'>Saat Kaç?</h1>
              <p className="mb-2 md:mb-4 text-sm md:text-lg">Dünyanın her yerinde anlık saat bilgisine ulaşın!</p>
              <LiveClock initialTime={getUserData} fontSizeType="small" />
            </div>
            <Link href="/saat-kac" target="_blank" className="bg-primary text-white rounded h-12 flex items-center justify-center mt-4 md:mt-8 duration-150 hover:opacity-80">Daha Fazla Bilgi</Link>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 w-full md:w-1/2 flex-1 flex items-stretch justify-between flex-col">
            <div className="w-full">
              <h1 className='text-lg md:text-2xl font-extrabold mb-2 md:mb-4'>Türkiye Vize Haritası</h1>
              <p className="mb-2 md:mb-4 text-sm md:text-lg">Türkiye'den vizesiz veya farklı vize türleriyle gidilebilen ülkeleri keşfedin!</p>
              <PassportMap countries={countries} counts={counts} mapSize="lg" />
            </div>
            <Link href="/pasaport" target="_blank" className="bg-primary text-white rounded h-12 flex items-center justify-center mt-4 md:mt-8 duration-150 hover:opacity-80">Daha Fazla Bilgi</Link>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 w-full flex items-stretch justify-between flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h1 className='text-lg md:text-2xl font-extrabold mb-2 md:mb-4'>Seyahat Etmeden Önce Bilmeniz Gerekenler</h1>
              <p className="mb-2 md:mb-4 text-sm md:text-lg">Ülkelere özel seyahat rehberleri, vize gereklilikleri ve kapsamlı seyahat bilgileriyle yolculuklarınızı planlamanıza yardımcı olacak bloglarımızı keşfedin.</p>
            </div>
            <Link href="/blog" target="_blank" className="hidden md:flex gap-4 border border-gray-400 rounded min-w-fit p-2 duration-150 hover:bg-primary hover:text-white hover:border-primary">Tüm Blogları Gör</Link>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {slicedPopular.map((popular: TravelArticle) => (
              <VerticalBox data={popular} key={popular.documentId} />
            ))}
          </div>
          <Link href="/blog" target="_blank" className="flex mt-4 items-center justify-center md:hidden gap-4 rounded min-w-fit p-2 h-12 duration-150 bg-primary text-white hover:opacity-80">Tüm Blogları Gör</Link>
        </div>
      </div>
    );
}
