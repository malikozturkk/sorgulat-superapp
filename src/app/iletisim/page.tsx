import Link from 'next/link';
import { generateMetadata } from '../layout';

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'iletisim' } });
};

export default async function Contact() {
    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-1 pb-6 md:pb-12 md:gap-2">
            <h1 className='text-2xl md:text-4xl font-extrabold mb-4 md:mb-6'>
                <Link className='text-primary font-bold hover:opacity-80 duration-150' href="mailto:info@sorgulat.com">
                    Sorgulat.com
                </Link>{' '}ile iletişime geçin
            </h1>
            <p className="text-sm md:text-lg leading-relaxed">
                <Link className='text-primary font-bold hover:opacity-80 duration-150' href="/">
                    Sorgulat.com
                </Link>{' '}hakkında düşüncelerinizi bizimle paylaşın! Platformumuzla ilgili önerileriniz, şikayetleriniz veya sorularınız varsa bizimle iletişime geçmekten çekinmeyin.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg md:p-6">
                <h2 className="text-lg md:text-2xl font-bold mb-2">İletişim Seçenekleri</h2>
                <ul className="text-sm md:text-lg list-disc pl-5 space-y-2">
                    <li>
                        E-posta: <Link className='text-primary font-bold hover:opacity-80 duration-150' href="mailto:info@sorgulat.com">info@sorgulat.com</Link>
                    </li>
                    <li>
                        Web Sitesi: <Link className='text-primary font-bold hover:opacity-80 duration-150' href="/">sorgulat.com</Link>
                    </li>
                    <li className='list-none flex items-center gap-2'>
                        <h3>Sosyal Medya:</h3>
                        <a
                        target="_blank"
                        title="Sorgulat - Instagram"
                        className="flex items-center justify-center text-white transition-all duration-200 bg-[#1f2937] rounded-full w-7 h-7 hover:bg-red focus:bg-red"
                        href="https://www.instagram.com/sorgulatcom/"
                        rel="noopener noreferrer"
                        >
                        <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                            <circle cx="16.806" cy="7.207" r="1.078"></circle>
                            <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                        </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}