import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { defaultMetadata, metadataConfig } from "./metadataConfig";
import AdSense from "@/components/AdSense";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <AdSense pId="4912331234184158" />
      <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700&display=swap"
          rel="stylesheet"
        />
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-1VTVJYYXQR"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Consent mode setup
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'personalization_storage': 'denied',
            'functionality_storage': 'denied',
            'security_storage': 'granted'
          });
          
          gtag('config', 'G-1VTVJYYXQR', {
            'anonymize_ip': true,
            'allow_google_signals': false,
            'allow_ad_personalization_signals': false,
            'restricted_data_processing': true
          });
        `}
      </Script>
      </head>
      <body className="font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html >
  );
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug || ''
  const pathname = slug ? `/${slug}` : '/'
  const metadata = metadataConfig[pathname as keyof typeof metadataConfig] || defaultMetadata
  return {
    metadataBase: new URL('https://sorgulat.com/'),
    title: metadata?.title,
    description: metadata?.description,
    robots: "index, follow",
    icons: {
      icon: metadata?.icon,
      apple: metadata?.icon,
    },
    authors: [
      {
        name: metadata?.authors[0]?.name,
        url: metadata?.authors[0]?.url,
      },
    ],
    openGraph: {
      title: metadata?.openGraph?.title || 'Saat Kaç | Sorgulat',
      description: metadata?.openGraph?.description || 'Dünyadaki binlerce lokasyon için atomik saate göre senkronize olmuş en doğru yerel saat bilgisi.',
      url: metadata?.openGraph?.url || 'https://www.sorgulat.com',
      images: metadata?.openGraph?.images || '/images/openGraph/time.png',
      type: metadata?.openGraph?.type || 'website',
      siteName: metadata?.openGraph?.siteName || 'Sorgulat',
    },
    twitter: {
      card: metadata?.twitter?.card || 'summary_large_image',
      title: metadata?.twitter?.title || 'Sorgulat | Saat Kaç',
      description: metadata?.twitter?.description || 'Dünyadaki binlerce lokasyon için atomik saate göre senkronize olmuş en doğru yerel saat bilgisi.',
      images: metadata?.twitter?.images || '/images/openGraph/time.png',
      site: metadata?.twitter?.site || '@Sorgulat',
    },
    alternates: {
      canonical: metadata?.alternates?.canonical || "/",
      types: metadata?.alternates?.types ||  {
        "application/opensearchdescription+xml": "/opensearch.xml",
        "application/rss+xml": "https://sorgulat.com/rss.xml",
      },
    },
  }
}

