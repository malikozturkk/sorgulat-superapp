"use client"
import { TimezoneData, IRandomItems } from "@/app/saat-kac/types/Timezone.types";
import Link from "next/link";

const getClassName = (type: string) => {
    const classMap: Record<string, string> = {
        "5xl": "hover:bg-primary text-black font-extrabold text-2xl md:text-5xl px-3 bg-white hover:text-white",
        "3xl": "hover:bg-primary text-white font-extrabold text-lg md:text-3xl px-3",
        "xl": "hover:bg-primary text-white font-normal text-base md:text-xl px-3",
    };

    return classMap[type] || "px-1 text-white hover:bg-primary font-normal text-sm md:text-base";
};

export const TimezoneLink = ({ timezone }: { timezone: TimezoneData }) => (
    <Link
        key={`/saat-kac/${timezone.name}`}
        href={`/saat-kac/${timezone?.slug}/`}
        style={{ lineHeight: timezone.type === "5xl" ? "1.375" : timezone.type === "3xl" ? "2.5rem" : "1.5rem" }}
        className={getClassName(timezone?.type || "base")}
    >
        {timezone?.name}
    </Link>
);

const RandomItems = ({ getCitiesTimezones, getCountriesTimezones }: IRandomItems) => {
    return (
        <div className="flex justify-center bg-[#333] py-4 w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 mx-auto max-w-7xl">
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
    )
}

export default RandomItems