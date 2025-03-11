import { getRequest } from "@/utils/api";
import { TimeData, TimezoneData } from "./saat-kac/types/Timezone.types";
import LiveClock from "@/components/Timezone/LiveClock";
import RandomItems from "@/components/Timezone/RandomItems";
import { generateMetadata } from "./layout";

export const dynamic = "force-dynamic";

export const metadata = async () => {
  return await generateMetadata({ params: { slug: 'saat-kac' } })
}

async function getUserLocation() {
  try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return data.city || data.country_name || "turkiye";
  } catch {
      return "turkiye";
  }
}

export default async function Home() {
  try {
    const userLocation = await getUserLocation();
    const endpoint = `/timezones/${userLocation.toLowerCase().replace(/\s+/g, '-')}`;

    const [getCitiesTimezones, getCountriesTimezones, getUserData]: [TimezoneData[], TimezoneData[], TimeData] = await Promise.all([
      getRequest("/timezones/city?limit=45"),
      getRequest("/timezones/country?limit=45"),
      getRequest(endpoint),
    ]);
    return (
      <div className="flex flex-col items-center gap-5 md:gap-10">
        <LiveClock initialTime={getUserData} />
        <RandomItems getCitiesTimezones={getCitiesTimezones} getCountriesTimezones={getCountriesTimezones} />
      </div>
    );
  } catch (e) {
    return `Error -> ${e}`
  }
}
