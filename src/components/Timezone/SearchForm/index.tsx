"use client";
import { SearchResponse } from "@/app/saat-kac/types/Timezone.types";
import { handleClickOutside } from "@/hooks/useClickOutside";
import useDebounce from "@/hooks/useDebounce";
import { getRequest } from "@/utils/api";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiX, FiSearch } from "react-icons/fi";

export default function SearchForm() {
    const [showAutoComplete, setShowAutoComplete] = useState<boolean>(false)
    const [showInput, setShowInput] = useState<boolean>(false)
    const [result, setResult] = useState<SearchResponse[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("")

    const inputRef = useRef<HTMLInputElement | null>(null)
    const suggestionRef = useRef<HTMLDivElement>(null)

    const debouncedSearch = useDebounce(async (query: string) => {
        if (query.trim() !== "") {
            try {
                const res = await getRequest<SearchResponse[]>(`/timezones/search?query=${query}&limit=5`);
                setResult(res);
                setShowAutoComplete(true)
                setError(false)
            } catch (error) {
                setShowAutoComplete(true)
                setError(true)
            }
        }
    }, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value)
        debouncedSearch(value);

        if (value.trim() === "") {
            setShowAutoComplete(false)
            setResult([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', (event) =>
            handleClickOutside(event, suggestionRef, inputRef, setShowAutoComplete)
        )
        return () => {
            document.removeEventListener('mousedown', (event) =>
                handleClickOutside(event, suggestionRef, inputRef, setShowAutoComplete)
            )
        }
    }, [handleClickOutside])

    const inputElement = (
        <div style={{ width: "100dvw", height: "100dvh" }} className="lg:hidden bg-white/95 backdrop-blur-sm fixed top-0 left-0 z-50">
            <div className="w-full absolute left-0 top-5 flex items-center justify-between gap-2 px-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        placeholder="Şehir veya Ülke Ara"
                        ref={inputRef}
                        className="block w-full pl-10 pr-3 py-3 font-medium border-2 border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700 placeholder-gray-400 text-sm shadow-sm hover:shadow-md transition-all duration-200"
                        type="text"
                        value={query}
                        onChange={handleChange}
                        onClick={() => setShowAutoComplete(true)}
                    />
                    {result?.length > 0 && showAutoComplete ? (
                        <div ref={suggestionRef} className="absolute top-full left-0 w-full bg-white rounded-xl shadow-lg border border-gray-100 mt-2 z-50 overflow-hidden">
                            {result.map((item) => (
                                <Link
                                    href={`/saat-kac/${item.slug}`}
                                    key={item.slug}
                                    onClick={() => setShowInput(false)}
                                    className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-150 gap-4 border-b border-gray-100 last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-900">{item.name}</span>
                                    </div>
                                    <time className="font-bold text-primary">
                                        {new Intl.DateTimeFormat("tr-TR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hourCycle: "h23",
                                            timeZone: item.timezone
                                        }).format(new Date(item?.time || "2025-04-08T22:41:23+03:00"))}
                                    </time>
                                </Link>
                            ))}
                        </div>
                    ) : showAutoComplete && query.trim() !== "" && error ? (
                        <div ref={suggestionRef} className="absolute top-full left-0 w-full bg-white rounded-xl shadow-lg border border-gray-100 mt-2 z-50 p-4">
                            <div className="flex items-center gap-3 text-gray-500">
                                <FiX className="w-5 h-5 text-gray-400" />
                                <span>{query} aramanız için bir sonuç bulunamadı</span>
                            </div>
                        </div>
                    ) : null}
                </div>
                <button 
                    onClick={() => setShowInput(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                    <FiX className="w-6 h-6" />
                </button>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={() => setShowInput(true)}
                className="lg:hidden inline-flex p-2 sm:p-3 text-gray-700 transition-all duration-200 rounded-xl focus:bg-gray-100 hover:bg-gray-100 border border-gray-200 hover:border-gray-300">
                <FiSearch className="w-4 h-4" />
            </button>
            {showInput && createPortal(inputElement, document.body)}
            <div className="relative hidden lg:block">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        placeholder="Şehir veya Ülke Ara"
                        ref={inputRef}
                        className="block w-full pl-10 pr-3 py-3 font-medium border-2 border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700 placeholder-gray-400 text-sm shadow-sm hover:shadow-md transition-all duration-200"
                        type="text"
                        value={query}
                        onChange={handleChange}
                        onClick={() => setShowAutoComplete(true)}
                    />
                    {result?.length > 0 && showAutoComplete ? (
                        <div ref={suggestionRef} className="absolute top-full left-0 bg-white rounded-xl shadow-lg border border-gray-100 w-full mt-2 z-50 overflow-hidden">
                            {result.map((item) => (
                                <Link
                                    href={`/saat-kac/${item.slug}`}
                                    key={item.slug}
                                    className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                                    onClick={() => {
                                        setShowAutoComplete(false);
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-900">{item.name}</span>
                                    </div>
                                    <time className="font-bold text-primary">
                                        {new Intl.DateTimeFormat("tr-TR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hourCycle: "h23",
                                            timeZone: item.timezone
                                        }).format(new Date(item?.time || "2025-04-08T22:41:23+03:00"))}
                                    </time>
                                </Link>
                            ))}
                        </div>
                    ) : showAutoComplete && query.trim() !== "" && error ? (
                        <div ref={suggestionRef} className="absolute top-full left-0 bg-white rounded-xl shadow-lg border border-gray-100 w-full mt-2 z-50 p-4">
                            <div className="flex items-center gap-3 text-gray-500">
                                <FiX className="w-5 h-5 text-gray-400" />
                                <span>{query} aramanız için bir sonuç bulunamadı</span>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
