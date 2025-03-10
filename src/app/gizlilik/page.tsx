import Link from 'next/link';
import { generateMetadata } from '../layout'

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'gizlilik' } })
}

export default async function Terms() {
        return (
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4 pb-4 md:pb-8 md:gap-8">
                <div className='flex flex-col gap-1 md:gap-2'>
                    <h1 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">Kullanım Şartları</h1>
                    <p className="text-sm md:text-xl"><Link className='text-primary font-bold hover:opacity-80 duration-150' href="https://sorgulat.com">Sorgulat.com</Link>, kullanıcılara dünya saatleri ve diğer çeşitli hizmetler sunan bir superapp'tir.</p>
                    <ul className="list-inside list-disc text-sm md:text-xl">
                        <li><Link className='text-primary font-bold hover:opacity-80 duration-150' href="https://sorgulat.com">Sorgulat.com</Link> yalnızca bireysel kullanım için tasarlanmıştır. Otomatik yenileme, metin veya uygulamalar içinden doğrudan erişim yasaktır.</li>
                        <li>Eğer uygulamanız için zaman senkronizasyonuna veya diğer verilerimize erişime ihtiyacınız varsa, lütfen bizimle <Link className='text-primary font-bold hover:opacity-80 duration-150' href="https://sorgulat.com/iletisim" target='_blank'>iletişime</Link> geçerek API kullanımı hakkında bilgi alın.</li>
                        <li>Siteyi kullanarak, bu kullanım Şartlarını kabul etmiş sayılırsınız.</li>
                    </ul>
                </div>

                <div className='flex flex-col gap-1 md:gap-2'>
                    <h1 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">Gizlilik Politikası</h1>
                    <p className="text-sm md:text-xl"><Link className='text-primary font-bold hover:opacity-80 duration-150' href="https://sorgulat.com">Sorgulat.com</Link>, kullanıcıların kişisel bilgilerini toplamamaktadır. Ancak, istatistiksel analiz yapmak ve hizmet kalitesini arttırmak amacıyla teknik bilgiler kaydedilmektedir. Bu bilgiler şunları içerebilir:</p>
                    <ul className="list-inside list-disc text-sm md:text-xl">
                        <li>Tarayıcı türü ve versiyonu</li>
                        <li>Bağlantı saati ve tarihi</li>
                        <li><Link className='text-primary font-bold hover:opacity-80 duration-150' href="https://sorgulat.com">Sorgulat.com</Link> içerisinde ziyaret edilen sayfalar</li>
                    </ul>
                </div>

                <div className='flex flex-col gap-1 md:gap-2'>
                    <h1 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">Reklam Politikası</h1>
                    <p className="text-sm md:text-xl"><Link className='text-primary font-bold hover:opacity-80 duration-150' href="https://sorgulat.com">Sorgulat.com</Link>, reklam gösterimi amacıyla üçüncü taraf reklam şirketleriyle çalışmaktadır. Bu şirketler, ilginizi çekebilecek reklamlar gösterebilmek için çerezler (cookie) ve benzeri teknolojiler kullanabilir. Bu süreçte kişisel tanıtıcı bilgileriniz kaydedilmez, ancak aşağıdaki bilgiler toplanabilir:</p>
                    <ul className="list-inside list-disc text-sm md:text-xl">
                        <li>Ziyaret ettiğiniz sayfalar</li>
                        <li>Reklamlarla olan etkileşimleriniz</li>
                        <li>Kullanılan tarayıcı ve cihaz bilgileri</li>
                    </ul>
                    <p className="text-sm md:text-xl">Davranışsal reklamcılık uygulamaları hakkında daha fazla bilgi almak veya bu tür reklamları devre dışı bırakmak için <Link className='text-primary font-bold hover:opacity-80 duration-150' href="https://thenai.org/" target='_blank'>Network Advertising Initiative</Link> web sitesini ziyaret edebilirsiniz.</p>
                    <p className="text-sm md:text-xl">Gizlilik politikamızla ilgili sorularınız için bizimle <Link className='text-primary font-bold hover:opacity-80 duration-150' href="mailto:info@sorgulat.com">info@sorgulat.com</Link> adresinden iletişime geçebilirsiniz.</p>
                </div>
            </div>
        );
}