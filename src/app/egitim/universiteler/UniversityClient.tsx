"use client";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { FiMapPin, FiExternalLink, FiSearch, FiUsers, FiBook, FiAward, FiPhone, FiMail } from "react-icons/fi";
import { FaUniversity, FaStar, FaGlobe, FaCalendarAlt } from "react-icons/fa";
import { filterUniversities, translate } from "@/utils/utils";
import { getRequest } from "@/utils/api";

export default function UniversityClient({ universities: initialUniversities }: { universities: any }) {
  const [search, setSearch] = useState("");
  const [universities, setUniversities] = useState(initialUniversities?.data || []);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialUniversities?.total_pages || 1);
  const [allUniversitiesLoaded, setAllUniversitiesLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialUniversities?.data && Array.isArray(initialUniversities.data) && initialUniversities.data.length > 0) {
      setUniversities(initialUniversities.data);
      setTotalPages(initialUniversities.total_pages || 1);
    }
  }, [initialUniversities]);

  const loadAllUniversities = useCallback(async () => {
    if (allUniversitiesLoaded || loading) return;
    
    setLoading(true);
    try {
      const allUnis = await getRequest(`/schools/universities?limit=1000&page=1`);
      
      if (allUnis?.data && Array.isArray(allUnis.data)) {
        setUniversities(allUnis.data);
        setAllUniversitiesLoaded(true);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Tüm üniversiteler yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  }, [allUniversitiesLoaded, loading]);

  const loadMoreUniversities = useCallback(async () => {
    if (loading || !hasMore || allUniversitiesLoaded) return;
    
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newUniversities = await getRequest(`/schools/universities?limit=12&page=${nextPage}`);
      
      if (newUniversities?.data && Array.isArray(newUniversities.data) && newUniversities.data.length > 0) {
        setUniversities((prev: any[]) => [...prev, ...newUniversities.data]);
        setCurrentPage(nextPage);
        setHasMore(nextPage < totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Üniversiteler yüklenirken hata oluştu:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, currentPage, totalPages, allUniversitiesLoaded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          if (search.trim()) {
            loadAllUniversities();
          } else {
            loadMoreUniversities();
          }
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreUniversities, loadAllUniversities, hasMore, loading, search]);

  const filtered = useMemo(() => {
    if (!search.trim()) return universities;
    return filterUniversities(universities, search);
  }, [universities, search]);

  useEffect(() => {
    if (search.trim() && !allUniversitiesLoaded) {
      loadAllUniversities();
    }
  }, [search, allUniversitiesLoaded, loadAllUniversities]);

  const getUniversityTypeColor = (type: string) => {
    const colors = {
      state: "bg-gradient-to-r from-blue-500 to-blue-600",
      private: "bg-gradient-to-r from-yellow-500 to-orange-500",
      kktc: "bg-gradient-to-r from-green-500 to-emerald-600",
      abroad: "bg-gradient-to-r from-purple-500 to-indigo-600"
    };
    return colors[type as keyof typeof colors] || "bg-gradient-to-r from-gray-500 to-gray-600";
  };

  const getUniversityTypeIcon = (type: string) => {
    const icons = {
      state: <FaUniversity className="text-white" />,
      private: <FaStar className="text-white" />,
      kktc: <FaGlobe className="text-white" />,
      abroad: <FaGlobe className="text-white" />
    };
    return icons[type as keyof typeof icons] || <FaUniversity className="text-white" />;
  };

  const handleWebsiteClick = (e: React.MouseEvent, website: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(website, '_blank');
  };

  return (
    <div>
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Üniversite adı veya şehir ara..."
            className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-base shadow-sm"
            autoComplete="off"
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-fr">
        {filtered && Array.isArray(filtered) && filtered.length > 0 ? filtered.map((uni: any) => (
          <Link
            key={uni.id}
            href={`/egitim/${uni.slug}`}
            className="group block h-full"
            aria-label={`${uni.name} detay sayfasına git`}
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-2 group-hover:border-primary/20 h-full flex flex-col">
              <div className={`${getUniversityTypeColor(uni.university_type)} p-6 text-white relative overflow-hidden flex-shrink-0`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getUniversityTypeIcon(uni.university_type)}
                      <span className="text-sm font-medium opacity-90">
                        {translate.universityType(uni.university_type)}
                      </span>
                    </div>
                    {uni.founded_year && (
                      <div className="text-xs opacity-75 flex items-center gap-1">
                        <FaCalendarAlt />
                        {uni.founded_year}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-yellow-200 transition-colors min-h-[3rem]">
                    {uni.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm opacity-90 min-h-[1.25rem]">
                    <FiMapPin className="min-w-4 min-h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{uni.city} / {uni.district}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-4 mb-6 flex-shrink-0">
                  {uni.student_count && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <FiUsers className="text-primary w-4 h-4" />
                        <span className="text-xs text-gray-600">Öğrenci</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {uni.student_count.toLocaleString('tr-TR')}
                      </div>
                    </div>
                  )}
                  
                  {uni.faculty_count && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <FiBook className="text-primary w-4 h-4" />
                        <span className="text-xs text-gray-600">Fakülte</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {uni.faculty_count}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  {uni.contacts?.rector && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiAward className="text-blue-600 w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-600">Rektör</div>
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {uni.contacts.rector.name} {uni.contacts.rector.surname}
                        </div>
                      </div>
                    </div>
                  )}

                  {uni.contacts?.phone && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiPhone className="text-green-600 w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-600">Telefon</div>
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {uni.contacts.phone}
                        </div>
                      </div>
                    </div>
                  )}

                  {uni.contacts?.email && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiMail className="text-purple-600 w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-600">E-posta</div>
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {uni.contacts.email}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {uni.contacts?.website && (
                  <div 
                    onClick={(e) => handleWebsiteClick(e, uni.contacts.website)}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/15 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FiExternalLink className="text-primary w-4 h-4" />
                      <span className="text-sm font-medium text-primary">Web Sitesi</span>
                    </div>
                    <div className="text-xs text-gray-500">Ziyaret Et</div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Detayları Gör</span>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/80 transition-colors">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )) : (
          !loading && (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Üniversite Bulunamadı</h3>
                <p className="text-gray-600">
                  {search ? "Arama kriterlerinize uygun üniversite bulunamadı. Farklı anahtar kelimeler deneyebilirsiniz." : "Henüz üniversite verisi yüklenmedi."}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {hasMore && (
        <div ref={loadingRef} className="col-span-full text-center py-8">
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">
                {search ? "Tüm üniversiteler yükleniyor..." : "Daha fazla üniversite yükleniyor..."}
              </span>
            </div>
          ) : (
            <div className="h-8"></div>
          )}
        </div>
      )}

      {!hasMore && universities.length > 0 && (
        <div className="col-span-full text-center py-8">
          <div className="text-gray-500 text-sm">
            {search ? `Arama sonuçları: ${filtered.length} üniversite bulundu` : `Tüm üniversiteler yüklendi. (${universities.length} üniversite)`}
          </div>
        </div>
      )}
    </div>
  );
} 