"use client"
import { TimezoneData, IRandomItems } from "@/app/saat-kac/types/Timezone.types";
import Link from "next/link";
import { memo, useMemo } from "react";

const getClassName = (type: string) => {
    const classMap: Record<string, string> = {
        "5xl": "hover:bg-primary hover:text-white text-gray-900 font-extrabold text-lg md:text-2xl px-4 py-3 bg-white hover:shadow-lg border-2 border-gray-200 hover:border-primary rounded-xl transition-all duration-200 flex items-center justify-center",
        "3xl": "hover:bg-primary hover:text-white text-gray-700 font-bold text-base md:text-xl px-3 py-2 bg-gray-50 hover:shadow-md border border-gray-200 hover:border-primary rounded-lg transition-all duration-200 flex items-center justify-center",
        "xl": "hover:bg-primary hover:text-white text-gray-600 font-medium text-sm md:text-lg px-3 py-2 bg-gray-50 hover:shadow-md border border-gray-200 hover:border-primary rounded-lg transition-all duration-200 flex items-center justify-center",
    };

    return classMap[type] || "hover:bg-primary hover:text-white text-gray-600 font-normal text-sm md:text-base px-3 py-2 bg-gray-50 hover:shadow-md border border-gray-200 hover:border-primary rounded-lg transition-all duration-200 flex items-center justify-center";
};

export const TimezoneLink = memo(({ timezone }: { timezone: TimezoneData }) => {
    const className = useMemo(() => getClassName(timezone?.type || "base"), [timezone?.type]);
    
    return (
        <Link
            key={`/saat-kac/${timezone.name}`}
            href={`/saat-kac/${timezone?.slug}/`}
            className={className}
        >
            {timezone?.name}
        </Link>
    );
});

TimezoneLink.displayName = 'TimezoneLink';

const RandomItems = memo(({ getCitiesTimezones, getCountriesTimezones }: IRandomItems) => {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popüler Şehirler</h3>
                <div className="flex gap-3 flex-wrap items-center">
                    {getCitiesTimezones.map((timezone) => (
                        <TimezoneLink key={timezone.name} timezone={timezone} />
                    ))}
                </div>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popüler Ülkeler</h3>
                <div className="flex gap-3 flex-wrap items-center">
                    {getCountriesTimezones.map((timezone) => (
                        <TimezoneLink key={timezone.name} timezone={timezone} />
                    ))}
                </div>
            </div>
        </div>
    )
});

RandomItems.displayName = 'RandomItems';

export default RandomItems