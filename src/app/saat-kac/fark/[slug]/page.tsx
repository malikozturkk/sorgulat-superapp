import { getRequest } from "@/utils/api";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { formatDateTime, getLocationSuffix, parseFromTo } from "@/utils/formatter";
import { TbCalendarHeart, TbCalendarSearch, TbClockHeart, TbClockSearch, TbFlagHeart, TbFlagSearch } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import { defaultGenerateMetadata } from "@/app/metadataConfig";

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params;
    try {
        if (!slug) {
            return defaultGenerateMetadata();
        }

        const parsed = parseFromTo(slug);
        const getCompareData = await getRequest(`/compare?from=${parsed?.from}&to=${parsed?.to}`);
        const { from, to } = getCompareData;

        return {
            title: `${from.name} ile ${to.name} arasındaki saat farkı | Sorgulat`,
            description: `${from.name} ile ${to.name} arasındaki anlık saat farkını öğrenin. Şu anki saat bilgisi, zaman dilimi farkı ve karşılaştırmalı saat tablosunu inceleyin.`,
            robots: "index, follow",
            keywords: `${from.name} saati, ${to.name} saati, ${from.name} ${to.name} saat farkı, saat farkı hesapla, zaman farkı, anlık saat farkı`,
            authors: [
                {
                    name: `${from.name} - ${to.name} Saat Farkı`,
                    url: `https://www.sorgulat.com/saat-kac/fark/${slug}`,
                },
            ],
            icons: '/favicon.ico',
            openGraph: {
                title: `${from.name} ile ${to.name} arasındaki saat farkı | Sorgulat`,
                description: `${from.name} ile ${to.name} arasındaki anlık saat farkını öğrenin. Şu anki saat bilgisi, zaman dilimi farkı ve karşılaştırmalı saat tablosunu inceleyin.`,
                url: `https://www.sorgulat.com/saat-kac/fark/${slug}`,
                images: '/images/openGraph/time-compare.png',
                type: 'website',
                siteName: 'Sorgulat',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${from.name} ile ${to.name} arasındaki saat farkı | Sorgulat`,
                description: `${from.name} ile ${to.name} arasındaki anlık saat farkını öğrenin. Şu anki saat bilgisi, zaman dilimi farkı ve karşılaştırmalı saat tablosunu inceleyin.`,
                images: '/images/openGraph/time-compare.png',
                site: '@Sorgulat',
            },
        };
    } catch (e) {
        console.error(slug, e, '-> error');
        return defaultGenerateMetadata();
    }
}


export default async function CompareTimeDetail({ params }: { params: Params }) {
    const { slug } = await params;
    const parsed = parseFromTo(slug);

    try {
        const getCompareData = await getRequest(`/compare?from=${parsed?.from}&to=${parsed?.to}`);
        const { from, to, differenceText, hourTable, diff, formattedDiff } = getCompareData;
        const fromTime = formatDateTime(from.dateTime, "tr-TR", from.timezone);
        const toTime = formatDateTime(to.dateTime, "tr-TR", to.timezone);

        return (
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-1 pb-6 md:pb-12 md:gap-2">
                <h1 className="text-4xl font-medium">
                    <span>
                        <Link href={`/saat-kac/${from.slug}`} target="_blank" className="border-b-2 border-gray-300 font-bold duration-150 hover:border-primary">{from.name}</Link> ile <Link href={`/saat-kac/${to.slug}`} target="_blank" className="border-b-2 border-gray-300 font-bold duration-150 hover:border-primary">{to.name}</Link> 
                    </span> arasındaki saat farkı
                </h1>

                <div className="bg-white rounded-2xl shadow p-3 md:p-6 w-full text-center mt-4">
                    <h2 className="text-3xl font-bold mb-6">{from.name} <span className="text-gray-500">vs</span> {to.name}</h2>
                    <div className="flex items-center justify-center gap-4 md:gap-12 mb-6">
                        <div className="flex flex-col items-center w-1/3">
                            <div className="w-12 h-12 md:w-24 md:h-24 rounded-full border-4 border-blue-500 flex items-center justify-center text-sm md:text-xl font-bold">
                                {fromTime.timeFormatted}
                            </div>
                            <div className="mt-2 font-semibold text-sm md:text-xl">{from.name}</div>
                            <div className="text-xs md:text-base text-gray-500">{from.country}</div>
                            <div className="text-xs md:text-base text-gray-400">{fromTime.dateFormatted} {fromTime.year}</div>
                        </div>

                        <div className="flex flex-col items-center text-blue-600 font-semibold text-sm md:text-lg w-1/3">
                            <FaArrowRightLong className="w-8 h-8 md:w-16 md:h-16" />
                            {diff === 0 ? "Saat farkı yok" : diff > 0 ? `${formattedDiff} ileri` : `${formattedDiff} geri`}
                        </div>

                        <div className="flex flex-col items-center w-1/3">
                            <div className="w-12 h-12 md:w-24 md:h-24 rounded-full border-4 border-blue-500 flex items-center justify-center text-sm md:text-xl font-bold">
                                {toTime.timeFormatted}
                            </div>
                            <div className="mt-2 font-semibold text-sm md:text-xl">{to.name}</div>
                            <div className="text-xs md:text-base text-gray-500">{to.country}</div>
                            <div className="text-xs md:text-base text-gray-400">{toTime.dateFormatted} {toTime.year}</div>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm md:text-lg">{differenceText}</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
                    <div className="bg-white rounded-lg border border-gray-100 flex flex-col gap-4 p-4 w-full">
                        <div className="flex gap-4 items-center">
                            <TbCalendarHeart className="w-6 h-6 text-primary" />
                            <span>{from.name}{getLocationSuffix(from.name)} Bugünün Tarihi: {fromTime.dateFormatted} {fromTime.year} {fromTime.dayFormatted}</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <TbClockHeart className="w-6 h-6 text-primary" /> 
                            <span>{from.name}{getLocationSuffix(from.name)} Saat Şu an: {fromTime.timeFormatted}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-100 flex flex-col gap-4 p-4 w-full">
                        <div className="flex gap-4 items-center">
                            <TbCalendarSearch className="w-6 h-6 text-primary" />
                            <span>{to.name}{getLocationSuffix(to.name)} Bugünün Tarihi: {toTime.dateFormatted} {toTime.year} {toTime.dayFormatted}</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <TbClockSearch className="w-6 h-6 text-primary" /> 
                            <span>{to.name}{getLocationSuffix(to.name)} Saat Şu an: {toTime.timeFormatted}</span>
                        </div>
                    </div>
                </div>

                <table className="mt-4">
                    <thead>
                        <tr className="font-bold text-2xl text-center">
                            <td className="p-2 w-1/2 bg-blue-200">
                                <div className="flex items-center justify-center gap-4">
                                    <TbFlagHeart /> {from.name}
                                </div>
                            </td>
                            <td className="p-2 w-1/2 bg-blue-200">
                                <div className="flex items-center justify-center gap-4">
                                    <TbFlagSearch /> {to.name}
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {hourTable.map((hour: { from: string, to: string }) => (
                            <tr key={hour.from} className="text-center">
                                <td className="border border-primaryLight p-2">{hour.from}</td>
                                <td className="border border-primaryLight p-2">{hour.to}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>diğer şehirlerle karşılaştır inputlarını koy</div>
            </div>
        );
    } catch (e) {
        return <NotFound />;
    }
}