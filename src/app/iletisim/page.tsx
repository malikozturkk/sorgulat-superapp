import Link from 'next/link';
import { generateMetadata } from '../layout';
import { TbArticle, TbClock, TbFlag, TbMail, TbSocial, TbWorld } from "react-icons/tb";
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'iletisim' } });
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
    const { success } = await searchParams;
    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-1 pb-6 md:pb-12 md:gap-2">
            <h1 className='text-2xl md:text-4xl font-extrabold mb-2 md:mb-3'>Bize Ulaşın</h1>
            <p className="text-sm md:text-lg leading-relaxed mb-2 md:mb-3">
                <Link className="text-primary font-bold hover:opacity-80 duration-150" href="/">Sorgulat.com</Link> hakkında düşüncelerinizi bizimle paylaşın! Platformumuzla ilgili önerileriniz, şikayetleriniz veya sorularınız varsa bizimle iletişime geçmekten çekinmeyin.
            </p>
            <div className='flex items-start gap-6 w-full flex-col md:flex-row'>
                <div className='w-full md:w-1/2 flex flex-col gap-6'>
                    <div className='border border-gray-100 bg-white p-4 rounded-lg w-full shadow-md'>
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-lg font-semibold'>İletişim Seçenekleri</h2>
                            <div className='flex items-center gap-4'>
                                <TbMail className='min-w-6 w-6 h-6 text-primary' />
                                <Link className="font-bold hover:opacity-80 duration-150 hover:text-primaryDark" href="mailto:info@sorgulat.com">info@sorgulat.com</Link>
                            </div>
                            <div className='flex items-center gap-4'>
                                <TbWorld className='min-w-6 w-6 h-6 text-primary' />
                                <Link className="font-bold hover:opacity-80 duration-150 hover:text-primaryDark" href="/" target='_blank'>sorgulat.com</Link>
                            </div>
                            <div className="flex items-center gap-4">
                                <TbSocial className='min-w-6 w-6 h-6 text-primary' />
                                <Link
                                    target="_blank"
                                    title="Sorgulat - Instagram"
                                    className="flex items-center justify-center"
                                    href="https://www.instagram.com/sorgulatcom/"
                                    rel="noopener noreferrer"
                                    aria-label="Sorgulat Instagram"
                                    >
                                    <FaInstagram className="text-pink-500 w-5 h-5" />
                                </Link>
                                <Link
                                    target="_blank"
                                    title="Sorgulat - Linkedin"
                                    className="flex items-center justify-center"
                                    href="https://www.linkedin.com/company/sorgulat/"
                                    rel="noopener noreferrer"
                                    aria-label="Sorgulat Linkedin"
                                    >
                                    <FaLinkedin className="text-blue-600 w-5 h-5" />
                                </Link>
                                <Link
                                    target="_blank"
                                    title="Sorgulat - X"
                                    className="flex items-center justify-center"
                                    href="https://x.com/sorgulatcom"
                                    rel="noopener noreferrer"
                                    aria-label="Sorgulat X"
                                    >
                                    <FaXTwitter className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='border border-gray-100 bg-white p-4 rounded-lg w-full shadow-md'>
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-lg font-semibold'>Sorgulat.com Hakkında</h2>
                            <div className='flex gap-4'>
                                <TbClock className='min-w-6 w-6 h-6 text-primary' />
                                <p>Dünyadaki şehirler için güncel saati ve saat farklarını kontrol edin.</p>
                            </div>
                            <div className='flex gap-4'>
                                <TbFlag className='min-w-6 w-6 h-6 text-primary' />
                                <p>Türk pasaportu için ülkelerin vize gereksinimlerini görün.</p>
                            </div>
                            <div className='flex gap-4'>
                                <TbArticle className='min-w-6 w-6 h-6 text-primary' />
                                <p>Blogumuzda seyahat ve diğer konularla ilgili yazıları keşfedin.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border border-gray-100 bg-white p-4 rounded-lg w-full md:w-1/2 shadow-md'>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-lg font-semibold'>İletişim Formu</h2>
                        {success === 'true' && (
                            <div className="bg-green-100 text-green-700 p-3 rounded-lg border border-green-200 text-sm">
                                Mesajınız başarıyla gönderildi. Teşekkür ederiz!
                            </div>
                        )}
                        <form className='flex flex-col gap-4' action="https://formsubmit.co/malikozturk975@gmail.com" method="POST">
                            <input type='text' name='name' placeholder="İsim Soyisim" className='p-3 border border-gray-200 rounded-lg' required />
                            <input type='email' name='email' placeholder="Email" className='p-3 border border-gray-200 rounded-lg' required />
                            <textarea name='message' placeholder="Mesaj" className='p-3 border border-gray-200 rounded-lg h-28' required />

                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_next" value="https://sorgulat.com/iletisim?success=true" />

                            <button className="bg-primary text-white px-4 py-2 rounded h-12 w-full">
                                Gönder
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}