import { getRequest } from "@/utils/api";
import { TimeData, TimezoneData } from "./saat-kac/types/Timezone.types";
import LiveClock from "@/components/Timezone/LiveClock";
import RandomItems from "@/components/Timezone/RandomItems";
import { generateMetadata } from "./layout";
import { headers } from 'next/headers'

export const dynamic = "force-dynamic";

export const metadata = async () => {
  return await generateMetadata({ params: { slug: 'saat-kac' } })
}

async function getUserLocation(ip: string) {
  try {
      const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`);
      const data = await res.json();
      return data.city || data.country || "turkiye";
  } catch {
      return "turkiye";
  }
}

export default async function Home() {
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for") || "auto";
  const userLocation = await getUserLocation(ip)
  const [getCitiesTimezones, getCountriesTimezones, getUserData]: [TimezoneData[], TimezoneData[], TimeData] =
    await Promise.all([
      getRequest("/timezones/city?limit=45"),
      getRequest("/timezones/country?limit=45"),
      getRequest(`/timezones/${encodeURIComponent(userLocation)}`).catch(() =>
        getRequest("/timezones/turkiye")
      ),
    ]);
    return (
      <div className="flex flex-col items-center gap-5 md:gap-10">
        <LiveClock initialTime={getUserData} />
        <RandomItems getCitiesTimezones={getCitiesTimezones} getCountriesTimezones={getCountriesTimezones} />
      </div>
    );
}
