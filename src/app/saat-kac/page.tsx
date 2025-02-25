import { getRequest } from "@/utils/api";
import Link from "next/link";
import { TimeData, TimezoneData } from "../api/timezones/data";
import LiveClock from "@/components/Timezone/LiveClock";


const getClassName = (type: string) => {
    const classMap: Record<string, string> = {
        "5xl": "hover:bg-primary text-black font-extrabold text-2xl md:text-5xl px-3 bg-white hover:text-white",
        "3xl": "hover:bg-primary text-white font-extrabold text-lg md:text-3xl px-3",
        "xl": "hover:bg-primary text-white font-normal text-base md:text-xl px-3",
    };

    return classMap[type] || "px-1 text-white hover:bg-primary font-normal text-sm md:text-base";
};

const TimezoneLink = ({ timezone }: { timezone: TimezoneData }) => (
    <Link
        key={`/saat-kac/${timezone.name}`}
        href={`/saat-kac/${timezone?.slug}/`}
        style={{ lineHeight: timezone.type === "5xl" ? "1.375" : "1.5rem" }}
        className={getClassName(timezone?.type || "base")}
    >
        {timezone?.name}
    </Link>
);

export default async function Home() {
    const [getCitiesTimezones, getCountriesTimezones, getTurkeyData]: [TimezoneData[], TimezoneData[], TimeData] = await Promise.all([
        getRequest("/api/timezones/cities"),
        getRequest("/api/timezones/countries"),
        getRequest("/api/timezones/turkiye"),
    ]);
    return (
        <div className="flex flex-col items-center gap-5 md:gap-10">
            <LiveClock initialTime={getTurkeyData} />
            <div className="flex justify-center bg-[#333] py-4 w-full">
                <div style={{ width: "75vw" }} className="flex flex-col items-center gap-4">
                    <div className="flex gap-6 flex-wrap items-center">
                        {getCitiesTimezones.map((timezone) => (
                            <TimezoneLink key={timezone.name} timezone={timezone} />
                        ))}
                    </div>
                    <div className="flex gap-6 flex-wrap items-center">
                        {getCountriesTimezones.map((timezone) => (
                            <TimezoneLink key={timezone.name} timezone={timezone} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
