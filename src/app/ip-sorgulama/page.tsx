import IpForm from '@/components/IpForm';
import { generateMetadata } from '../layout';
import { headers } from 'next/headers'

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'ip-sorgulama' } });
};

export default async function IpInquiry() {
    try {
        const headersList = await headers()
        const ip = headersList.get("x-forwarded-for") || "auto";
        const res = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await res.json();
        return (
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-1 pb-6 md:pb-12 md:gap-2">
                <IpForm firstIp={ip} firstIpData={data} />
            </div>
        );
    } catch (error) {
        console.error("IP adresi alınırken hata oluştu:", error);
    }
}