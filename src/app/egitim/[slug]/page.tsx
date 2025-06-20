import { Metadata } from "next";
import { getRequest } from "@/utils/api";
import { FiExternalLink, FiPhone, FiMail, FiMapPin, FiUser } from "react-icons/fi";
import { FaFax } from "react-icons/fa";
import { FaUniversity, FaStar, FaGlobe } from "react-icons/fa";
import Link from "next/link";
import { translate } from "@/utils/utils";
import { University } from "../types";
import { defaultGenerateMetadata } from "@/app/metadataConfig";


type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params
  let university = null;
  try {
    const data = await getRequest(`/schools/universities?university=${slug}`);
    if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
      university = data.data[0];
    } else if (Array.isArray(data) && data.length > 0) {
      university = data[0];
    }
  } catch (e) {
    return defaultGenerateMetadata();
  }

  if (!university) {
    return {
      title: "Üniversite Detayı | Sorgulat",
      description: "Üniversite detaylarını ve bölümlerini görüntüleyin.",
      robots: "index, follow",
      openGraph: {
        title: "Üniversite Detayı | Sorgulat",
        description: "Üniversite detaylarını ve bölümlerini görüntüleyin.",
        url: `https://www.sorgulat.com/egitim/${slug}`,
        images: "/images/openGraph/university.png",
        type: "website",
        siteName: "Sorgulat"
      },
      twitter: {
        card: "summary_large_image",
        title: "Üniversite Detayı | Sorgulat",
        description: "Üniversite detaylarını ve bölümlerini görüntüleyin.",
        images: "/images/openGraph/university.png",
        site: "@Sorgulat"
      },
      alternates: {
        canonical: `/egitim/${slug}`,
        types: {
          "application/opensearchdescription+xml": "/opensearch.xml",
          "application/rss+xml": "https://sorgulat.com/rss.xml"
        }
      }
    }
  }

  const title = `${university.name} | Sorgulat`;
  const description = `${university.name} (${university.city}, ${university.district}) üniversitesinin tüm bölümleri, taban puanları, kontenjanları ve iletişim bilgileri. Sorgulat ile üniversite tercihine dair detaylı bilgi alın.`;
  const image = "/images/openGraph/university.png";
  const url = `https://www.sorgulat.com/egitim/${university.slug}`;

  return {
    title,
    description,
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url,
      images: image,
      type: "website",
      siteName: "Sorgulat"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image,
      site: "@Sorgulat"
    },
    alternates: {
      canonical: `/egitim/${university.slug}`,
      types: {
        "application/opensearchdescription+xml": "/opensearch.xml",
        "application/rss+xml": "https://sorgulat.com/rss.xml"
      }
    }
  }
}

export default async function UniversityDetailPage({ params }: { params: Params }) {
    const { slug } = await params
  let university: University | null = null;
  try {
    const data = await getRequest(`/schools/universities?university=${slug}`);
    if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
      university = data.data[0];
    } else if (Array.isArray(data) && data.length > 0) {
      university = data[0];
    }
  } catch (e) {}

  if (!university) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Hata</h2>
        <p className="text-gray-700 mb-6">Üniversite bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="px-4 mx-auto max-w-5xl py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{university.name}</h1>
            <div className="flex flex-wrap gap-2 text-gray-600 text-sm mb-2">
              <span className="flex items-center gap-1"><FiMapPin className="min-w-3.5 min-h-3.5" /> {university.city} / {university.district}</span>
              <span className="flex items-center gap-1"><FiUser className="min-w-3.5 min-h-3.5" /> Rektör: {university.contacts.rector.name} {university.contacts.rector.surname}</span>
              <span className="flex items-center gap-1">
                {university.university_type === "state" && <FaUniversity className="min-w-3.5 min-h-3.5 text-blue-700" />}
                {university.university_type === "private" && <FaStar className="min-w-3.5 min-h-3.5 text-yellow-500" />}
                {(university.university_type === "kktc" || university.university_type === "abroad") && <FaGlobe className="min-w-3.5 min-h-3.5 text-green-700" />}
                {translate.universityType(university.university_type)}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 text-gray-700 text-sm">
              <Link href={`tel:${university.contacts.phone}`} className="flex items-center gap-1 hover:underline cursor-pointer" title="Telefonu ara">
                <FiPhone className="min-w-3.5 min-h-3.5" /> {university.contacts.phone}
              </Link>
              <Link href={`tel:${university.contacts.faks}`} className="flex items-center gap-1 hover:underline cursor-pointer" title="Faks gönder">
                <FaFax className="transform rotate-90" /> {university.contacts.faks}
              </Link>
              <Link href={`mailto:${university.contacts.mail}`} className="flex items-center gap-1 hover:underline cursor-pointer" title="Mail gönder">
                <FiMail className="min-w-3.5 min-h-3.5" /> {university.contacts.mail}
              </Link>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(university.contacts.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline cursor-pointer"
                title="Google Maps'te aç"
              >
                <FiMapPin className="min-w-3.5 min-h-3.5" /> {university.contacts.address}
              </Link>
              <Link
                href={university.contacts.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <FiExternalLink className="min-w-3.5 min-h-3.5" /> Web Sitesi
              </Link>
            </div>
            <div className="w-full mt-4 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title="Adres Harita Üzerinde"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(university.name + university.contacts.address)}&output=embed`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bölümler</h2>
        {university.departments.length === 0 ? (
          <div className="text-gray-500">Bu üniversiteye ait bölüm bulunamadı.</div>
        ) : (
          <div className="space-y-6">
            {university.departments.map((dept, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{dept.name}</h3>
                    <div className="flex flex-wrap gap-2 text-gray-600 text-sm mb-1">
                      <span>{dept.faculty}</span>
                      <span>{dept.language}</span>
                      <span>{translate.educationType(dept.education_type)}</span>
                      <span>{dept.duration}</span>
                      <span>{translate.degreeLevel(dept.degree_level)}</span>
                      <span>{translate.scoreType(dept.score_type)}</span>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border">
                    <thead>
                      <tr className="bg-primaryLight text-primary">
                        <th className="px-3 py-2">Yıl</th>
                        <th className="px-3 py-2">Kontenjan</th>
                        <th className="px-3 py-2">Taban Puan</th>
                        <th className="px-3 py-2">Tavan Puan</th>
                        <th className="px-3 py-2">Taban Sıralama</th>
                        <th className="px-3 py-2">Tavan Sıralama</th>
                        <th className="px-3 py-2">Yerleşen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...dept.yearly_data].sort((a, b) => b.year - a.year).map((yearData, yidx) => (
                        <tr key={yidx} className="border-t">
                          <td className="px-3 py-2 font-medium">{yearData.year}</td>
                          <td className="px-3 py-2">{yearData.quota}</td>
                          <td className="px-3 py-2">{yearData.base_score.toFixed(2)}</td>
                          <td className="px-3 py-2">{yearData.top_score.toFixed(2)}</td>
                          <td className="px-3 py-2">{yearData.base_rank.toLocaleString()}</td>
                          <td className="px-3 py-2">{yearData.top_rank.toLocaleString()}</td>
                          <td className="px-3 py-2">{yearData.placement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 