import { getRequest } from "@/utils/api";
import UniversitelerPage from "./UniversitelerPageClient";
import { Metadata } from "next";

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
  const universities = await getRequest("/schools/universities");
  return <UniversitelerPage universities={universities} />;
} 