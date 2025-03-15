"use client";
import { VisaColors, VisaCountry, VisaCounts } from "@/app/pasaport/types/passport.types";
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
  counts: VisaCounts | number
}

const PassportMap: React.FC<IPassportMap> = ({countries, counts}) => {
  const [size, setSize] = React.useState<"sm" | "md" | "lg" | "xl" | "xxl">("sm");
  const [selectedType, setSelectedType] = React.useState<keyof VisaColors | "Tümü">("Tümü");
  const [zoom, setZoom] = React.useState(1);
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isPanning = React.useRef(false);
  const startCoords = React.useRef({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.5, 5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev * 0.5, 1));

  const BUTTONS: { label: string; type: keyof VisaColors | "Tümü" }[] = 
  typeof counts !== "number"
    ? [
        { label: `Tümü (${countries.length - 1})`, type: "Tümü" },
        { label: `Vizesiz (${counts.Vizesiz || 0})`, type: "Vizesiz" },
        { label: `Vizeli (${counts.Vizeli || 0})`, type: "Vizeli" },
        { label: `Kapıda Vize (${counts["Kapıda Vize"] || 0})`, type: "Kapıda Vize" },
        { label: `eTA (${counts.eTA || 0})`, type: "eTA" },
      ]
    : [];

    React.useEffect(() => {
      const updateSize = () => {
        setSize(window.innerWidth >= 768 ? "xxl" : "sm");
      };
  
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);

    const handleMouseDown = (e: React.PointerEvent) => {
      isPanning.current = true;
      startCoords.current = { x: e.clientX - translate.x, y: e.clientY - translate.y };
    };
  
    const handleMouseMove = (e: React.PointerEvent) => {
      if (!isPanning.current) return;
      setTranslate(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    };
  
    const handleMouseUp = () => {
      isPanning.current = false;
    };
  
  const filteredData = selectedType === "Tümü"
  ? countries
  : countries.map(item => ({
      ...item,
      value: (item.value as keyof VisaColors) === selectedType 
        ? item.value 
        : "default"
    }));

    return (
        <>
          {typeof counts !== "number" &&
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
          }
          <div className="relative">
            <div className="absolute left-2 top-2 flex flex-col gap-2 z-10">
              <button
                onClick={handleZoomIn}
                className="rounded bg-primary p-1 box-border leading-[8px] cursor-pointer text-white h-5 w-5 duration-150 hover:opacity-80"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                className="rounded bg-primary p-1 box-border leading-[8px] cursor-pointer text-white h-5 w-5 duration-150 hover:opacity-80"
              >
                −
              </button>
            </div>

            <div
              ref={containerRef}
              className="w-full justify-center flex items-center overflow-hidden touch-none"
              onPointerDown={handleMouseDown}
              onPointerMove={handleMouseMove}
              onPointerUp={handleMouseUp}
              onPointerLeave={handleMouseUp}
            >
              <div
                style={{
                  transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                <WorldMap
                  color={visaColors.default}
                  data={filteredData}
                  frame={false}
                  borderColor="white"
                  backgroundColor="#f9fafb"
                  strokeOpacity={1}
                  size={size}
                  styleFunction={({ countryValue }) => ({
                    fill: visaColors[countryValue as keyof VisaColors] || visaColors.default,
                    stroke: "#ffffff",
                    strokeWidth: 0.5,
                  })}
                  tooltipTextFunction={({ countryName }) => zoom === 1 ? countryName : ""} 
                />
              </div>
            </div>
          </div>
        </>
    );
}

export default PassportMap