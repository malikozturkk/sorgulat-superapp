import { getRequest } from "@/utils/api";
import { Metadata } from "next";
import UniversityClient from "./UniversityClient";

export const metadata: Metadata = {
  title: "Tüm Üniversiteler | Sorgulat",
  description: "Türkiye'deki tüm üniversiteleri şehir, tür ve detaylarıyla birlikte keşfedin. Üniversite detaylarına ulaşmak için listeden seçin.",
  openGraph: {
    title: "Tüm Üniversiteler | Sorgulat",
    description: "Türkiye'deki tüm üniversiteleri şehir, tür ve detaylarıyla birlikte keşfedin. Üniversite detaylarına ulaşmak için listeden seçin.",
    url: "https://www.sorgulat.com/egitim/universiteler",
    images: "/images/openGraph/university.png",
    type: "website",
    siteName: "Sorgulat"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tüm Üniversiteler | Sorgulat",
    description: "Türkiye'deki tüm üniversiteleri şehir, tür ve detaylarıyla birlikte keşfedin. Üniversite detaylarına ulaşmak için listeden seçin.",
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
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Tüm Üniversiteler</h1>
      <UniversityClient universities={universities} />
    </div>
  );
} 