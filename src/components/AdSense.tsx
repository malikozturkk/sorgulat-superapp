import Script from "next/script"
import React from "react"

type AdsenseTypes = {
    pId: string
    className?: string
    style?: React.CSSProperties
}

const AdSense = ({ pId, className = "", style }: AdsenseTypes) => {
    return (
        <>
            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
            <div 
                className={`adsbygoogle-container ${className}`}
                style={{
                    minHeight: '280px',
                    width: '100%',
                    ...style
                }}
                aria-label="Reklam alanı"
            >
                <ins 
                    className="adsbygoogle"
                    style={{ 
                        display: 'block',
                        minHeight: '280px',
                        width: '100%'
                    }}
                    data-ad-client={`ca-pub-${pId}`}
                    data-ad-slot="auto"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </>
    )
}

export default AdSense