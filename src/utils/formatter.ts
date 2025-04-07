import { VisaType } from "@/components/Blog/blog.types";

export function padZero(num: number): string {
    return num.toString().padStart(2, '0');
}

export const getLocationSuffix = (name: string): string => {
  const vowels = "aeıioöuü";
  const deVowels = "eiöü";
  const hardConsonants = "fstkçşhp";

  const lastChar = name.slice(-1).toLowerCase();
  const lastVowel = [...name].reverse().find(char => vowels.includes(char.toLowerCase()));

  let base = lastVowel && deVowels.includes(lastVowel) ? "'de" : "'da";

  if (!vowels.includes(lastChar) && hardConsonants.includes(lastChar)) {
      base = base.replace("d", "t"); 
  }

  return base;
};

export function parseFromTo(slug: string): { from: string; to: string } | null {
  const match = slug.match(/^from-(.+)-to-(.+)$/);
  if (!match) return null;
  const from = match[1];
  const to = match[2];
  return { from, to };
}

export function formatDateTime(datetime: string, locale: string, timezone: string) {
  const date = new Date(datetime);
  const day = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: timezone }).format(date);
  const dayFormatted = day.charAt(0).toUpperCase() + day.slice(1);
  const dateFormatted = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    timeZone: timezone
  }).format(date);

  const timeFormatted = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone
  }).format(date);

  const year = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    timeZone: timezone
  }).format(date);

  return { timeFormatted, dateFormatted, dayFormatted, year };
}


export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    }).format(date);
  
    const isoDate = date.toISOString().split('T')[0];
  
    return { formattedDate, isoDate };
};

type VisaInfo = {
  text: string;
  color: string;
};

export const getVisaInfo = (visaType: VisaType): VisaInfo => {
  const visaMap: Record<VisaType, VisaInfo> = {
    "visa-free": {
      text: "Vizesiz",
      color: "#2ECC71",
    },
    visa: {
      text: "Vize Gerekli",
      color: "#ff69b4",
    },
    "visa-on-arrival": {
      text: "Kapıda Vize",
      color: "#f39c12",
    },
    eta: {
      text: "eTa Vizesi",
      color: "#646ecb",
    },
  };

  return visaMap[visaType];
}

interface VisaInfoForUrl {
    slug: string;
    text: string;
  }

export const generateVisaUrl = (visaType: VisaType): VisaInfoForUrl => {
    const urlMap: Record<VisaType, VisaInfoForUrl> = {
        "visa-free": { slug: "vizesiz-seyahat", text: "Vizesiz Seyahat" },
        "visa": { slug: "vizeli-seyahat", text: "Vizeli Seyahat" },
        "visa-on-arrival": { slug: "kapida-vize-seyahat", text: "Kapıda Vize Seyahat" },
        "eta": { slug: "eta-seyahat", text: "ETA Seyahat" },
        };

    return urlMap[visaType];
}


export const generateVisaType = (slug: string): VisaType => {
    const slugMap: Record<string, VisaType> = {
        "vizesiz-seyahat": "visa-free",
        "vizeli-seyahat": "visa",
        "kapida-vize-seyahat": "visa-on-arrival",
        "eta-seyahat": "eta",
    };

    return slugMap[slug] || "visa-free"; 
};
