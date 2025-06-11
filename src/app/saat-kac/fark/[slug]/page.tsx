import { getRequest } from "@/utils/api";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { formatDateTime, parseFromTo } from "@/utils/formatter";
import { TbCalendarHeart, TbCalendarSearch, TbClockHeart, TbClockSearch, TbFlagHeart, TbFlagSearch } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import { defaultGenerateMetadata } from "@/app/metadataConfig";
import CompareForm from "@/components/Timezone/CompareForm";
import { FiClock, FiGlobe, FiArrowRight, FiSearch } from "react-icons/fi";

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
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-8 pb-6 md:pb-12">
                {/* Hero Section */}
                <div className="text-center">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                        <span>
                            <Link href={`/saat-kac/${from.slug}`} target="_blank" className="text-primary hover:text-primaryDark transition-colors duration-200 font-bold">{from.name}</Link> ile <Link href={`/saat-kac/${to.slug}`} target="_blank" className="text-primary hover:text-primaryDark transition-colors duration-200 font-bold">{to.name}</Link> 
                        </span> arasındaki saat farkı
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Anlık saat farkı, zaman dilimi bilgileri ve detaylı karşılaştırma
                    </p>
                </div>

                {/* Ana Karşılaştırma Kartı */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primaryDark rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FiClock className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            {from.name} <span className="text-gray-500">vs</span> {to.name}
                        </h2>
                        <p className="text-gray-600">{differenceText}</p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
                        {/* İlk Şehir */}
                        <div className="flex flex-col items-center w-full lg:w-1/3">
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl border-4 border-primary bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center text-lg md:text-2xl font-bold text-white mb-4 shadow-lg">
                                {fromTime.timeFormatted}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{from.name}</h3>
                            <p className="text-gray-600 mb-1">{from.country}</p>
                            <p className="text-sm text-gray-500">{fromTime.dateFormatted} {fromTime.year}</p>
                            <p className="text-sm text-gray-400">{fromTime.dayFormatted}</p>
                        </div>

                        {/* Fark Bilgisi */}
                        <div className="flex flex-col items-center w-full lg:w-1/3">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                                <FaArrowRightLong className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-center">
                                <p className="text-lg md:text-xl font-bold text-blue-600 mb-2">
                                    {diff === 0 ? "Saat farkı yok" : diff > 0 ? `${formattedDiff} ileri` : `${formattedDiff} geri`}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {from.timezone} → {to.timezone}
                                </p>
                            </div>
                        </div>

                        {/* İkinci Şehir */}
                        <div className="flex flex-col items-center w-full lg:w-1/3">
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl border-4 border-primary bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center text-lg md:text-2xl font-bold text-white mb-4 shadow-lg">
                                {toTime.timeFormatted}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{to.name}</h3>
                            <p className="text-gray-600 mb-1">{to.country}</p>
                            <p className="text-sm text-gray-500">{toTime.dateFormatted} {toTime.year}</p>
                            <p className="text-sm text-gray-400">{toTime.dayFormatted}</p>
                        </div>
                    </div>
                </div>

                {/* Detaylı Bilgi Kartları */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                <TbCalendarHeart className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{from.name} Tarih Bilgisi</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <TbCalendarHeart className="w-5 h-5 text-primary" />
                                <span className="text-gray-700">
                                    Bugünün Tarihi: {fromTime.dateFormatted} {fromTime.year} {fromTime.dayFormatted}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <TbClockHeart className="w-5 h-5 text-primary" />
                                <span className="text-gray-700">
                                    Şu anki Saat: {fromTime.timeFormatted}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <TbCalendarSearch className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{to.name} Tarih Bilgisi</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <TbCalendarSearch className="w-5 h-5 text-primary" />
                                <span className="text-gray-700">
                                    Bugünün Tarihi: {toTime.dateFormatted} {toTime.year} {toTime.dayFormatted}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <TbClockSearch className="w-5 h-5 text-primary" />
                                <span className="text-gray-700">
                                    Şu anki Saat: {toTime.timeFormatted}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Saat Tablosu */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FiGlobe className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Günlük Saat Karşılaştırma Tablosu
                        </h2>
                        <p className="text-gray-600">
                            {from.name} ve {to.name} arasındaki günün farklı saatlerindeki karşılaştırma
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-primary to-primaryDark text-white">
                                    <th className="p-4 text-left rounded-tl-xl">
                                        <div className="flex items-center gap-3 justify-center">
                                            <TbFlagHeart className="w-5 h-5" />
                                            {from.name}
                                        </div>
                                    </th>
                                    <th className="p-4 text-left rounded-tr-xl">
                                        <div className="flex items-center gap-3 justify-center">
                                            <TbFlagSearch className="w-5 h-5" />
                                            {to.name}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {hourTable.map((hour: { from: string, to: string }, index: number) => (
                                    <tr key={hour.from} className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="p-4 border-b border-gray-200 font-medium text-gray-900">{hour.from}</td>
                                        <td className="p-4 border-b border-gray-200 font-medium text-gray-900">{hour.to}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Yeni Karşılaştırma Formu */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FiSearch className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-900 mb-2">
                            Farklı Şehir veya Ülke Ara
                        </h2>
                        <p className="text-blue-700">
                            Başka şehirler arasında da saat farkı karşılaştırması yapın
                        </p>
                    </div>
                    
                    <div className="max-w-2xl mx-auto">
                        <CompareForm />
                    </div>
                </div>

                {/* Popüler Karşılaştırmalar */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Popüler Karşılaştırmalar
                        </h2>
                        <p className="text-gray-600">
                            En çok aranan şehir karşılaştırmalarını hızlıca yapın
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { from: "İstanbul", to: "New York", fromSlug: "istanbul", toSlug: "new-york" },
                            { from: "İstanbul", to: "Paris", fromSlug: "istanbul", toSlug: "paris" },
                            { from: "İstanbul", to: "Tokyo", fromSlug: "istanbul", toSlug: "tokyo" },
                            { from: "İstanbul", to: "Londra", fromSlug: "istanbul", toSlug: "londra" },
                            { from: "İstanbul", to: "Dubai", fromSlug: "istanbul", toSlug: "dubai" },
                            { from: "Ankara", to: "Munih", fromSlug: "ankara", toSlug: "munih" }
                        ].map((comparison, index) => (
                            <a
                                key={index}
                                href={`/saat-kac/fark/from-${comparison.fromSlug}-to-${comparison.toSlug}`}
                                className="group block p-4 border border-gray-200 rounded-xl hover:border-primary hover:shadow-lg transition-all duration-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                                            {comparison.from} - {comparison.to}
                                        </p>
                                        <p className="text-sm text-gray-500">Saat farkını gör</p>
                                    </div>
                                    <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <script type="application/ld+json" suppressHydrationWarning>
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                        {
                            "@type": "Question",
                            "name": `${from.name} ile ${to.name} arasındaki saat farkı nedir?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${from.name} ile ${to.name} arasındaki saat farkı ${formattedDiff} olarak hesaplanmıştır. Bu fark şu anda ${diff === 0 ? "eşit" : diff > 0 ? `${from.name} ${formattedDiff} geri` : `${from.name} ${formattedDiff} ileri`} durumdadır.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${from.name} şehrinde şu an saat kaç?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${from.name} şehrinde şu an saat: ${fromTime.timeFormatted} (${fromTime.dateFormatted} ${fromTime.year}, ${fromTime.dayFormatted}).`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${to.name} şehrinde şu an saat kaç?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${to.name} şehrinde şu an saat: ${toTime.timeFormatted} (${toTime.dateFormatted} ${toTime.year}, ${toTime.dayFormatted}).`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${from.name} ile ${to.name} saat farkı nasıl hesaplanır?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Saat farkı, her iki şehrin zaman dilimlerine göre hesaplanır. ${from.name} saati ${fromTime.timeFormatted}, ${to.name} saati ise ${toTime.timeFormatted} olduğuna göre aralarındaki fark ${formattedDiff} olarak belirlenmiştir.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${from.name} - ${to.name} saat farkı tablosu nasıl okunur?`,
                            "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Saat farkı tablosunda ${from.name} saatine karşılık gelen ${to.name} saatlerini görebilirsiniz. Bu tablo, günün farklı saatlerindeki karşılaştırmaları net olarak sunar.`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `${from.name} ile ${to.name} aynı zaman diliminde mi?`,
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": `${from.timezone === to.timezone ? 'Evet' : 'Hayır'}, ${from.name} (${from.timezone}) ve ${to.name} (${to.timezone}) ${from.timezone === to.timezone ? 'aynı' : 'farklı'} zaman dilimlerinde yer almaktadır.`
                            }
                        },
                        ]
                    })}
                </script>
            </div>
        );
    } catch (e) {
        return <NotFound />;
    }
}