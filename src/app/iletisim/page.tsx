import Link from 'next/link';
import { generateMetadata } from '../layout';
import { TbArticle, TbClock, TbFlag, TbMail, TbSocial, TbWorld } from "react-icons/tb";
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiGlobe, FiMessageSquare, FiArrowRight, FiStar, FiShield, FiBookOpen, FiTrendingUp } from "react-icons/fi";

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'iletisim' } });
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
    const { success } = await searchParams;
    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-8 pb-6 md:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                <FiMail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">İletişim Seçenekleri</h2>
                                <p className="text-gray-600">Bizimle iletişime geçmenin farklı yolları</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <TbMail className="min-w-6 w-6 h-6 text-primary" />
                                <Link className="font-bold hover:opacity-80 duration-150 hover:text-primaryDark" href="mailto:info@sorgulat.com">info@sorgulat.com</Link>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <TbWorld className="min-w-6 w-6 h-6 text-primary" />
                                <Link className="font-bold hover:opacity-80 duration-150 hover:text-primaryDark" href="/" target='_blank'>sorgulat.com</Link>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <TbSocial className="min-w-6 w-6 h-6 text-primary" />
                                <div className="flex items-center gap-3">
                                    <Link
                                        target="_blank"
                                        title="Sorgulat - Instagram"
                                        className="flex items-center justify-center p-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg hover:shadow-lg transition-all duration-200"
                                        href="https://www.instagram.com/sorgulatcom/"
                                        rel="noopener noreferrer"
                                        aria-label="Sorgulat Instagram"
                                    >
                                        <FaInstagram className="text-white w-5 h-5" />
                                    </Link>
                                    <Link
                                        target="_blank"
                                        title="Sorgulat - Linkedin"
                                        className="flex items-center justify-center p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg hover:shadow-lg transition-all duration-200"
                                        href="https://www.linkedin.com/company/sorgulat/"
                                        rel="noopener noreferrer"
                                        aria-label="Sorgulat Linkedin"
                                    >
                                        <FaLinkedin className="text-white w-5 h-5" />
                                    </Link>
                                    <Link
                                        target="_blank"
                                        title="Sorgulat - X"
                                        className="flex items-center justify-center p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg hover:shadow-lg transition-all duration-200"
                                        href="https://x.com/sorgulatcom"
                                        rel="noopener noreferrer"
                                        aria-label="Sorgulat X"
                                    >
                                        <FaXTwitter className="text-white w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                <FiShield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Sorgulat.com Hakkında</h2>
                                <p className="text-gray-600">Platformumuzun özellikleri ve hizmetleri</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-green-200">
                                <TbClock className="min-w-6 w-6 h-6 text-green-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Saat Bilgileri</h3>
                                    <p className="text-gray-600 text-sm">Dünyadaki şehirler için güncel saati ve saat farklarını kontrol edin.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-green-200">
                                <TbFlag className="min-w-6 w-6 h-6 text-green-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Vize Rehberleri</h3>
                                    <p className="text-gray-600 text-sm">Türk pasaportu için ülkelerin vize gereksinimlerini görün.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-green-200">
                                <FiTrendingUp className="min-w-6 w-6 h-6 text-green-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">YKS Tercih Robotu</h3>
                                    <p className="text-gray-600 text-sm">Yeni eklediğimiz akıllı tercih robotu ile üniversite seçiminizi kolaylaştırın.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-green-200">
                                <TbArticle className="min-w-6 w-6 h-6 text-green-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Seyahat Rehberleri</h3>
                                    <p className="text-gray-600 text-sm">Blogumuzda seyahat ve diğer konularla ilgili yazıları keşfedin.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 min-w-12 min-h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <FiMessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">İletişim Formu</h2>
                            <p className="text-gray-600">Mesajınızı gönderin, size en kısa sürede dönelim</p>
                        </div>
                    </div>
                    
                    {success === 'true' && (
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 p-4 rounded-xl border border-green-200 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                    <FiStar className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Mesajınız başarıyla gönderildi!</h3>
                                    <p className="text-sm">Teşekkür ederiz, en kısa sürede size dönüş yapacağız.</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <form className='flex flex-col gap-4' action="https://formsubmit.co/malikozturk975@gmail.com" method="POST">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">İsim Soyisim</label>
                            <input 
                                type='text' 
                                name='name' 
                                placeholder="İsim Soyisim" 
                                className='w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200' 
                                required 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresi</label>
                            <input 
                                type='email' 
                                name='email' 
                                placeholder="Email" 
                                className='w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200' 
                                required 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</label>
                            <textarea 
                                name='message' 
                                placeholder="Mesajınızı buraya yazın..." 
                                className='w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 h-32 resize-none' 
                                required 
                            />

                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_next" value="https://sorgulat.com/iletisim?success=true" />

                            <button className="w-full mt-4 bg-gradient-to-r from-primary to-primaryDark text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                Mesajı Gönder
                                <FiArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}