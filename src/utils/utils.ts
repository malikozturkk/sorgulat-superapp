type TranslationMap = { [key: string]: string };

const universityType: TranslationMap = {
  state: "Devlet Üniversitesi",
  private: "Özel Üniversite",
  kktc: "KKTC Üniversitesi",
  abroad: "Yurtdışı Üniversitesi",
};

const educationType: TranslationMap = {
  formal: "Örgün Öğretim",
  distance: "Uzaktan Öğretim",
  second_education: "İkinci Öğretim",
};

const degreeLevel: TranslationMap = {
  licence: "4 Yıllık (Lisans)",
  associate: "2 Yıllık (Ön Lisans)",
};

const scoreType: TranslationMap = {
  numerical: "Sayısal Bölümü",
  verbal: "Sözel Bölümü",
  equal_weight: "Eşit Ağırlık Bölümü",
  tyt: "TYT Bölümü",
  language: "Dil Bölümü",
};


export const normalizeTr = (str: string) => {
  return str
    .toLocaleLowerCase("tr")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u");
}

export const filterUniversities = (universities: any[], search: string) => {
  if (!search) return universities;
  const s = normalizeTr(search);
  return universities.filter((uni) =>
    normalizeTr(uni.name).includes(s) ||
    normalizeTr(uni.city).includes(s)
  );
}

/**
 * Türkçe karakterleri normalize ederek karşılaştırma yapan sıralama fonksiyonu
 * @param a Birinci string
 * @param b İkinci string
 * @returns Karşılaştırma sonucu (-1, 0, 1)
 */
export function turkishSort(a: string, b: string): number {
  const turkishChars: Record<string, string> = {
      'ç': 'c', 'Ç': 'C',
      'ğ': 'g', 'Ğ': 'G',
      'ı': 'i', 'I': 'I',
      'İ': 'I', 'i': 'i',
      'ö': 'o', 'Ö': 'O',
      'ş': 's', 'Ş': 'S',
      'ü': 'u', 'Ü': 'U',
  };

  const normalize = (str: string): string => {
      return str
          .split('')
          .map(char => turkishChars[char] || char)
          .join('');
  };

  const aNormalized = normalize(a.toLowerCase());
  const bNormalized = normalize(b.toLowerCase());

  return aNormalized.localeCompare(bNormalized, 'tr');
}

const educationTypeMap: TranslationMap = {
  'Örgün Öğretim': 'formal',
  'Uzaktan Öğretim': 'distance',
  'İkinci Öğretim': 'second_education',
};
const universityTypeMap: TranslationMap = {
  'Devlet Üniversitesi': 'state',
  'Özel Üniversite': 'private',
  'KKTC Üniversitesi': 'kktc',
  'Yurtdışı Üniversitesi': 'abroad',
};
const degreeLevelMap: TranslationMap = {
  '4 Yıllık (Lisans)': 'licence',
  '2 Yıllık (Ön Lisans)': 'associate',
};
const scoreTypeMap: TranslationMap = {
  'Sayısal Bölümü': 'numerical',
  'Sözel Bölümü': 'verbal',
  'Eşit Ağırlık Bölümü': 'equal_weight',
  'TYT Bölümü': 'tyt',
  'Dil Bölümü': 'language',
};

const createTranslator = (map: TranslationMap) => (value: string): string =>
  map[value] || value;

export const translate = {
  universityType: createTranslator(universityType),
  educationType: createTranslator(educationType),
  degreeLevel: createTranslator(degreeLevel),
  scoreType: createTranslator(scoreType),
};

const createReverseTranslator = (map: TranslationMap) => (value: string): string =>
  map[value] || value;

export const reverseTranslate = {
  educationType: createReverseTranslator(educationTypeMap),
  universityType: createReverseTranslator(universityTypeMap),
  degreeLevel: createReverseTranslator(degreeLevelMap),
  scoreType: createReverseTranslator(scoreTypeMap),
};