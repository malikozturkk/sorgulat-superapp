import { generateMetadata } from "@/app/layout";
import NotFound from "@/app/not-found";
import CompareForm from "@/components/Timezone/CompareForm";
import { FaRegClock } from "react-icons/fa";

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'fark' } })
}

export default async function CompareTime() {
    try {
        return (
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col pb-6 md:pb-12 gap-8">
                <h1 className="text-3xl font-bold text-center">Saat Farkını Bul</h1>
                <CompareForm />
                <div className="border border-gray-200 bg-white p-4 rounded-md flex gap-6 text-sm text-gray-700 flex-col md:flex-row items-center md:items-start">
                    <div className="bg-primaryLight rounded-full p-4">
                        <FaRegClock className="text-primary w-8 h-8" />
                    </div>
                    <div className="flex flex-col gap-3 items-center md:items-start">
                        <h2 className="text-lg font-semibold">Seçtiğiniz iki şehir arasındaki</h2>
                        <ul className="list-inside list-disc text-sm md:text-base">
                            <li>Anlık saat farkını öğrenin.</li>
                            <li>Şu anki saat bilgisine ulaşın.</li>
                            <li>Zaman dilimi farkını görüntüleyin.</li>
                            <li>Karşılaştırmalı saat tablosunu inceleyin.</li>
                        </ul>
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
