import { DifferenceData, TimeData } from "@/app/saat-kac/types/Timezone.types";
import Link from "next/link";

interface ITimeDifferenceGraph {
    differenceTime: DifferenceData
    initialTime: TimeData
}

const TimeDifferenceGraph: React.FC<ITimeDifferenceGraph> = ({ differenceTime, initialTime }) => {
    return (
        <div className="px-4 py-8 mx-auto mt-8 md:mt-16 sm:px-6 sm:py-10 lg:px-8 lg:py-12 bg-[#222] w-full text-white text-lg font-semibold">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-primary text-4xl font-extrabold mb-5 md:mb-10">
                    Saat farkı <br />
                    <span className="text-white text-xl font-normal">{differenceTime.from} {differenceTime.locationText}n</span>
                </h1>
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
                {differenceTime.destinations.map((city) => {
                    const width = `${Math.abs(city.offset) * 20}px`;
                    const left = city.offset < 0 ? `calc(50% - ${width})` : "50%";

                    return (
                        <div key={city.name} className="group flex items-center w-full hover:bg-[#333] transition justify-between sm:justify-normal">
                            <Link href={`/saat-kac/${city.slug}`} target="_blank" className="w-40 text-right pr-2 border-b border-black group-hover:border-primary cursor-pointer">
                                {city.name}
                            </Link>
                            <div className="relative flex-1 h-10 p-2 hidden sm:block">
                                <div className="absolute left-1/2 w-1 h-full bg-primary mx-1"></div>
                                <div
                                    className="animated-bar group-hover:bg-[#646ecb]"
                                    style={{
                                        "--bar-width": width,
                                        width: "0px",
                                        left: left,
                                        marginLeft: city.offset > 0 ? "12px" : "",
                                    } as React.CSSProperties}
                                ></div>
                            </div>
                            <div className="w-28 text-left pl-2 h-6">{city.offset > 0 ? `+${city.offset}` : city.offset} saat</div>
                        </div>
                    );
                })}
                <Link href="/saat-kac/fark" className="px-2 py-3 md:p-4 border border-white rounded-lg text-sm md:text-xl block w-full text-center md:w-fit mt-5 duration-150 hover:bg-white hover:text-[#222]">Diğer zaman dilimleriyle karşılaştır</Link>
            </div>
            <div className="mx-auto max-w-7xl p-4 pb-0 sm:p-6 sm:pb-0 lg:p-8 lg:pb-0">
                <h2 className="mt-5 mb-3 md:mt-10 md:mb-5 text-4xl font-extrabold text-primary leading-10">
                    <span>{differenceTime.from} için güneşin doğuşu, güneşin batışı, gün uzunluğu ve güneş zamanı bilgisi</span>
                </h2>
                <ul className="pl-6 text-lg" style={{listStyle: "square"}}>
                    <li>Güneşin doğuşu: {initialTime.sunrise}</li>
                    <li>Güneşin batışı: {initialTime.sunset}</li>
                    <li>Gün uzuluğu: {initialTime.sunsetDifference}</li>
                    <li>Öğlen vakti: {initialTime.noonTime}</li>
                    <li>{differenceTime.from} {differenceTime.locationText}ki yerel saat {Math.abs(initialTime.noonDifferenceMin) + " dakika"} {initialTime.noonDifferenceMin === 0 ? "durumunda" : initialTime.noonDifferenceMin > 0 ? "ötesinde" : "gerisinde"} öğlen vaktidir.</li>
                </ul>
            </div>
        </div>
    );
};

export default TimeDifferenceGraph;