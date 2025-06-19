"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import SearchForm from "../Timezone/SearchForm"

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const itemStyle = "text-base font-medium text-gray-700 transition-all duration-200 hover:text-primary focus:text-primary relative group"
    const items = [
        { href: "/egitim/universiteler", title: "Üniversiteler", isNew: false },
        { href: "/egitim/tercih-robotu", title: "YKS Tercih Robotu", isNew: true },
        { href: "/saat-kac", title: "Saat Kaç" },
        { href: "/pasaport", title: "Pasaport" },
        { href: "/saat-kac/fark", title: "Saat Farkı" },
        { href: "/blog", title: "Blog" },
    ];
    
    return (
        <header className={`${open ? "pb-6" : ""} bg-gradient-to-r from-white via-gray-50 to-white lg:pb-0 mb-3 md:mb-5 shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95`}>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between relative py-4">
                    <Link href="/" title="Logo" className="flex-shrink-0 flex font-semibold text-xl group">
                        <div className="relative">
                            <Image 
                                src="/icons/logo.svg" 
                                width={173.5} 
                                height={58.5} 
                                className="w-[86.75px] h-[29.25px] md:w-[173.5px] md:h-[58.5px] transition-transform duration-200 group-hover:scale-105" 
                                alt="Sorgulat Logo" 
                            />
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <SearchForm />
                        </div>
                        <button
                            onClick={() => setOpen(!open)}
                            type="button"
                            className="inline-flex p-3 text-gray-700 transition-all duration-200 rounded-xl lg:hidden focus:bg-gray-100 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                            aria-label="Menüyü aç/kapat"
                        >
                            <svg
                                width={20}
                                height={20}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="hidden lg:flex lg:items-center lg:space-x-8">
                        {items.map((item, index) => (
                            <Link 
                                key={index} 
                                href={item.href} 
                                title={item.title} 
                                className={`${itemStyle} px-4 py-2 rounded-lg hover:bg-gray-50 hover:shadow-sm relative`}
                            >
                                {item.title}
                                {item.isNew && (
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-pulse">
                                        Yeni
                                    </span>
                                )}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>
                </nav>

                {open && (
                    <nav className="pt-4 pb-6 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg lg:hidden backdrop-blur-sm">
                        <div className="flow-root">
                            <div className="flex flex-col px-6 -my-2 space-y-2">
                                <div className="md:hidden mb-4">
                                    <SearchForm />
                                </div>
                                {items.map((item, index) => (
                                    <Link 
                                        key={index} 
                                        href={item.href} 
                                        title={item.title} 
                                        className={`${itemStyle} px-4 py-3 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all duration-200 relative`}
                                        onClick={() => setOpen(false)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.title}
                                            {item.isNew && (
                                                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-pulse">
                                                    Yeni
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Navbar