import { TimezoneData } from "@/app/saat-kac/types/Timezone.types"
import { TimezoneLink } from "../RandomItems"

interface IAllCitiesByCountry {
    allCities: TimezoneData[]
}

const AllCitiesByCountry: React.FC<IAllCitiesByCountry> = ({ allCities }) => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {allCities.length} En Büyük Şehirler
                </h3>
                <p className="text-lg font-semibold text-primary">
                    {allCities[0].country}
                </p>
            </div>
            
            <div className="flex gap-3 flex-wrap justify-center">
                {allCities.map((timezone) => (
                    <TimezoneLink key={timezone.name} timezone={timezone} />
                ))}
            </div>
        </div>
    )
}

export default AllCitiesByCountry