'use client';
import React, { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaExchangeAlt, FaMapMarkedAlt, FaMapMarkerAlt } from 'react-icons/fa';
import useDebounce from "@/hooks/useDebounce";
import { getRequest } from "@/utils/api";
import { SearchResponse } from "@/app/saat-kac/types/Timezone.types";
import { FiSearch, FiArrowRight, FiGlobe } from "react-icons/fi";

type FormValues = {
  from: string;
  to: string;
};

const icons = {
  from: <FaMapMarkerAlt className="text-primary" />,
  to: <FaMapMarkedAlt className="text-primary" />
};

const CompareForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<FormValues>();

  const [results, setResults] = useState<{ [key in keyof FormValues]: SearchResponse[] }>({
    from: [],
    to: [],
  });

  const [slugs, setSlugs] = useState<{ [key in keyof FormValues]: string | null }>({
    from: null,
    to: null,
  });

  const [showAuto, setShowAuto] = useState<{ [key in keyof FormValues]: boolean }>({
    from: false,
    to: false,
  });

  const clickedRef = useRef<{ from: boolean; to: boolean }>({ from: false, to: false });

  const search = (type: keyof FormValues) =>
    useDebounce(async (query: string) => {
      if (!query.trim()) return;
      try {
        const res = await getRequest<SearchResponse[]>(`/timezones/search?query=${query}&limit=5`);
        setResults((prev) => ({ ...prev, [type]: res }));
      } catch {
        setResults((prev) => ({ ...prev, [type]: [] }));
      } finally {
        setShowAuto((prev) => ({ ...prev, [type]: true }));
      }
    }, 500);

  const searchFrom = search('from');
  const searchTo = search('to');

  const handleInputChange = (type: keyof FormValues, value: string) => {
    setSlugs((prev) => ({ ...prev, [type]: null }));
    type === "from" ? searchFrom(value) : searchTo(value);
  };

  const selectOption = (type: keyof FormValues, item: SearchResponse) => {
    setValue(type, item.name);
    setSlugs((prev) => {
      const updated = { ...prev, [type]: item.slug };
  
      const stored = JSON.parse(localStorage.getItem("lastCompareSearch") || "{}");
      const updatedStorage = {
        ...stored,
        [type]: item.name,
        [`slug${type[0].toUpperCase()}${type.slice(1)}`]: item.slug,
      };
      localStorage.setItem("lastCompareSearch", JSON.stringify(updatedStorage));
  
      return updated;
    });
  
    setShowAuto((prev) => ({ ...prev, [type]: false }));
    clearErrors(type);
    clickedRef.current[type] = true;
  };

  React.useEffect(() => {
    const lastSearch = localStorage.getItem("lastCompareSearch");
    if (lastSearch) {
      const parsed = JSON.parse(lastSearch);
      const from = parsed.from;
      const to = parsed.to;
      const slugFrom = parsed.slugFrom;
      const slugTo = parsed.slugTo;
  
      if (from && slugFrom) {
        setValue("from", from);
        setSlugs((prev) => ({ ...prev, from: slugFrom }));
      }
      if (to && slugTo) {
        setValue("to", to);
        setSlugs((prev) => ({ ...prev, to: slugTo }));
      }
    }
  }, []);
  
  const handleExchange = () => {
    const tempFrom = slugs.from;
    const tempTo = slugs.to;
    
    setSlugs({
      from: tempTo,
      to: tempFrom,
    });

    const fromValue = watch('from');
    const toValue = watch('to');

    setValue('from', toValue);
    setValue('to', fromValue);

    const stored = JSON.parse(localStorage.getItem("lastCompareSearch") || "{}");
    const updatedStorage = {
      ...stored,
      from: toValue,
      to: fromValue,
      slugFrom: tempTo,
      slugTo: tempFrom,
    };
    localStorage.setItem("lastCompareSearch", JSON.stringify(updatedStorage));
  };

  const handleBlur = (type: keyof FormValues) => {
    setTimeout(() => {
      const value = watch(type);
      const matched = results[type].find((r) => r.name === value);
      if (clickedRef.current[type]) {
        clickedRef.current[type] = false;
        return;
      }
      if (matched) {
        selectOption(type, matched);
      } else if (results[type].length > 0) {
        selectOption(type, results[type][0]);
      }
    }, 150);
  };

  const onSubmit = (data: FormValues) => {
    if (!slugs.from || !slugs.to) {
      if (!slugs.from) setError("from", { type: "manual", message: "Lütfen nereden olduğunu yazınız." });
      if (!slugs.to) setError("to", { type: "manual", message: "Lütfen nereye olduğunu yazınız." });
      return;
    }

    if (slugs.from === slugs.to) {
      setError("to", { type: "manual", message: "Aynı şehir seçilemez." });
      return;
    }

    window.location.pathname = `/saat-kac/fark/from-${slugs.from}-to-${slugs.to}`;
  };

  const handleFocus = (type: keyof FormValues) => {
    setShowAuto((prev) => ({ ...prev, [type]: true }));
  };

  const renderInput = (type: keyof FormValues, label: string, placeholder: string) => {
    const popularCities: { [key in keyof FormValues]: SearchResponse[] } = {
      from: [
        { name: "İstanbul", slug: "istanbul" },
        { name: "Ankara", slug: "ankara" },
        { name: "Antalya", slug: "antalya" },
        { name: "Munih", slug: "munih" },
        { name: "New York", slug: "new-york" },
        { name: "Paris", slug: "paris" },
        { name: "Tokyo", slug: "tokyo" },
        { name: "Londra", slug: "londra" },
        { name: "Dubai", slug: "dubai" },
      ],
      to: [
        { name: "Munih", slug: "munih" },
        { name: "New York", slug: "new-york" },
        { name: "Paris", slug: "paris" },
        { name: "Tokyo", slug: "tokyo" },
        { name: "Londra", slug: "londra" },
        { name: "Dubai", slug: "dubai" },
        { name: "İstanbul", slug: "istanbul" },
        { name: "Ankara", slug: "ankara" },
        { name: "Antalya", slug: "antalya" },
      ]
    };
  
  return (
    <div ref={inputRefs[type]} className="relative w-full">
      <label className="block text-base font-semibold text-gray-700 mb-3">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
          {icons[type]}
        </span>
        <input
          type="text"
          autoComplete="off"
          {...register(type, { required: "Bu alan zorunludur." })}
          onChange={(e) => handleInputChange(type, e.target.value)}
          onFocus={() => handleFocus(type)}
          onBlur={() => handleBlur(type)}
          placeholder={placeholder}
          className="pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white shadow-sm hover:shadow-md"
        />
        {type === "from" && (
          <button
            type="button"
            onClick={handleExchange}
            className="absolute -right-6 p-2 top-3 rounded-full bg-gradient-to-r from-primary to-primaryDark text-white border border-primary z-50 hidden sm:block hover:from-primaryDark hover:to-primary transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaExchangeAlt className="w-4 h-4" />
          </button>
        )}
      </div>
      {showAuto[type] && (
        <div className="absolute bg-white border-2 border-gray-200 w-full z-10 shadow-xl rounded-xl p-6 mt-2 space-y-4">
          {results[type].length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FiSearch className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-gray-700">Arama Sonuçları</p>
              </div>
              <ul className="max-h-48 overflow-y-auto space-y-1">
                {results[type].map((item) => (
                  <li
                    key={item.slug}
                    onClick={() => selectOption(type, item)}
                    className="px-4 py-3 hover:bg-gradient-to-r hover:from-primary hover:to-primaryDark hover:text-white cursor-pointer rounded-lg transition-all duration-150 group"
                  >
                    <div className="flex items-center gap-3">
                      <FiGlobe className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                      <span className="font-medium text-gray-900 group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiArrowRight className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-gray-700">Popüler Şehirler</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularCities[type].map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => selectOption(type, item)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gradient-to-r hover:from-primary hover:to-primaryDark hover:text-white text-sm rounded-lg transition-all duration-200 font-medium border border-gray-200 hover:border-primary"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {errors[type] && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            {errors[type]?.message}
          </p>
        </div>
      )}
    </div>
  );
}

const inputRefs = {
  from: useRef<HTMLDivElement>(null),
  to: useRef<HTMLDivElement>(null),
};

React.useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    ['from', 'to'].forEach((type) => {
      const ref = inputRefs[type as keyof FormValues];
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowAuto((prev) => ({ ...prev, [type]: false }));
      }
    });
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
      <div className="flex flex-col gap-6 sm:flex-row">
        {renderInput("from", "Nereden:", "Şehir veya Ülke Ara")}
        {renderInput("to", "Nereye:", "Şehir veya Ülke Ara")}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-primaryDark hover:from-primaryDark hover:to-primary text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        <FiSearch className="w-5 h-5" />
        Saat Farkını Bul
      </button>
    </form>
  );
};

export default CompareForm;
