import { getRequest } from "@/utils/api";
import { Metadata } from "next";
import UniversityClient from "./UniversityClient";

export const metadata: Metadata = {
  title: "Türkiye'deki Tüm Üniversiteler | Sorgulat",
  description: "Türkiye'deki tüm üniversiteleri keşfedin: Devlet üniversiteleri, özel üniversiteler, KKTC üniversiteleri ve yurtdışı üniversiteleri. Şehir bazlı filtreleme, üniversite türü seçimi ve detaylı bilgiler.",
  keywords: "türkiyedeki tüm üniversiteler, türkiye üniversiteleri, devlet üniversitesi, özel üniversite, KKTC üniversiteleri, yurtdışı üniversiteleri, bakü üniversiteleri, özbekistan üniversiteleri, üniversite listesi, üniversite arama, üniversite karşılaştırma",
  openGraph: {
    title: "Türkiye'deki Tüm Üniversiteler | Sorgulat",
    description: "Türkiye'deki tüm üniversiteleri keşfedin: Devlet üniversiteleri, özel üniversiteler, KKTC üniversiteleri ve yurtdışı üniversiteleri. Şehir bazlı filtreleme ve detaylı üniversite bilgileri.",
    url: "https://www.sorgulat.com/egitim/universiteler",
    images: "/images/openGraph/university.png",
    type: "website",
    siteName: "Sorgulat"
  },
  twitter: {
    card: "summary_large_image",
    title: "Türkiye'deki Tüm Üniversiteler | Sorgulat",
    description: "Türkiye'deki tüm üniversiteleri keşfedin: Devlet üniversiteleri, özel üniversiteler, KKTC üniversiteleri ve yurtdışı üniversiteleri. Şehir bazlı filtreleme ve detaylı üniversite bilgileri.",
    images: "/images/openGraph/university.png",
    site: "@Sorgulat"
  },
  robots: "index, follow",
  alternates: {
    canonical: "/egitim/universiteler"
  }
};

export default async function Page() {
  const universities = await getRequest("/schools/universities?limit=12");
  return (
    <div className="px-4 mx-auto max-w-6xl py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Türkiye'deki Tüm Üniversiteler</h1>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Türkiye Cumhuriyeti, Kuzey Kıbrıs Türk Cumhuriyeti ve Türk dünyasından seçkin üniversitelerin kapsamlı listesi. 
        Devlet, özel, KKTC ve yurtdışı üniversitelerini tek platformda keşfedin.
      </p>
      <UniversityClient universities={universities} />
    </div>
  );
} 