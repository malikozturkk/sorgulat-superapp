"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import SearchForm from "../Timezone/SearchForm"

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const itemStyle = "text-base font-medium text-black transition-all duration-200 hover:text-primary focus:text-primary"
    const items = [
        { href: "/", title: "Anasayfa" },
        { href: "/saat-kac", title: "Saat Kaç" },
        { href: "/pasaport", title: "Pasaport" },
        { href: "/saat-kac/fark", title: "Saat Farkı" },
        { href: "/blog", title: "Blog" },
    ];
    return (
        <header className={`${open ? "pb-6" : ""} bg-white lg:pb-0 mb-3 md:mb-5`}>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between relative">
                    <Link href="/" title="Logo" className="flex-shrink-0 py-5 flex font-semibold text-xl">
                        <Image src="/icons/logo.svg" width={173.5} height={58.5} className="w-[86.75px] h-[29.25px] md:w-[173.5px] md:h-[58.5px]" alt="Sorgulat Logo" />
                    </Link>

                    <div>
                        <SearchForm />
                        <button
                        onClick={() => setOpen(!open)}
                        type="button"
                        className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-[#f3f4f6] hover:bg-[#f3f4f6]"
                        aria-label="Menüyü aç/kapat"
                        >
                        <svg
                            width={20}
                            height={20}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#646ecb"
                            color="#646ecb"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                        </svg>
                        </button>

                    </div>
                    <div className="hidden lg:flex lg:items-center lg:space-x-10">
                        {items.map((item, index) => (
                            <Link key={index} href={item.href} title={item.title} className={itemStyle}>
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </nav>

                {open &&
                    <nav className="pt-4 pb-6 mt-3 bg-white border border-primary rounded-md shadow-md lg:hidden">
                        <div className="flow-root">
                            <div className="flex flex-col px-6 -my-2 space-y-1">
                                {items.map((item, index) => (
                                    <Link key={index} href={item.href} title={item.title} className={itemStyle}>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                }
            </div>
        </header>

    )
}

export default Navbar