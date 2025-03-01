export interface TimezoneData {
    name: string;
    slug: string
    timezone: string;
    country?: string
    type?: "5xl" | "3xl" | "xl" | "base"
}

export interface PopulerCities {
    slug: string
    name: string
    hour: number
    minute: number
    dateTime: string;
    selected: boolean
}

export type TimeData = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    seconds: number;
    milliSeconds: number;
    dateTime: string;
    date: string;
    time: string;
    timezone: TimezoneData;
    dayOfWeek: string;
    dstActive: boolean;
    locationText: string
    populerCities: PopulerCities[]
};

export interface IRandomItems {
    getCitiesTimezones: TimezoneData[]
    getCountriesTimezones: TimezoneData[]
}