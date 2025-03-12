"use client";
import { VisaCountry, VisaColors, VisaCounts } from "@/app/pasaport/page";
import * as React from "react";
import WorldMap from "react-svg-worldmap";
  
const visaColors: VisaColors = {
    main: "#C8102E",
    Vizesiz: "#2ECC71",
    Vizeli: "#ff69b4",
    "Kapıda Vize": "#f39c12",
    eTA: "#646ecb",
    default: "#cdd0d6",
};


interface IPassportMap {
  countries: VisaCountry[]
  counts: VisaCounts
}

const PassportMap: React.FC<IPassportMap> = ({countries, counts}) => {
  const [size, setSize] = React.useState<"sm" | "md" | "lg" | "xl" | "xxl">("sm");
  const [selectedType, setSelectedType] = React.useState<keyof VisaColors | "Tümü">("Tümü");

  const BUTTONS: { label: string; type: keyof VisaColors | "Tümü" }[] = [
    { label: `Tümü (${countries.length - 1})`, type: "Tümü" },
    { label: `Vizesiz (${counts.Vizesiz || 0})`, type: "Vizesiz" },
    { label: `Vizeli (${counts.Vizeli || 0})`, type: "Vizeli" },
    { label: `Kapıda Vize (${counts["Kapıda Vize"] || 0})`, type: "Kapıda Vize" },
    { label: `eTA (${counts.eTA || 0})`, type: "eTA" },
  ];

    React.useEffect(() => {
      const updateSize = () => {
        setSize(window.innerWidth >= 768 ? "xxl" : "sm");
      };
  
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);
  
  const filteredData = selectedType === "Tümü" 
    ? countries 
    : countries.map(item => ({
        ...item,
        value: item.value === selectedType ? item.value : "default"
      }));
    return (
        <>
            <div className="w-full mb-4 px-4 flex flex-wrap gap-2 justify-center md:justify-end text-sm">
                {BUTTONS.map(({ label, type }) => (
                <button
                    key={type}
                    type="button"
                    className={`rounded-lg transition-colors px-4 py-2 ${selectedType === type ? "text-white" : "text-gray-800"}`}
                    style={{
                      backgroundColor: selectedType === type 
                        ? visaColors[type as keyof VisaColors] || "#1F2937 "
                        : "#E5E7EB"
                    }}
                    onClick={() => setSelectedType(type)}
                >
                    {label}
                </button>
                ))}
            </div>
            <div className="w-full justify-center flex items-center">
                <WorldMap
                color={visaColors.default}
                data={filteredData}
                frame={false}
                borderColor="white"
                backgroundColor="#f9fafb"
                strokeOpacity={1}
                tooltipBgColor="#646ecb"
                size={size}
                tooltipTextColor="white"
                richInteraction={true}
                styleFunction={({ countryValue }) => ({
                    fill: visaColors[countryValue as keyof VisaColors] || visaColors.default,
                    stroke: "#ffffff",
                    strokeWidth: 0.5,
                })}
                tooltipTextFunction={({ countryName }) => countryName}
                />
            </div>
        </>
    );
}

export default PassportMap