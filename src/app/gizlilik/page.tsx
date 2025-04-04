import Link from 'next/link';
import { generateMetadata } from '../layout'
import { RiFileTextFill, RiLock2Fill, RiMegaphoneFill } from "react-icons/ri";

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'gizlilik' } })
}

export default async function Terms() {
    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-1 pb-6 md:pb-12 md:gap-2">
            <h1 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">Gizlilik Koşulları</h1>
            <div className='flex flex-col gap-4'>
                <div className='p-4 md:p-8 border border-gray-100 bg-white rounded-lg w-full shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-gray-100 p-2 rounded-md'>
                            <RiFileTextFill />
                        </div>
                        <h2 className='text-lg md:text-xl font-semibold'>Kullanım Şartarı</h2>
                    </div>
                    <p className="text-base mt-2"><Link className='text-primary font-bold hover:opacity-80 duration-150' href="/" target='_blank'>Sorgulat.com</Link>, dünya saatlerini anlık olarak görüntüleyebileceğiniz, şehirler arası saat farklarını kolayca karşılaştırabileceğiniz, Türkiye pasaportuyla hangi ülkelere vizesiz veya e-vize ile seyahat edilebileceğini interaktif harita üzerinden inceleyebileceğiniz ve seyahat odaklı blog yazılarına ulaşabileceğiniz kapsamlı bir bilgi platformudur.</p>
                    <ul className="list-inside list-disc text-base mt-4">
                        <li><Link className='text-primary font-bold hover:opacity-80 duration-150' href="/" target='_blank'>Sorgulat.com</Link> yalnızca bireysel kullanım için tasarlanmıştır. Otomatik yenileme, metin veya uygulamalar içinden doğrudan erişim yasaktır.</li>
                        <li>Eğer uygulamanız için zaman senkronizasyonuna veya diğer verilerimize erişime ihtiyacınız varsa, lütfen bizimle <Link className='text-primary font-bold hover:opacity-80 duration-150' href="/iletisim" target='_blank'>iletişime</Link> geçerek API kullanımı hakkında bilgi alın.</li>
                        <li>Siteyi kullanarak, bu kullanım Şartlarını kabul etmiş sayılırsınız.</li>
                    </ul>
                </div>

                <div className='p-4 md:p-8 border border-gray-100 bg-white rounded-lg w-full shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-gray-100 p-2 rounded-md'>
                            <RiLock2Fill />
                        </div>
                        <h2 className='text-lg md:text-xl font-semibold'>Gizlilik Politikası</h2>
                    </div>
                    <p className="text-base mt-2"><Link className='text-primary font-bold hover:opacity-80 duration-150' href="/" target='_blank'>Sorgulat.com</Link>, kullanıcıların kişisel bilgilerini toplamamaktadır. Ancak, istatistiksel analiz yapmak ve hizmet kalitesini arttırmak amacıyla teknik bilgiler kaydedilmektedir. Bu bilgiler şunları içerebilir:</p>
                    <ul className="list-inside list-disc text-base mt-4">
                        <li>Tarayıcı türü ve versiyonu</li>
                        <li>Bağlantı saati ve tarihi</li>
                        <li><Link className='text-primary font-bold hover:opacity-80 duration-150' href="/" target='_blank'>Sorgulat.com</Link> içerisinde ziyaret edilen sayfalar</li>
                    </ul>
                </div>

                <div className='p-4 md:p-8 border border-gray-100 bg-white rounded-lg w-full shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-gray-100 p-2 rounded-md'>
                            <RiMegaphoneFill />
                        </div>
                        <h2 className='text-lg md:text-xl font-semibold'>Reklam Politikası</h2>
                    </div>
                    <p className="text-base mt-2"><Link className='text-primary font-bold hover:opacity-80 duration-150' href="/" target='_blank'>Sorgulat.com</Link>, reklam gösterimi amacıyla üçüncü taraf reklam şirketleriyle çalışmaktadır. Bu şirketler, ilginizi çekebilecek reklamlar gösterebilmek için çerezler (cookie) ve benzeri teknolojiler kullanabilir. Bu süreçte kişisel tanıtıcı bilgileriniz kaydedilmez, ancak aşağıdaki bilgiler toplanabilir:</p>
                    <ul className="list-inside list-disc text-base mt-4">
                        <li>Ziyaret ettiğiniz sayfalar</li>
                        <li>Reklamlarla olan etkileşimleriniz</li>
                        <li>Kullanılan tarayıcı ve cihaz bilgileri</li>
                    </ul>
                    <p className="text-base mt-2">
                        Davranışsal reklamcılık uygulamaları hakkında daha fazla bilgi almak veya bu tür reklamları devre dışı bırakmak için <Link className='text-primary font-bold hover:opacity-80 duration-150' href="https://thenai.org/" target='_blank'>Network Advertising Initiative</Link> web sitesini ziyaret edebilirsiniz.
                    </p>
                    <p className="text-base mt-2">Gizlilik politikamızla ilgili sorularınız için bizimle <Link className='text-primary font-bold hover:opacity-80 duration-150' href="mailto:info@sorgulat.com">info@sorgulat.com</Link> adresinden veya <Link className='text-primary font-bold hover:opacity-80 duration-150' href="/iletisim" target='_blank'>İletişim</Link> sayfamızdan iletişime geçebilirsiniz.</p>
                </div>
            </div>
        </div>
    );
}