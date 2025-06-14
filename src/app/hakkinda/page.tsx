import Link from 'next/link';
import { generateMetadata } from '../layout';
import Image from 'next/image';
import { FiGlobe, FiClock, FiShield, FiBookOpen, FiMail, FiArrowRight, FiStar, FiTrendingUp } from "react-icons/fi";

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'hakkinda' } });
};

export default async function Contact() {
    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-8 pb-6 md:pb-12">
            {/* About Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                            <FiGlobe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Sorgulat.com</h2>
                            <p className="text-gray-600">Modern bilgi platformu</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Image src="/icons/about.svg" width={450} height={450} alt='Sorgulat About Image' className="rounded-xl" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                <FiClock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Saat Bilgileri</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Dünya genelindeki şehirlerin anlık saat bilgilerini, gün doğumu ve gün batımı zamanlarını, güneş konumlarını ve şehirler arası saat farklarını kullanıcı dostu bir arayüzle sunuyoruz.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                <FiShield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vize Rehberleri</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Pasaport sayfamızda, Türk pasaportuyla hangi ülkelere vizesiz, vizeli, e-vize ile ya da kapıda vize alarak seyahat edilebileceğini harita üzerinden inceleyebilirsiniz.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                <FiTrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">YKS Tercih Robotu</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Yeni eklediğimiz YKS Tercih Robotu ile üniversite seçiminizi kolaylaştırın. Puanınıza, sıralamanıza ve tercihlerinize göre en uygun üniversite ve bölümleri akıllı filtreleme sistemi ile keşfedin.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                <FiBookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Seyahat Rehberleri</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Blog bölümümüzde vizeli-vizesiz ülkeler, kapıda vize veren ülkeler, e-vize uygulamaları ve seyahat ipuçları gibi konuların yanı sıra gezilecek yer önerileri ve güncel seyahat rehberleri yer almaktadır.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                        <FiGlobe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Erişim</h3>
                    <p className="text-gray-600 text-sm">Dünyanın her yerinden erişilebilir platform</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                        <FiShield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Güvenli Platform</h3>
                    <p className="text-gray-600 text-sm">Kişisel bilgi toplamayan güvenli deneyim</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                        <FiTrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Akıllı Özellikler</h3>
                    <p className="text-gray-600 text-sm">YKS Tercih Robotu ve akıllı filtreleme</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                        <FiStar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Kullanıcı Dostu</h3>
                    <p className="text-gray-600 text-sm">Kolay kullanılabilir modern arayüz</p>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                        <FiMail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">İletişim</h2>
                        <p className="text-gray-600">Görüş, öneri ya da sorularınız için bizimle iletişime geçin</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">İletişim Bilgileri</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <FiMail className="w-5 h-5 text-gray-500" />
                                <Link href="mailto:info@sorgulat.com" className="text-primary font-medium hover:text-primaryDark transition-colors">
                                    info@sorgulat.com
                                </Link>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiGlobe className="w-5 h-5 text-gray-500" />
                                <Link href="/" className="text-primary font-medium hover:text-primaryDark transition-colors">
                                    sorgulat.com
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Hızlı Erişim</h3>
                        <div className="space-y-3">
                            <Link 
                                href="/iletisim" 
                                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primaryDark transition-colors"
                            >
                                İletişim Sayfası
                                <FiArrowRight className="w-4 h-4" />
                            </Link>
                            <div className="text-gray-600 text-sm">
                                Görüş, öneri ya da sorularınız için bizimle her zaman iletişim sayfamızdan veya e-posta adresi üzerinden iletişime geçebilirsiniz.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}