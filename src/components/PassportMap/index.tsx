"use client";
import * as React from "react";
import WorldMap from "react-svg-worldmap";

interface VisaColors {
    main: string;
    Vizesiz: string;
    Vizeli: string;
    "Kapıda Vize": string;
    eTA: string;
    default: string;
}
  
const visaColors: VisaColors = {
    main: "#C8102E",
    Vizesiz: "#2ECC71",
    Vizeli: "#ff69b4",
    "Kapıda Vize": "#f39c12",
    eTA: "#646ecb",
    default: "#cdd0d6",
};

interface CountryData {
    country: string;
    value: keyof VisaColors;
}
  

const data: CountryData[] = [
    { country: "AF", value: "Vizeli" },
    { country: "AL", value: "Vizesiz" }, 
    { country: "DZ", value: "Vizeli" }, 
    { country: "AD", value: "Vizeli" }, 
    { country: "AO", value: "Vizesiz" },
    { country: "AG", value: "Vizesiz" },
    { country: "AR", value: "Vizesiz" },
    { country: "AM", value: "Vizeli" }, 
    { country: "AU", value: "Vizeli" }, 
    { country: "AT", value: "Vizeli" },
    { country: "AZ", value: "Vizesiz" }, 
    { country: "BS", value: "Vizesiz" }, 
    { country: "BD", value: "Kapıda Vize" },
    { country: "BB", value: "Vizesiz" },
    { country: "BY", value: "Vizesiz" },
    { country: "BE", value: "Vizeli" },
    { country: "BZ", value: "Vizesiz" }, 
    { country: "BJ", value: "Vizeli" }, 
    { country: "BT", value: "Vizeli" }, 
    { country: "BO", value: "Vizesiz" },
    { country: "BA", value: "Vizesiz" },
    { country: "BW", value: "Vizesiz" }, 
    { country: "BR", value: "Vizesiz" }, 
    { country: "BN", value: "Vizesiz" }, 
    { country: "BG", value: "Vizeli" }, 
    { country: "BF", value: "Vizeli" }, 
    { country: "BI", value: "Kapıda Vize" },
    { country: "KH", value: "Kapıda Vize" }, 
    { country: "CM", value: "Vizeli" },
    { country: "CA", value: "Vizeli" }, 
    { country: "CF", value: "Vizeli" }, 
    { country: "TD", value: "Vizeli" },
    { country: "CL", value: "Vizesiz" },
    { country: "CN", value: "Vizeli" }, 
    { country: "CO", value: "Vizesiz" }, 
    { country: "KM", value: "Kapıda Vize" },
    { country: "CG", value: "Vizeli" }, 
    { country: "CD", value: "Kapıda Vize" },
    { country: "CR", value: "Vizesiz" },
    { country: "CI", value: "eTA" },
    { country: "HR", value: "Vizeli" },
    { country: "CU", value: "Kapıda Vize" },
    { country: "CY", value: "Vizeli" }, 
    { country: "CZ", value: "Vizeli" },
    { country: "DK", value: "Vizeli" }, 
    { country: "DJ", value: "Vizeli" }, 
    { country: "DO", value: "Kapıda Vize" }, 
    { country: "EC", value: "Vizesiz" },
    { country: "EG", value: "Kapıda Vize" },
    { country: "SV", value: "Vizesiz" }, 
    { country: "GQ", value: "Vizeli" }, 
    { country: "ER", value: "Vizeli" }, 
    { country: "EE", value: "Vizeli" },
    { country: "ET", value: "Vizeli" },
    { country: "FJ", value: "Vizesiz" },
    { country: "FI", value: "Vizeli" }, 
    { country: "FR", value: "Vizeli" }, 
    { country: "GA", value: "Kapıda Vize" },
    { country: "GM", value: "Vizeli" }, 
    { country: "GE", value: "Vizesiz" },
    { country: "DE", value: "Vizeli" }, 
    { country: "GH", value: "Vizeli" }, 
    { country: "GR", value: "Vizeli" }, 
    { country: "GT", value: "Vizesiz" },
    { country: "GN", value: "Kapıda Vize" }, 
    { country: "GW", value: "Kapıda Vize" },
    { country: "GY", value: "Vizeli" }, 
    { country: "HT", value: "Kapıda Vize" },
    { country: "HN", value: "Vizesiz" },
    { country: "HU", value: "Vizeli" }, 
    { country: "IS", value: "Vizeli" }, 
    { country: "IN", value: "Vizeli" },
    { country: "ID", value: "Kapıda Vize" }, 
    { country: "IR", value: "Vizesiz" }, 
    { country: "IQ", value: "Vizeli" },
    { country: "IE", value: "Vizeli" },
    { country: "IL", value: "Vizeli" }, 
    { country: "IT", value: "Vizeli" }, 
    { country: "JM", value: "Vizesiz" },
    { country: "JP", value: "Vizesiz" }, 
    { country: "JO", value: "Vizesiz" }, 
    { country: "KZ", value: "Vizesiz" },
    { country: "KE", value: "eTA" }, 
    { country: "KI", value: "Vizeli" },
    { country: "KW", value: "Kapıda Vize" }, 
    { country: "KG", value: "Vizesiz" },
    { country: "LA", value: "Kapıda Vize" },
    { country: "LV", value: "Vizeli" }, 
    { country: "LB", value: "Kapıda Vize" },
    { country: "LS", value: "Kapıda Vize" }, 
    { country: "LR", value: "Vizeli" }, 
    { country: "LY", value: "Vizeli" }, 
    { country: "LI", value: "Vizeli" },
    { country: "LT", value: "Vizeli" }, 
    { country: "LU", value: "Vizeli" },
    { country: "MG", value: "Kapıda Vize" },
    { country: "MW", value: "Kapıda Vize" },
    { country: "MY", value: "Vizesiz" }, 
    { country: "MV", value: "Kapıda Vize" },
    { country: "ML", value: "Vizeli" }, 
    { country: "MT", value: "Vizeli" },
    { country: "MH", value: "Vizeli" },
    { country: "MR", value: "Kapıda Vize" },
    { country: "MU", value: "Vizesiz" },
    { country: "FM", value: "Vizeli" }, 
    { country: "MD", value: "Vizesiz" }, 
    { country: "MC", value: "Vizeli" }, 
    { country: "MN", value: "Vizesiz" }, 
    { country: "ME", value: "Vizesiz" },
    { country: "MA", value: "Vizesiz" }, 
    { country: "MZ", value: "Kapıda Vize" },
    { country: "MM", value: "Vizeli" }, 
    { country: "NA", value: "Kapıda Vize" },
    { country: "NR", value: "Vizeli" }, 
    { country: "NP", value: "Kapıda Vize" },
    { country: "NL", value: "Vizeli" },
    { country: "NZ", value: "Vizeli" },
    { country: "NI", value: "Vizesiz" },
    { country: "NE", value: "Vizeli" }, 
    { country: "NG", value: "Kapıda Vize" },
    { country: "NO", value: "Vizeli" },
    { country: "OM", value: "Kapıda Vize" },
    { country: "PW", value: "Vizesiz" },
    { country: "PS", value: "Vizesiz" },
    { country: "PA", value: "Vizesiz" }, 
    { country: "PG", value: "Vizeli" }, 
    { country: "PY", value: "Vizesiz" },
    { country: "PE", value: "Vizesiz" },
    { country: "PH", value: "Vizesiz" }, 
    { country: "PL", value: "Vizeli" },
    { country: "PT", value: "Vizeli" },
    { country: "QA", value: "Kapıda Vize" },
    { country: "RO", value: "Vizeli" }, 
    { country: "RU", value: "Vizeli" },
    { country: "RW", value: "Kapıda Vize" },
    { country: "KN", value: "Vizesiz" },
    { country: "LC", value: "Vizesiz" },
    { country: "VC", value: "Vizesiz" },
    { country: "WS", value: "Vizesiz" }, 
    { country: "ST", value: "Vizesiz" },
    { country: "SA", value: "Kapıda Vize" },
    { country: "SN", value: "Kapıda Vize" }, 
    { country: "RS", value: "Vizesiz" },
    { country: "SL", value: "Kapıda Vize" },
    { country: "SG", value: "Vizesiz" },
    { country: "SK", value: "Vizeli" }, 
    { country: "SI", value: "Vizeli" }, 
    { country: "SB", value: "Vizeli" },
    { country: "SO", value: "Kapıda Vize" },
    { country: "ZA", value: "Kapıda Vize" },
    { country: "KR", value: "eTA" }, 
    { country: "SS", value: "Kapıda Vize" }, 
    { country: "ES", value: "Vizeli" },
    { country: "ET", value: "Kapıda Vize" }, 
    { country: "GH", value: "Vizeli" }, 
    { country: "GQ", value: "Vizeli" }, 
    { country: "KP", value: "Vizeli" }, 
    { country: "LY", value: "Vizeli" }, 
    { country: "ML", value: "Vizeli" },
    { country: "MM", value: "Vizeli" }, 
    { country: "NG", value: "Vizeli" }, 
    { country: "PK", value: "eTA" }, 
    { country: "SD", value: "Kapıda Vize" },
    { country: "SY", value: "Vizesiz" }, 
    { country: "TH", value: "Vizesiz" }, 
    { country: "TR", value: "main" }, 
    { country: "TM", value: "Vizeli" }, 
    { country: "US", value: "Vizeli" },
    { country: "VN", value: "Kapıda Vize" },
    { country: "YE", value: "Vizeli" },  
    { country: "TW", value: "Kapıda Vize" }, 
    { country: "LK", value: "Kapıda Vize" },
    { country: "SZ", value: "Vizesiz" }, 
    { country: "ZW", value: "Kapıda Vize" },
    { country: "ZM", value: "Vizeli" }, 
    { country: "TZ", value: "Kapıda Vize" }, 
    { country: "UG", value: "Kapıda Vize" }, 
    { country: "TG", value: "Kapıda Vize" }, 
    { country: "EH", value: "Vizeli" },
    { country: "TN", value: "Vizesiz" },
    { country: "SE", value: "Vizeli" },
    { country: "UZ", value: "Vizesiz" },
    { country: "UA", value: "Vizesiz" },
    { country: "GB", value: "Vizeli" }, 
    { country: "CH", value: "Vizeli" }, 
    { country: "MX", value: "eTA" },
    { country: "VE", value: "Vizesiz" },
    { country: "SR", value: "Vizeli" },
    { country: "UY", value: "Vizesiz" }, 
    { country: "AE", value: "Vizeli" }, 
    { country: "TJ", value: "Vizeli" }, 
    { country: "MK", value: "Vizesiz" },
    { country: "XK", value: "Vizesiz" } 
];

const counts = data.reduce<Record<string, number>>((acc, item) => {
      acc[item.value] = (acc[item.value] || 0) + 1;
      return acc;
}, {});

const BUTTONS: { label: string; type: keyof VisaColors | "Tümü" }[] = [
  { label: `Tümü (${data.length - 1})`, type: "Tümü" },
  { label: `Vizesiz (${counts.Vizesiz || 0})`, type: "Vizesiz" },
  { label: `Vizeli (${counts.Vizeli || 0})`, type: "Vizeli" },
  { label: `Kapıda Vize (${counts["Kapıda Vize"] || 0})`, type: "Kapıda Vize" },
  { label: `eTA (${counts.eTA || 0})`, type: "eTA" },
];

export default function PassportMap() {
  const [size, setSize] = React.useState<"sm" | "md" | "lg" | "xl" | "xxl">("sm");
  const [selectedType, setSelectedType] = React.useState<keyof VisaColors | "Tümü">("Tümü");

    React.useEffect(() => {
      const updateSize = () => {
        setSize(window.innerWidth >= 768 ? "xxl" : "sm");
      };
  
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);
  
  const filteredData = selectedType === "Tümü" 
    ? data 
    : data.map(item => ({
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