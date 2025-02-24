export interface TimezoneData {
    name: string;
    slug: string
    timezone: string;
    country?: string
    selected?: boolean
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


export const cities: TimezoneData[] = [
    { name: "İstanbul", slug: "istanbul", timezone: "Europe/Istanbul", country: "Türkiye" },
    { name: "New York", slug: "new-york", timezone: "America/New_York", country: "Amerika Birleşik Devletleri" },
    { name: "Şikago", slug: "sikago", timezone: "America/Chicago", country: "Amerika Birleşik Devletleri" },
    { name: "Tokyo", slug: "tokyo", timezone: "Asia/Tokyo", country: "Japonya" },
    { name: "Londra", slug: "londra", timezone: "Europe/London", country: "İngiltere" },
    { name: "Paris", slug: "paris", timezone: "Europe/Paris", country: "Fransa" },
    { name: "Dubai", slug: "dubai", timezone: "Asia/Dubai", country: "Birleşik Arap Emirlikleri" },
    { name: "Hong Kong", slug: "hong-kong", timezone: "Asia/Hong_Kong", country: "Çin" },
    { name: "Sydney", slug: "sydney", timezone: "Australia/Sydney", country: "Avustralya" },
    { name: "Berlin", slug: "berlin", timezone: "Europe/Berlin", country: "Almanya" },
    { name: "Moskova", slug: "moskova", timezone: "Europe/Moscow", country: "Rusya" },
    { name: "Los Angeles", slug: "los-angeles", timezone: "America/Los_Angeles", country: "Amerika Birleşik Devletleri" },
    { name: "Singapur", slug: "singapur", timezone: "Asia/Singapore", country: "Singapur" },
    { name: "Seul", slug: "seul", timezone: "Asia/Seoul", country: "Güney Kore" },
    { name: "Roma", slug: "roma", timezone: "Europe/Rome", country: "İtalya" },
    { name: "Bangkok", slug: "bangkok", timezone: "Asia/Bangkok", country: "Tayland" },
    { name: "Madrid", slug: "madrid", timezone: "Europe/Madrid", country: "İspanya" },
    { name: "Toronto", slug: "toronto", timezone: "America/Toronto", country: "Kanada" },
    { name: "Mexico City", slug: "mexico-city", timezone: "America/Mexico_City", country: "Meksika" },
    { name: "Pekin", slug: "pekin", timezone: "Asia/Shanghai", country: "Çin" },
    { name: "Mumbai", slug: "mumbai", timezone: "Asia/Kolkata", country: "Hindistan" },
    { name: "Jakarta", slug: "jakarta", timezone: "Asia/Jakarta", country: "Endonezya" },
    { name: "Cape Town", slug: "cape-town", timezone: "Africa/Johannesburg", country: "Güney Afrika" },
    { name: "Amsterdam", slug: "amsterdam", timezone: "Europe/Amsterdam", country: "Hollanda" },
    { name: "Dublin", slug: "dublin", timezone: "Europe/Dublin", country: "İrlanda" },
    { name: "Oslo", slug: "oslo", timezone: "Europe/Oslo", country: "Norveç" },
    { name: "Frankfurt", slug: "frankfurt", timezone: "Europe/Berlin", country: "Almanya" },
    { name: "Helsinki", slug: "helsinki", timezone: "Europe/Helsinki", country: "Finlandiya" },
    { name: "Stockholm", slug: "stockholm", timezone: "Europe/Stockholm", country: "İsveç" },
    { name: "Vancouver", slug: "vancouver", timezone: "America/Vancouver", country: "Kanada" },
    { name: "San Francisco", slug: "san-francisco", timezone: "America/Los_Angeles", country: "Amerika Birleşik Devletleri" },
    { name: "Washington, D.C.", slug: "washington-dc", timezone: "America/New_York", country: "Amerika Birleşik Devletleri" },
    { name: "Rio de Janeiro", slug: "rio-de-janeiro", timezone: "America/Sao_Paulo", country: "Brezilya" },
    { name: "São Paulo", slug: "sao-paulo", timezone: "America/Sao_Paulo", country: "Brezilya" },
    { name: "Buenos Aires", slug: "buenos-aires", timezone: "America/Argentina/Buenos_Aires", country: "Arjantin" },
    { name: "Abu Dabi", slug: "abu-dhabi", timezone: "Asia/Dubai", country: "Birleşik Arap Emirlikleri" },
    { name: "Delhi", slug: "delhi", timezone: "Asia/Kolkata", country: "Hindistan" },
    { name: "Miami", slug: "miami", timezone: "America/New_York", country: "Amerika Birleşik Devletleri" },
    { name: "Milano", slug: "milano", timezone: "Europe/Rome", country: "İtalya" },
    { name: "Taipei", slug: "taipei", timezone: "Asia/Taipei", country: "Tayvan" },
    { name: "Tel Aviv", slug: "tel-aviv", timezone: "Asia/Jerusalem", country: "İsrail" },
    { name: "Reykjavik", slug: "reykjavik", timezone: "Atlantic/Reykjavik", country: "İzlanda" },
    { name: "Hanoi", slug: "hanoi", timezone: "Asia/Ho_Chi_Minh", country: "Vietnam" },
    { name: "Tahran", slug: "tahran", timezone: "Asia/Tehran", country: "İran" }
];


export const countries: TimezoneData[] = [
    { name: "Afganistan", slug: "afganistan", timezone: "Asia/Kabul" },
    { name: "Arnavutluk", slug: "arnavutluk", timezone: "Europe/Tirane" },
    { name: "Cezayir", slug: "cezayir", timezone: "Africa/Algiers" },
    { name: "Amerika Birleşik Devletleri", slug: "abd", timezone: "America/New_York" },
    { name: "Andorra", slug: "andorra", timezone: "Europe/Andorra" },
    { name: "Angola", slug: "angola", timezone: "Africa/Luanda" },
    { name: "Arjantin", slug: "arjantin", timezone: "America/Argentina/Buenos_Aires" },
    { name: "Ermenistan", slug: "ermenistan", timezone: "Asia/Yerevan" },
    { name: "Avustralya", slug: "avustralya", timezone: "Australia/Sydney" },
    { name: "Avusturya", slug: "avusturya", timezone: "Europe/Vienna" },
    { name: "Azerbaycan", slug: "azerbaycan", timezone: "Asia/Baku" },
    { name: "Bahamas", slug: "bahamas", timezone: "America/Nassau" },
    { name: "Bahreyn", slug: "bahreyn", timezone: "Asia/Bahrain" },
    { name: "Bangladeş", slug: "banglades", timezone: "Asia/Dhaka" },
    { name: "Belçika", slug: "belcika", timezone: "Europe/Brussels" },
    { name: "Belize", slug: "belize", timezone: "America/Belize" },
    { name: "Benin", slug: "benin", timezone: "Africa/Porto-Novo" },
    { name: "Bhutan", slug: "bhutan", timezone: "Asia/Thimphu" },
    { name: "Bolivya", slug: "bolivya", timezone: "America/La_Paz" },
    { name: "Bosna-Hersek", slug: "bosna-hersek", timezone: "Europe/Sarajevo" },
    { name: "Brezilya", slug: "brezilya", timezone: "America/Sao_Paulo" },
    { name: "Bulgaristan", slug: "bulgaristan", timezone: "Europe/Sofia" },
    { name: "Kanada", slug: "kanada", timezone: "America/Toronto" },
    { name: "Şili", slug: "sili", timezone: "America/Santiago" },
    { name: "Çin", slug: "cin", timezone: "Asia/Shanghai" },
    { name: "Kolombiya", slug: "kolombiya", timezone: "America/Bogota" },
    { name: "Hırvatistan", slug: "hirvatistan", timezone: "Europe/Zagreb" },
    { name: "Çekya", slug: "cekya", timezone: "Europe/Prague" },
    { name: "Danimarka", slug: "danimarka", timezone: "Europe/Copenhagen" },
    { name: "Mısır", slug: "misir", timezone: "Africa/Cairo" },
    { name: "Fransa", slug: "fransa", timezone: "Europe/Paris" },
    { name: "Almanya", slug: "almanya", timezone: "Europe/Berlin" },
    { name: "Yunanistan", slug: "yunanistan", timezone: "Europe/Athens" },
    { name: "Hindistan", slug: "hindistan", timezone: "Asia/Kolkata" },
    { name: "Endonezya", slug: "endonezya", timezone: "Asia/Jakarta" },
    { name: "İran", slug: "iran", timezone: "Asia/Tehran" },
    { name: "İtalya", slug: "italya", timezone: "Europe/Rome" },
    { name: "Japonya", slug: "japonya", timezone: "Asia/Tokyo" },
    { name: "Meksika", slug: "meksika", timezone: "America/Mexico_City" },
    { name: "Hollanda", slug: "hollanda", timezone: "Europe/Amsterdam" },
    { name: "Norveç", slug: "norvec", timezone: "Europe/Oslo" },
    { name: "Polonya", slug: "polonya", timezone: "Europe/Warsaw" },
    { name: "Portekiz", slug: "portekiz", timezone: "Europe/Lisbon" },
    { name: "Rusya", slug: "rusya", timezone: "Europe/Moscow" },
    { name: "Suudi Arabistan", slug: "suudi-arabistan", timezone: "Asia/Riyadh" },
    { name: "İspanya", slug: "ispanya", timezone: "Europe/Madrid" },
    { name: "İsveç", slug: "isvec", timezone: "Europe/Stockholm" },
    { name: "İsviçre", slug: "isvicre", timezone: "Europe/Zurich" },
    { name: "Türkiye", slug: "turkiye", timezone: "Europe/Istanbul" },
    { name: "Ukrayna", slug: "ukrayna", timezone: "Europe/Kiev" },
    { name: "İngiltere", slug: "ingiltere", timezone: "Europe/London" },
    { name: "Vietnam", slug: "vietnam", timezone: "Asia/Ho_Chi_Minh" },
    { name: "Güney Afrika", slug: "guney-afrika", timezone: "Africa/Johannesburg" },
];
