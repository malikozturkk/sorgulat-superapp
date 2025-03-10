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
                <Link className='text-primary font-bold hover:opacity-80 duration-150' href="https://sorgulat.com">
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
                        Web Sitesi: <Link className='text-primary font-bold hover:opacity-80 duration-150' href="https://sorgulat.com">sorgulat.com</Link>
                    </li>
                    <li>
                        Sosyal Medya: <span className='text-gray-600'>Yakında!</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}