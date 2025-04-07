'use client';
import React, { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaExchangeAlt, FaMapMarkedAlt, FaMapMarkerAlt } from 'react-icons/fa';
import useDebounce from "@/hooks/useDebounce";
import { getRequest } from "@/utils/api";
import { SearchResponse } from "@/app/saat-kac/types/Timezone.types";

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

  const renderInput = (type: keyof FormValues, label: string, placeholder: string) => (
    <div className="relative w-full">
      <label className="block text-base font-semibold text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
          {icons[type]}
        </span>
        <input
          type="text"
          autoComplete="false"
          {...register(type, { required: "Bu alan zorunludur." })}
          onChange={(e) => handleInputChange(type, e.target.value)}
          onBlur={() => handleBlur(type)}
          placeholder={placeholder}
          className="pl-10 pr-3 py-2 border border-gray-300 h-12 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {type === "from" && (
          <button
            type="button"
            onClick={handleExchange}
            className="absolute -right-6 p-2 top-2.5 rounded-full bg-gray-100 border border-gray-200 z-50 hidden sm:block"
          >
            <FaExchangeAlt className="w-3 h-3" />
          </button>
        )}
      </div>
      {showAuto[type] && results[type].length > 0 && (
        <ul className="absolute bg-white border w-full z-10 shadow rounded max-h-48 overflow-y-auto mt-1">
          {results[type].map((item) => (
            <li
              key={item.slug}
              onClick={() => selectOption(type, item)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
      {errors[type] && <p className="text-red-600 text-sm mt-1">{errors[type]?.message}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
      <div className="flex flex-col gap-4 sm:flex-row">
        {renderInput("from", "Nereden:", "Şehir veya Ülke Ara")}
        {renderInput("to", "Nereye:", "Şehir veya Ülke Ara")}
      </div>
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primaryDark text-white py-3 rounded-md font-semibold transition"
      >
        Saat Farkını Bul
      </button>
    </form>
  );
};

export default CompareForm;
