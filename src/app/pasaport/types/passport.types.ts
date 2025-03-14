export interface VisaColors {
    main: string;
    Vizesiz: string;
    Vizeli: string;
    "Kapıda Vize": string;
    eTA: string;
    default: string;
}

export interface VisaCounts {
    "Kapıda Vize": number;
    Vizeli: number;
    Vizesiz: number;
    eTA: number;
    main: number;
  }


export interface VisaCountry {
    country: string;
    value: keyof VisaColors;
}

export type FilterType = "visa-free" | "visa" | "visa-on-arrival" | "eta";