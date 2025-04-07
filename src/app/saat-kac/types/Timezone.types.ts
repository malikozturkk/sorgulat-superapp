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
    sunrise: string;
    sunset: string;
    sunsetDifference: string
    allCities: TimezoneData[]
    noonTime: string
    noonDifferenceMin: number
};

export interface IRandomItems {
    getCitiesTimezones: TimezoneData[]
    getCountriesTimezones: TimezoneData[]
}

interface Destination {
    name: string;
    slug: string;
    timezone: string;
    country: string;
    latitude: number;
    longitude: number;
    offset: number;
}

export interface DifferenceData {
    from: string;
    locationText: string;
    destinations: Destination[];
}

export interface SearchResponse {
    name: string;
    slug: string;
    time: string;
    timezone: string;
    error?: string
}