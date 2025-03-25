export function padZero(num: number): string {
    return num.toString().padStart(2, '0');
}

export const getLocationSuffix = (name: string) => {
    const vowels = "aeıioöuü";
    const deVowels = "eiöü";
    const lastVowel = [...name].reverse().find(char => vowels.includes(char.toLowerCase()));

    return lastVowel && deVowels.includes(lastVowel) ? "de" : "da";
};


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

type VisaType = "visa-free" | "visa" | "visa-on-arrival" | "eta";

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
