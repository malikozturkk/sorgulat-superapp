import Link from 'next/link';
import { generateMetadata } from '../layout';
import Image from 'next/image';

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'hakkinda' } });
};

export default async function Contact() {
    return (
        <>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col">
            <div className='flex items-center justify-around w-full flex-col md:flex-row gap-4 pb-8'>
                <Image src="/icons/about.svg" width={450} height={450} alt='Sorgulat About Image' />
                <h1 className='text-3xl md:text-5xl font-bold'>Sorgulat Hakkında</h1>
            </div>
        </div>
        <div className='bg-white w-full'>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-6 md:pb-12 pt-8 text-lg'>
                <p><strong>Sorgulat.com</strong>, dünya genelindeki şehirlerin anlık saat bilgilerini, gün doğumu ve gün batımı zamanlarını, güneş konumlarını ve şehirler arası saat farklarını kullanıcı dostu bir arayüzle sunan modern bir bilgi platformudur.</p>
                <p className='mt-8'>Ziyaretçilerimiz, sadece saat farklarını öğrenmekle kalmaz; aynı zamanda her şehrin bağlı olduğu ülkeyi ve o ülkedeki diğer şehirleri de kolayca keşfedebilir. Gelişmiş zaman hesaplama özelliklerimizle, dünyanın herhangi bir yerindeki saat durumunu birkaç tıklamayla görebilirsiniz.</p>
                <p className='mt-8'>Ayrıca, Pasaport sayfamızda, Türk pasaportuyla hangi ülkelere vizesiz, vizeli, e-vize ile ya da kapıda vize alarak seyahat edilebileceğini harita üzerinden inceleyebilir; seyahat planlarınızı buna göre şekillendirebilirsiniz.</p>
                <p className='mt-8'>Blog bölümümüzde ise vizeli-vizesiz ülkeler, kapıda vize veren ülkeler, e-vize uygulamaları ve seyahat ipuçları gibi konuların yanı sıra; gezilecek yer önerileri ve güncel seyahat rehberleri yer almaktadır. </p>
                <p className='mt-8'><strong>Sorgulat.com</strong>, bireysel kullanım amacıyla geliştirilmiş, güvenli bir deneyim sunmaya özen gösteren bağımsız bir platformdur. Kullanıcılarımızdan kişisel bilgi toplamıyor; yalnızca hizmet kalitesini artırmak için teknik ve istatistiksel veriler kaydediyoruz.</p>
                <p className='mt-8'>Görüş, öneri ya da sorularınız için bizimle her zaman <Link href="/iletisim" target='_blank' className='text-primary font-bold hover:opacity-80 duration-150'>iletişim</Link> sayfamızdan veya <Link href="mailto:info@sorgulat.com" className='text-primary font-bold hover:opacity-80 duration-150'>info@sorgulat.com</Link> adresi üzerinden iletişime geçebilirsiniz.</p>
            </div>
        </div>
        </>
    );
}