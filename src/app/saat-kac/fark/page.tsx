import { generateMetadata } from "@/app/layout";
import NotFound from "@/app/not-found";
import CompareForm from "@/components/Timezone/CompareForm";
import { FiClock, FiGlobe, FiMapPin, FiSearch, FiArrowRight, FiInfo } from "react-icons/fi";

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'fark' } })
}

export default async function CompareTime() {
    try {
        return (
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-8 pb-6 md:pb-12">
                <div className="text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Saat Farkını Bul
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        İki şehir arasındaki anlık saat farkını öğrenin, zaman dilimi karşılaştırması yapın
                    </p>
                </div>

                <div className="max-w-4xl mx-auto w-full">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primaryDark rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FiSearch className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Şehir Seçin ve Karşılaştırın
                            </h2>
                            <p className="text-gray-600">
                                Karşılaştırmak istediğiniz iki şehri seçin ve anlık saat farkını öğrenin
                            </p>
                        </div>
                        
                        <CompareForm />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                            <FiClock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Anlık Saat Farkı</h3>
                        <p className="text-gray-600 text-sm">
                            İki şehir arasındaki güncel saat farkını anında öğrenin
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                            <FiGlobe className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Zaman Dilimi</h3>
                        <p className="text-gray-600 text-sm">
                            Her iki şehrin zaman dilimi bilgilerini görüntüleyin
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                            <FiMapPin className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Detaylı Bilgi</h3>
                        <p className="text-gray-600 text-sm">
                            Şehir bilgileri, ülke ve tarih detaylarını inceleyin
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                            <FiArrowRight className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Saat Tablosu</h3>
                        <p className="text-gray-600 text-sm">
                            Günün farklı saatlerindeki karşılaştırmalı tabloyu görün
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <FiInfo className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-blue-900 mb-3">
                                Saat Farkı Hesaplama Hakkında
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        Anlık saat farkını öğrenin
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        Şu anki saat bilgisine ulaşın
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        Zaman dilimi farkını görüntüleyin
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        Karşılaştırmalı saat tablosunu inceleyin
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
            </div>
        );
    }
    catch (e) {
        return (
            <NotFound />
        )
    }
}
