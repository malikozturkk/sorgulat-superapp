import { getRequest } from "@/utils/api";
import { TimeData, TimezoneData } from "../api/timezones/data";
import LiveClock from "@/components/Timezone/LiveClock";
import RandomItems from "@/components/Timezone/RandomItems";

export default async function Home() {
    try {
        const [getCitiesTimezones, getCountriesTimezones, getTurkeyData]: [TimezoneData[], TimezoneData[], TimeData] = await Promise.all([
            getRequest("/api/timezones/cities"),
            getRequest("/api/timezones/countries"),
            getRequest("/api/timezones/turkiye"),
        ]);
        return (
            <div className="flex flex-col items-center gap-5 md:gap-10">
                <LiveClock initialTime={getTurkeyData} />
                <RandomItems getCitiesTimezones={getCitiesTimezones} getCountriesTimezones={getCountriesTimezones} />
            </div>
        );
    } catch (e) {
        return `Error -> ${e}`
    }
}
