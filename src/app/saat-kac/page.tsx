import { getRequest } from "@/utils/api";
import { TimezoneData, TimeData } from "./types/Timezone.types";
import LiveClock from "@/components/Timezone/LiveClock";
import RandomItems from "@/components/Timezone/RandomItems";
import { generateMetadata } from '../layout'

export const metadata = async () => {
    return await generateMetadata({ params: { slug: 'saat-kac' } })
}

export default async function Home() {
    try {
        const [getCitiesTimezones, getCountriesTimezones, getTurkeyData]: [TimezoneData[], TimezoneData[], TimeData] = await Promise.all([
            getRequest("/timezones/city"),
            getRequest("/timezones/country"),
            getRequest("/timezones/istanbul"),
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
