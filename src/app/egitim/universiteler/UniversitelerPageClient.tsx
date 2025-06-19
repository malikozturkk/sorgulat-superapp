"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { FiMapPin, FiExternalLink, FiSearch } from "react-icons/fi";
import { FaUniversity, FaStar, FaGlobe } from "react-icons/fa";
import { filterUniversities, translate } from "@/utils/utils";

export default function UniversitelerPage({ universities }: { universities: any[] }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(handler);
      setLoading(false);
    };
  }, [search]);

  const filtered = useMemo(() => filterUniversities(universities, debouncedSearch), [universities, debouncedSearch]);

  return (
    <div className="px-4 mx-auto max-w-6xl py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Tüm Üniversiteler</h1>
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Üniversite adı veya şehir ara..."
            className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-base"
            autoComplete="off"
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered && filtered.length > 0 ? filtered.map((uni: any) => (
            <div
              key={uni.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 p-6 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                {uni.university_type === "state" && <FaUniversity className="text-blue-700 min-w-5 min-h-5" />}
                {uni.university_type === "private" && <FaStar className="text-yellow-500 min-w-5 min-h-5" />}
                {(uni.university_type === "kktc" || uni.university_type === "abroad") && <FaGlobe className="text-green-700 min-w-5 min-h-5" />}
                <Link
                  href={`/egitim/${uni.slug}`}
                  className="text-lg font-semibold text-primary group-hover:underline truncate"
                  aria-label={`${uni.name} detay sayfasına git`}
                >
                  {uni.name}
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 text-gray-600 text-sm mb-1">
                <span className="flex items-center gap-1"><FiMapPin className="min-w-3.5 min-h-3.5" /> {uni.city} / {uni.district}</span>
                <span className="flex items-center gap-1">{translate.universityType(uni.university_type)}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 text-gray-500 text-xs">
                <span>Rektör: {uni.contacts?.rector?.name} {uni.contacts?.rector?.surname}</span>
                {uni.contacts?.website && (
                  <a
                    href={uni.contacts.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline ml-2"
                  >
                    <FiExternalLink className="min-w-3.5 min-h-3.5" /> Web Sitesi
                  </a>
                )}
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center text-gray-500 py-12">Üniversite bulunamadı.</div>
          )}
        </div>
      )}
    </div>
  );
} 