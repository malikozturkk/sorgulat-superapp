import { getRequest } from "@/utils/api";
import Link from "next/link";
import { TimezoneData } from "../api/timezones/data";

export default async function Home() {
    const getCitiesTimezones = await getRequest("/api/timezones/cities")
    const getCountriesTimezones = await getRequest("/api/timezones/countries")
    const randomItemClass = "bg-white hover:bg-primary text-black hover:text-white text-black font-extrabold px-3 text-2xl md:text-5xl"
    if (!getCitiesTimezones || !getCountriesTimezones) {
        return (
            <div>veri alınamadı</div>
        )
    }
    return (
        <div className="flex justify-center bg-[#333] py-4">
            <div style={{ width: "75vw" }} className="flex flex-col items-center gap-4">
                <div className="flex gap-6 flex-wrap items-center">
                    {getCitiesTimezones.map((timezone: TimezoneData) => (
                        <Link
                            key={`/saat-kac/${timezone.name}`}
                            href={`/saat-kac/${timezone?.slug}/`}
                            style={{ lineHeight: timezone.selected ? "1.375" : "1.5rem" }}
                            className={`${timezone.selected ? randomItemClass : "text-lg font-semibold px-1 text-white hover:bg-primary"} duration-300`}
                        >
                            {timezone?.name}
                        </Link>
                    ))}
                </div>
                <div className="flex gap-6 flex-wrap items-center">
                    {getCountriesTimezones.map((timezone: TimezoneData, index: number) => (
                        <Link
                            key={`/saat-kac/${timezone.name}`}
                            href={`/saat-kac/${timezone?.slug}/`}
                            style={{ lineHeight: timezone.selected ? "1.375" : "1.5rem" }}
                            className={timezone.selected ? randomItemClass : "text-lg font-semibold px-1 text-white hover:bg-primary"}
                        >
                            {timezone?.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
