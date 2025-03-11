"use client";
import Image from "next/image";
import { useState } from "react";

const IpForm = ({firstIp, firstIpData}: any) => {
    const [ip, setIp] = useState<string>(firstIp);
    const [ipData, setIpData] = useState<any>(firstIpData);
    const fetchIpDetails = async () => {
        try {
            const res = await fetch(`https://ipapi.co/${ip}/json/`);
            const data = await res.json();
            setIpData(data);
        } catch (error) {
            console.error("IP bilgileri alınırken hata oluştu:", error);
        }
    };

    return (
        <div>
            <h1 className="text-lg font-bold mb-2">IP Sorgulama</h1>
            <div className="flex items-center justify-between w-full gap-4 flex-col md:flex-row">
                <div className="relative w-full">
                    <div className="absolute top-1/2 -translate-y-1/2 transform left-3">
                        <Image src="/icons/icon.svg" alt="Sorgulat Icon" width={21} height={20} />
                    </div>
                    <input
                        placeholder="IP adresi girin"
                        className="px-8 pl-9 font-semibold border-2 w-full border-primary rounded h-12 bg-white outline-primary text-primary placeholder-primary text-sm"
                        type="text"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                    />
                </div>
                <button 
                    onClick={fetchIpDetails}
                    className="bg-primary text-white px-4 py-2 rounded h-12 w-full md:w-fit md:min-w-fit"
                >
                    IP Bilgilerini Getir
                </button>
            </div>
            
                <div className="mt-4 p-4 border rounded bg-gray-100">
                {ipData && !ipData?.error ? (
                    <>
                    <p><strong>IP:</strong> {ipData.ip}</p>
                    <p><strong>Şehir:</strong> {ipData.city}</p>
                    <p><strong>Bölge:</strong> {ipData.region}</p>
                    <p><strong>Bölge Kodu:</strong> {ipData.region_code}</p>
                    <p className="flex items-center gap-1"><strong>Ülke:</strong> <Image width={19} height={19} src={`https://ipapi.co/static/images/flags/${ipData?.country_code?.toLowerCase()}.png`} alt={`${ipData.country_name} Bayrağı`} />{ipData.country_code} | {ipData.country_name}</p>
                    <p><strong>Başkent:</strong> {ipData.country_capital}</p>
                    <p><strong>Ülke Nüfusu:</strong> {ipData?.country_population?.toLocaleString("tr-TR")}</p>
                    <p><strong>Kıta Kodu:</strong> {ipData.continent_code}</p>
                    <p><strong>Posta Kodu:</strong> {ipData.postal}</p>
                    <p><strong>Latitude / Longitude	:</strong> {ipData.latitude} , {ipData.longitude}</p>
                    <p><strong>Org:</strong> {ipData.org}</p>
                    <p><strong>Timezone:</strong> {ipData.timezone} ({ipData.utc_offset})</p>
                    <p><strong>Telefon Kodu:</strong> {ipData.country_calling_code}</p>
                    <p><strong>Para Birimi:</strong> {ipData.currency}</p>
                    <p><strong>Kullanılan Diller:</strong> {ipData.languages}</p>

                    <iframe
                        className="w-full h-80"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={`https://maps.google.com/maps?q=${ipData?.latitude},${ipData?.longitude}&hl=tr&z=14&output=embed`}
                    >
                    </iframe>
        </>
                ) : ipData?.error ? <p>ip adresine ait bilgiler alınırken bir hata oluştu.</p> : <p>ip adresiniz alınıyor...</p>}
                </div>
        </div>
    );
};

export default IpForm;
