"use client";
import * as React from "react";
import WorldMap from "react-svg-worldmap";

const visaColors = {
  "own": "#C8102E",
  "Vizesiz": "#646ecb",
  "Vizeli": "#ff69b4",
  "Kapıda Vize": "#f39c12",
  "eTA": "#7C26CF",
  "default": "#cdd0d6",
};

const data = [
    { country: "AF", value: "Vizeli" },
    { country: "AL", value: "Vizesiz" }, 
    { country: "DZ", value: "Vizeli" }, 
    { country: "AD", value: "Vizeli" }, 
    { country: "AO", value: "Vizesiz" },
    { country: "AG", value: "Vizesiz" }, // Antigua ve Barbuda
    { country: "AR", value: "Vizesiz" },
    { country: "AM", value: "Vizeli" }, 
    { country: "AU", value: "Vizeli" }, 
    { country: "AT", value: "Vizeli" },
    { country: "AZ", value: "Vizesiz" }, 
    { country: "BS", value: "Vizesiz" }, 
    { country: "BH", value: "Kapıda Vize" }, // Bahreyn
    { country: "BD", value: "Kapıda Vize" },
    { country: "BB", value: "Vizesiz" },
    { country: "BY", value: "Vizesiz" },
    { country: "BE", value: "Vizeli" },
    { country: "BZ", value: "Vizesiz" }, 
    { country: "BJ", value: "Vizeli" }, 
    { country: "BT", value: "Vizeli" }, // Bhutan
    { country: "BO", value: "Vizesiz" },
    { country: "BA", value: "Vizesiz" },
    { country: "BW", value: "Vizeli" }, // Botsvana
    { country: "BR", value: "Vizesiz" }, 
    { country: "BN", value: "Vizeli" }, // Brunei
    { country: "BG", value: "Vizeli" }, 
    { country: "BF", value: "Vizeli" }, 
    { country: "BI", value: "Kapıda Vize" },
    { country: "CV", value: "Vizeli" }, // Cape Verde
    { country: "KH", value: "Kapıda Vize" }, 
    { country: "CM", value: "Vizeli" },
    { country: "CA", value: "Vizeli" }, 
    { country: "CF", value: "Vizeli" }, 
    { country: "TD", value: "Vizeli" }, // Çad
    { country: "CL", value: "Vizesiz" },
    { country: "CN", value: "Vizeli" }, 
    { country: "CO", value: "Vizesiz" }, 
    { country: "KM", value: "Kapıda Vize" },
    { country: "CG", value: "Vizeli" }, // Kongo Cumhuriyeti
    { country: "CD", value: "Kapıda Vize" }, // Kongo Demokratik Cumhuriyeti
    { country: "CR", value: "Vizesiz" }, // Kosta Rika
    { country: "CI", value: "eTA" },
    { country: "HR", value: "Vizeli" },
    { country: "CU", value: "Kapıda Vize" },
    { country: "CY", value: "Vizeli" }, 
    { country: "CZ", value: "Vizeli" }, // Çekya
    { country: "DK", value: "Vizeli" }, 
    { country: "DJ", value: "Vizeli" }, 
    { country: "DM", value: "Vizesiz" }, // Dominika
    { country: "DO", value: "Vizeli" }, // Dominik Cumhuriyeti
    { country: "EC", value: "Vizesiz" }, // Ekvador
    { country: "EG", value: "Kapıda Vize" },
    { country: "SV", value: "Vizeli" }, // El Salvador
    { country: "GQ", value: "Vizeli" }, // Ekvator Ginesi
    { country: "ER", value: "Vizeli" }, // Eritre
    { country: "EE", value: "Vizeli" }, // Estonya
    { country: "ET", value: "Vizeli" }, // Etiyopya
    { country: "FJ", value: "Vizesiz" }, // Fiji
    { country: "FI", value: "Vizeli" }, 
    { country: "FR", value: "Vizeli" }, 
    { country: "GA", value: "Kapıda Vize" },
    { country: "GM", value: "Vizeli" }, // Gambiya
    { country: "GE", value: "Vizesiz" },
    { country: "DE", value: "Vizeli" }, 
    { country: "GH", value: "Vizeli" }, // Gana
    { country: "GR", value: "Vizeli" }, 
    { country: "GD", value: "Vizesiz" }, // Grenada
    { country: "GT", value: "Vizeli" }, // Guatemala
    { country: "GN", value: "Kapıda Vize" }, 
    { country: "GW", value: "Kapıda Vize" },
    { country: "GY", value: "Vizesiz" }, // Guyana
    { country: "HT", value: "Vizesiz" }, // Haiti
    { country: "HN", value: "Vizeli" }, // Honduras
    { country: "HU", value: "Vizeli" }, 
    { country: "IS", value: "Vizeli" }, 
    { country: "IN", value: "Vizeli" },
    { country: "ID", value: "Kapıda Vize" }, 
    { country: "IR", value: "Vizesiz" }, 
    { country: "IQ", value: "Vizeli" }, // Irak
    { country: "IE", value: "Vizeli" },
    { country: "IL", value: "Vizeli" }, 
    { country: "IT", value: "Vizeli" }, 
    { country: "JM", value: "Vizeli" }, // Jamaika
    { country: "JP", value: "Vizeli" }, // Japonya
    { country: "JO", value: "Kapıda Vize" }, // Ürdün
    { country: "KZ", value: "Vizesiz" },
    { country: "KE", value: "eTA" }, 
    { country: "KI", value: "Vizeli" }, // Kiribati
    { country: "KW", value: "Kapıda Vize" }, 
    { country: "KG", value: "Vizesiz" },
    { country: "LA", value: "Kapıda Vize" },
    { country: "LV", value: "Vizeli" }, 
    { country: "LB", value: "Kapıda Vize" },
    { country: "LS", value: "Kapıda Vize" }, 
    { country: "LR", value: "Vizeli" }, 
    { country: "LY", value: "Vizeli" }, 
    { country: "LI", value: "Vizeli" }, // Lihtenştayn
    { country: "LT", value: "Vizeli" }, // Litvanya
    { country: "LU", value: "Vizeli" },
    { country: "MG", value: "Kapıda Vize" },
    { country: "MW", value: "Kapıda Vize" },
    { country: "MY", value: "Vizesiz" }, // Malezya
    { country: "MV", value: "Kapıda Vize" }, // Maldivler
    { country: "ML", value: "Vizeli" }, // Mali
    { country: "MT", value: "Vizeli" }, // Malta
    { country: "MH", value: "Vizeli" }, // Marshall Adaları
    { country: "MR", value: "Kapıda Vize" },
    { country: "MU", value: "Vizesiz" }, // Mauritius
    { country: "FM", value: "Vizeli" }, // Mikronezya
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
    { country: "NI", value: "Vizeli" }, // Nikaragua
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
    { country: "KN", value: "Vizesiz" }, // Saint Kitts ve Nevis
    { country: "LC", value: "Vizesiz" }, // Saint Lucia
    { country: "VC", value: "Vizesiz" }, // Saint Vincent ve Grenadinler
    { country: "WS", value: "Vizeli" }, // Samoa
    { country: "SM", value: "Vizeli" }, // San Marino
    { country: "ST", value: "Vizeli" }, // São Tomé ve Príncipe
    { country: "SA", value: "Kapıda Vize" },
    { country: "SN", value: "Kapıda Vize" }, 
    { country: "RS", value: "Vizesiz" },
    { country: "SC", value: "Kapıda Vize" }, // Seyşeller
    { country: "SL", value: "Kapıda Vize" },
    { country: "SG", value: "Vizesiz" },
    { country: "SK", value: "Vizeli" }, 
    { country: "SI", value: "Vizeli" }, 
    { country: "SB", value: "Vizeli" },
    { country: "SO", value: "Kapıda Vize" },
    { country: "ZA", value: "Vizeli" }, // Güney Afrika
    { country: "KR", value: "eTA" }, 
    { country: "SS", value: "Kapıda Vize" }, 
    { country: "ES", value: "Vizeli" },
    { country: "ET", value: "Kapıda Vize" }, 
    { country: "GH", value: "Vizeli" }, // Gana
    { country: "GQ", value: "Vizeli" }, // Ekvator Ginesi
    { country: "HK", value: "Vizeli" }, // Hong Kong
    { country: "IN", value: "Vizeli" }, // Hindistan
    { country: "IQ", value: "Vizeli" }, // Irak
    { country: "IR", value: "Vizeli" }, // İran
    { country: "JM", value: "Vizeli" }, // Jamaika
    { country: "JP", value: "Vizeli" }, // Japonya
    { country: "KP", value: "Vizeli" }, // Kuzey Kore
    { country: "LR", value: "Vizeli" }, // Liberya
    { country: "LY", value: "Vizeli" }, 
    { country: "ML", value: "Vizeli" },
    { country: "MM", value: "Vizeli" }, 
    { country: "NG", value: "Vizeli" }, 
    { country: "PK", value: "eTA" }, 
    { country: "SD", value: "Kapıda Vize" },
    { country: "SY", value: "Vizeli" }, // Suriye
    { country: "TH", value: "Vizesiz" }, 
    { country: "TR", value: "own" }, 
    { country: "TM", value: "Vizeli" }, // Türkmenistan
    { country: "US", value: "Vizeli" },
    { country: "VN", value: "Kapıda Vize" },
    { country: "YE", value: "Vizeli" },  
    { country: "TW", value: "Kapıda Vize" }, 
    { country: "LK", value: "Kapıda Vize" },
    { country: "SZ", value: "Vizeli" }, // Svaziland (Eswatini)
    { country: "ZW", value: "Kapıda Vize" },
    { country: "ZM", value: "Vizeli" }, // Zambiya
    { country: "TZ", value: "Kapıda Vize" }, 
    { country: "UG", value: "Kapıda Vize" }, 
    { country: "TG", value: "Kapıda Vize" }, 
    { country: "EH", value: "Vizeli" }, // Batı Sahra
    { country: "TN", value: "Vizesiz" },
    { country: "SE", value: "Vizeli" },
    { country: "UZ", value: "Vizeli" }, // Özbekistan
    { country: "UA", value: "Vizeli" }, // Ukrayna
    { country: "GB", value: "Vizeli" }, 
    { country: "CH", value: "Vizeli" }, 
    { country: "MX", value: "eTA" },
    { country: "VE", value: "Vizeli" }, // Venezuela
    { country: "SR", value: "Vizeli" }, // Surinam
    { country: "UY", value: "Vizesiz" }, 
    { country: "AE", value: "Vizeli" }, 
    { country: "TJ", value: "Vizeli" }, // Tacikistan
    { country: "MK", value: "Vizeli" }, // Makedonya
    { country: "XK", value: "Vizesiz" } 
];

const counts: { [key: string]: number } = data.reduce((acc, item) => {
    acc[item.value] = (acc[item.value] || 0) + 1;
    return acc;
}, {});


export default function PassportMap() {
    const [size, setSize] = React.useState("sm" as "sm" | "md" | "lg" | "xl" | "xxl");
    const [selectedType, setSelectedType] = React.useState("Tümü" as "Tümü" | "Vizesiz" | "Vizeli" | "Kapıda Vize" | "eTA");

    React.useEffect(() => {
      const updateSize = () => {
        setSize(window.innerWidth >= 768 ? "xxl" : "sm");
      };
  
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);
  
    return (
        <>
            <div className="w-full mb-4 px-4 flex flex-wrap gap-2 justify-center md:justify-end text-sm">
                <button type="button" className={`rounded-lg transition-colors px-4 py-2 ${selectedType === "Tümü" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray"}`} onClick={() => setSelectedType("Tümü")}>Tümü</button>
                <button type="button" className={`rounded-lg transition-colors px-4 py-2 ${selectedType === "Vizesiz" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray"}`} onClick={() => setSelectedType("Vizesiz")}>Vizesiz ({counts.Vizesiz})</button>
                <button type="button" className={`rounded-lg transition-colors px-4 py-2 ${selectedType === "Vizeli" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray"}`} onClick={() => setSelectedType("Vizeli")}>Vizeli ({counts.Vizeli})</button>
                <button type="button" className={`rounded-lg transition-colors px-4 py-2 ${selectedType === "Kapıda Vize" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray"}`} onClick={() => setSelectedType("Kapıda Vize")}>Kapıda Vize</button>
                <button type="button" className={`rounded-lg transition-colors px-4 py-2 ${selectedType === "eTA" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray"}`} onClick={() => setSelectedType("eTA")}>eTA</button>
            </div>
            <div className="w-full justify-center flex items-center">
                <WorldMap
                color={visaColors.default}
                data={data}
                frame={false}
                borderColor="white"
                backgroundColor="#f9fafb"
                strokeOpacity={1}
                tooltipBgColor="#646ecb"
                size={size}
                tooltipTextColor="white"
                richInteraction={true}
                styleFunction={({ countryCode, countryValue }) => ({
                    fill: visaColors[countryValue as keyof typeof visaColors] || visaColors.default,
                    stroke: "#ffffff",
                    strokeWidth: 0.5,
                })}
                tooltipTextFunction={({ countryName }) => countryName}
                />
            </div>
        </>
    );
}