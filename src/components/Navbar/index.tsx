"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const itemStyle = "text-base font-medium text-black transition-all duration-200 hover:text-primary focus:text-primary"
    const items = [
        { href: "/", title: "Anasayfa" },
        { href: "/saat-kac", title: "Saat Kaç ?" },
        { href: "/iftara-ne-kadar-kaldi", title: "İftara Ne Kadar Kaldı ?" },
        { href: "/akaryakit-fiyatlari", title: "Akaryakıt Fiyatları" },
    ];
    return (
        <header className={`${open ? "pb-6" : ""} bg-white lg:pb-0 mb-3 md:mb-5`}>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between">
                    <Link href="/" title="Logo" className="flex-shrink-0 p-5 flex font-semibold text-xl">
                        <Image src="/icons/logo.svg" width={173.5} height={58.5} alt="Sorgulat Logo" />
                    </Link>

                    <button onClick={() => setOpen(!open)} type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-[#f3f4f6] hover:bg-[#f3f4f6]">
                        <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                        </svg>

                        <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
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