"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useRef, useEffect } from "react"
import SearchForm from "../Timezone/SearchForm"
import { FaUniversity } from "react-icons/fa";
import { FiClock, FiBookOpen, FiTrendingUp, FiGlobe, FiX } from "react-icons/fi";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi"

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const itemStyle = "text-base font-medium text-gray-700 transition-all duration-200 hover:text-primary focus:text-primary relative group"
    const mainItems = [
        { href: "/egitim/universiteler", title: "Üniversiteler", icon: <FaUniversity className="inline mr-2 text-primary" />, isNew: true },
        { href: "/egitim/tercih-robotu", title: "YKS Tercih Robotu", icon: <FiTrendingUp className="inline mr-2 text-primary" />, isNew: true },
        { href: "/saat-kac", title: "Saat Kaç", icon: <FiClock className="inline mr-2 text-primary" />, isNew: false },
        { href: "/saat-kac/fark", title: "Saat Farkı", icon: <FiGlobe className="inline mr-2 text-primary" />, isNew: false },
    ];
    const otherItems = [
        { href: "/blog", title: "Blog", icon: <FiBookOpen className="inline mr-2 text-primary" />, isNew: false },
        { href: "/pasaport", title: "Pasaport", icon: <FiGlobe className="inline mr-2 text-primary" />, isNew: false },
    ];
    
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const dropdownParentRef = useRef<HTMLDivElement>(null);
    const [dropdownAlignRight, setDropdownAlignRight] = React.useState(false);

    useEffect(() => {
        function handleDropdownPosition() {
            if (!dropdownMenuRef.current || !dropdownParentRef.current) return;
            const menuRect = dropdownMenuRef.current.getBoundingClientRect();
            const parentRect = dropdownParentRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            if (parentRect.left + menuRect.width > viewportWidth) {
                setDropdownAlignRight(true);
            } else {
                setDropdownAlignRight(false);
            }
        }
        if (typeof window !== "undefined" && window.innerWidth >= 1024) {
            handleDropdownPosition();
            window.addEventListener("resize", handleDropdownPosition);
            return () => window.removeEventListener("resize", handleDropdownPosition);
        }
    }, [open]);

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

                    <div className="flex items-center gap-3 sm:gap-4">
                        <SearchForm />
                        <button
                            onClick={() => setOpen(!open)}
                            type="button"
                            className="inline-flex p-2 sm:p-3 text-gray-700 transition-all duration-200 rounded-xl lg:hidden focus:bg-gray-100 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                            aria-label="Menüyü aç/kapat"
                        >
                            {open ? (
                                <FiX className="transition-transform duration-200" />
                            ) : (
                                <GiHamburgerMenu className="transition-transform duration-200" />
                            )}
                        </button>
                    </div>
                    
                    <div className="hidden lg:flex lg:items-center lg:space-x-2">
                        {mainItems.map((item, index) => (
                            <Link 
                                key={index} 
                                href={item.href} 
                                title={item.title} 
                                className={`${itemStyle} px-4 py-2 rounded-lg hover:bg-gray-50 hover:shadow-sm relative flex items-center`}
                            >
                                {item.icon}
                                {item.title}
                                {item.isNew && (
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-pulse">
                                        Yeni
                                    </span>
                                )}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                        ))}
                        <div className="relative group dropdown-parent" ref={dropdownParentRef}>
                            <button className={`${itemStyle} px-4 py-2 rounded-lg hover:bg-gray-50 hover:shadow-sm flex items-center`} tabIndex={0}>
                                <MdOutlineMoreHoriz className="inline mr-2 text-primary text-lg" />
                                Diğer
                            </button>
                            <div
                                ref={dropdownMenuRef}
                                className={`dropdown-menu absolute mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 z-50 p-2 ${dropdownAlignRight ? "right-0 left-auto" : "left-0 right-auto"}`}
                                tabIndex={-1}
                            >
                                <div className="flex flex-col gap-1">
                                    {otherItems.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            title={item.title}
                                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-all duration-200 text-base"
                                        >
                                            {item.icon}
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {open && (
                    <nav className="pt-4 pb-6 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg lg:hidden backdrop-blur-sm">
                        <div className="flow-root">
                            <div className="flex flex-col px-2 sm:px-6 -my-2 space-y-2">
                                {[...mainItems, ...otherItems].map((item, index) => (
                                    <Link 
                                        key={index} 
                                        href={item.href} 
                                        title={item.title} 
                                        className={`${itemStyle} px-4 py-3 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all duration-200 relative flex items-center`}
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.icon}
                                        {item.title}
                                        {item.isNew && (
                                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-pulse ml-2">
                                                Yeni
                                            </span>
                                        )}
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