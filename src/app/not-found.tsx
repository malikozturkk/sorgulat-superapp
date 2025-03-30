import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    const lightButton = "border border-primary text-primary px-6 py-2 rounded-lg duration-150 hover:bg-primaryLight"
    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-6 md:pb-12 flex flex-col items-center justify-center">
            <div className="flex gap-4 justify-between flex-col md:flex-row">
                <div className="mt-10 max-w-xl w-full md:w-1/2">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Aradığınız sayfa bulunamadı!</h1>
                    <p className="mt-4 text-gray-600 text-sm md:text-lg">
                        Üzgünüz, aradığınız sayfa mevcut değil. Ama dünya ülkelerinin saatlerini, vize bilgilerini ve
                        seyahat rehberlerini keşfetmeye devam edebilirsiniz.
                    </p>
                </div>
                <Image src="/images/worldMap.png" width={250} height={250} alt="World Map Icon" className="w-full md:w-1/2" />
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/" className="bg-primary text-white px-6 py-2 rounded-lg shadow-md duration-150 hover:bg-primaryDark">Anasayfaya dön</Link>
                <Link href="/saat-kac" className={lightButton}>Saat Kaç?</Link>
                <Link href="/pasaport" className={lightButton}>Vize Haritası</Link>
                <Link href="/blog" className={lightButton}>Seyahat Rehberleri</Link>
            </div>
            {/* <Image src="/icons/404.svg" alt="404 Icon" className="mt-10 relative w-80 h-80" width={320} height={320} /> */}
        </div>
    )
}