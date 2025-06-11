import { DifferenceData, TimeData } from "@/app/saat-kac/types/Timezone.types";
import Link from "next/link";
import { FiArrowRight, FiSun, FiSunrise, FiSunset, FiClock } from "react-icons/fi";

interface ITimeDifferenceGraph {
    differenceTime: DifferenceData
    initialTime: TimeData
}

const TimeDifferenceGraph: React.FC<ITimeDifferenceGraph> = ({ differenceTime, initialTime }) => {
    return (
        <div className="space-y-8">
            {/* Saat Farkları Grafiği */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Saat Farkları
                    </h2>
                    <p className="text-gray-300">
                        {differenceTime.from} {differenceTime.locationText} ile diğer şehirler arasındaki saat farkları
                    </p>
                </div>
                
                <style>
                    {`
                @keyframes fillBar {
                    from {
                        width: 0;
                    }
                    to {
                        width: var(--bar-width);
                    }
                }

                .animated-bar {
                    position: absolute;
                    height: 1.5rem;
                    background-color: white;
                    animation: fillBar 0.5s ease-out forwards;
                }

                .animated-bar:hover {
                    background-color: #646ecb;
                }
                `}
                </style>
                
                <div className="space-y-4">
                    {differenceTime.destinations.map((city) => {
                        const width = `${Math.abs(city.offset) * 20}px`;
                        const left = city.offset < 0 ? `calc(50% - ${width})` : "50%";

                        return (
                            <div key={city.name} className="group flex items-center w-full hover:bg-gray-700 transition-all duration-200 rounded-lg p-3">
                                <Link href={`/saat-kac/${city.slug}`} target="_blank" className="w-40 text-right pr-4 border-b border-gray-600 group-hover:border-primary cursor-pointer font-medium">
                                    {city.name}
                                </Link>
                                <div className="relative flex-1 h-10 p-2 hidden sm:block">
                                    <div className="absolute left-1/2 w-1 h-full bg-primary mx-1"></div>
                                    <div
                                        className="animated-bar group-hover:bg-primary"
                                        style={{
                                            "--bar-width": width,
                                            width: "0px",
                                            left: left,
                                            marginLeft: city.offset > 0 ? "12px" : "",
                                        } as React.CSSProperties}
                                    ></div>
                                </div>
                                <div className="w-28 text-left pl-4 h-6 font-semibold">
                                    {city.offset > 0 ? `+${city.offset}` : city.offset} saat
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-6">
                    <Link 
                        href="/saat-kac/fark" 
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white rounded-xl text-sm font-medium w-full text-center md:w-fit transition-all duration-200 hover:bg-white hover:text-gray-900"
                    >
                        Diğer zaman dilimleriyle karşılaştır
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Güneş Bilgileri */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                        <FiSun className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Güneş Bilgileri
                        </h2>
                        <p className="text-gray-600">
                            {differenceTime.from} için güneşin doğuşu, batışı ve gün uzunluğu
                        </p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center gap-3 mb-3">
                            <FiSunrise className="w-5 h-5 text-orange-500" />
                            <span className="font-semibold text-gray-900">Güneş Doğuşu</span>
                        </div>
                        <p className="text-xl font-bold text-orange-600">{initialTime.sunrise}</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center gap-3 mb-3">
                            <FiSunset className="w-5 h-5 text-orange-500" />
                            <span className="font-semibold text-gray-900">Güneş Batışı</span>
                        </div>
                        <p className="text-xl font-bold text-orange-600">{initialTime.sunset}</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center gap-3 mb-3">
                            <FiClock className="w-5 h-5 text-orange-500" />
                            <span className="font-semibold text-gray-900">Gün Uzunluğu</span>
                        </div>
                        <p className="text-xl font-bold text-orange-600">{initialTime.sunsetDifference}</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center gap-3 mb-3">
                            <FiSun className="w-5 h-5 text-orange-500" />
                            <span className="font-semibold text-gray-900">Öğle Vakti</span>
                        </div>
                        <p className="text-xl font-bold text-orange-600">{initialTime.noonTime}</p>
                    </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-xl border border-orange-200">
                    <p className="text-gray-700">
                        <strong>{differenceTime.from}</strong> {differenceTime.locationText}ki yerel saat{" "}
                        <strong>{Math.abs(initialTime.noonDifferenceMin) + " dakika"}</strong>{" "}
                        {initialTime.noonDifferenceMin === 0 ? "durumunda" : initialTime.noonDifferenceMin > 0 ? "ötesinde" : "gerisinde"} öğlen vaktidir.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TimeDifferenceGraph;