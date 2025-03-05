import { TimezoneData } from "@/app/saat-kac/types/Timezone.types"
import { TimezoneLink } from "../RandomItems"

interface IAllCitiesByCountry {
    allCities: TimezoneData[]
}

const AllCitiesByCountry: React.FC<IAllCitiesByCountry> = ({ allCities }) => {
    return (
        <div className="flex justify-center bg-[#222] py-4 w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 mx-auto max-w-7xl">
                <h1 className="flex flex-col gap-2 md:gap-4 text-2xl md:text-5xl font-extrabold text-white text-center mb-5 md:mb-10">
                    {allCities.length} en büyük şehirler
                    <strong className="font-extrabold text-primary text-4xl md:text-8xl">
                        {allCities[0].country}
                    </strong>
                </h1>
                <div className="flex gap-6 flex-wrap items-center">
                    {allCities.map((timezone) => (
                        <TimezoneLink key={timezone.name} timezone={timezone} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllCitiesByCountry