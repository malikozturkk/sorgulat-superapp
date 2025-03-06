"use client";
import { handleClickOutside } from "@/hooks/useClickOutside";
import useDebounce from "@/hooks/useDebounce";
import { getRequest } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface SearchResponse {
    name: string;
    slug: string;
    time: string;
    timezone: string;
    error?: string
}

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

    return (
        <>
            <button
                onClick={() => setShowInput(true)}
                className="lg:hidden inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-[#f3f4f6] hover:bg-[#f3f4f6]">
                <Image src="/icons/icon.svg" alt="Sorgulat Icon" width={41} height={40} />
                {showInput &&
                    <div className="w-full absolute left-0 top-5">
                        <div className="absolute top-1/2 -translate-y-1/2 transform left-3">
                            <Image src="/icons/icon.svg" alt="Sorgulat Icon" width={21} height={20} />
                        </div>
                        <input
                            placeholder="Şehir veya Ülke Ara"
                            ref={inputRef}
                            className="px-8 pl-9 font-semibold border-2 border-primary rounded h-12 bg-white outline-primary text-primary placeholder-primary text-sm w-full"
                            type="text"
                            value={query}
                            onChange={handleChange}
                            onClick={() => setShowAutoComplete(true)}
                        />
                        {result?.length > 0 && showAutoComplete ? (
                            <div ref={suggestionRef} className="absolute top-12 left-0 bg-white text-black rounded-md shadow-md w-full z-50 " style={{ opacity: ".95" }}>
                                {result.map((item) => (
                                    <Link
                                        href={`/saat-kac/${item.slug}`}
                                        key={item.slug}
                                        className="flex justify-between items-center p-2 last:border-b-0 bg-[#333] text-white border-t border-b border-white hover:bg-primary duration-150"
                                    >
                                        <span>{item.name}</span>
                                        <time>
                                            {new Intl.DateTimeFormat("tr-TR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hourCycle: "h23",
                                                timeZone: item.timezone
                                            }).format(new Date(item.time))}
                                        </time>
                                    </Link>
                                ))}

                            </div>
                        ) : showAutoComplete && query.trim() !== "" && error ?
                            <div ref={suggestionRef} className="absolute top-12 left-0 bg-white text-black rounded-md shadow-md w-full z-50 " style={{ opacity: ".95" }}>
                                <span className="flex justify-between items-center p-2 last:border-b-0 bg-[#333] text-white border-t border-b border-white hover:bg-primary duration-150">{query} aramanız için bir sonuç bulunamadı</span>
                            </div>
                            : null
                        }
                    </div>
                }
            </button>
            <div className="relative hidden lg:block">
                <div className="absolute top-1/2 -translate-y-1/2 transform left-3">
                    <Image src="/icons/icon.svg" alt="Sorgulat Icon" width={21} height={20} />
                </div>
                <input
                    placeholder="Şehir veya Ülke Ara"
                    ref={inputRef}
                    className="px-8 pl-9 font-semibold border-2 border-primary rounded h-12 bg-white outline-primary text-primary placeholder-primary text-sm w-96"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onClick={() => setShowAutoComplete(true)}
                />
                {result?.length > 0 && showAutoComplete ? (
                    <div ref={suggestionRef} className="absolute top-12 left-0 bg-white text-black rounded-md shadow-md w-96 z-50 " style={{ opacity: ".95" }}>
                        {result.map((item) => (
                            <Link
                                href={`/saat-kac/${item.slug}`}
                                key={item.slug}
                                className="flex justify-between items-center p-2 last:border-b-0 bg-[#333] text-white border-t border-b border-white hover:bg-primary duration-150"
                                onClick={() => {
                                    setShowAutoComplete(false)
                                }}
                            >
                                <span>{item.name}</span>
                                <time>
                                    {new Intl.DateTimeFormat("tr-TR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hourCycle: "h23",
                                        timeZone: item.timezone
                                    }).format(new Date(item.time))}
                                </time>
                            </Link>
                        ))}

                    </div>
                ) : showAutoComplete && query.trim() !== "" && error ?
                    <div ref={suggestionRef} className="absolute top-12 left-0 bg-white text-black rounded-md shadow-md w-96 z-50 " style={{ opacity: ".95" }}>
                        <span className="flex justify-between items-center p-2 last:border-b-0 bg-[#333] text-white border-t border-b border-white hover:bg-primary duration-150">{query} aramanız için bir sonuç bulunamadı</span>
                    </div>
                    : null
                }
            </div>
        </>
    );
}
