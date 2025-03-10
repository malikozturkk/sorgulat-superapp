import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { defaultMetadata, metadataConfig } from "./metadataConfig";
import AdSense from "@/components/AdSense";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <AdSense pId="4912331234184158" />
      </head>
      <body>
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
      title: 'Saat Kaç | Sorgulat',
      description: 'Dünyadaki binlerce lokasyon için atomik saate göre senkronize olmuş en doğru yerel saat bilgisi.',
      url: 'https://www.sorgulat.com',
      images:
        '/images/open-graph.png',
      type: 'website',
      siteName: 'Sorgulat',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sorgulat | Saat Kaç',
      description: 'Dünyadaki binlerce lokasyon için atomik saate göre senkronize olmuş en doğru yerel saat bilgisi.',
      images: '/images/open-graph.png',
      site: '@Sorgulat',
    },
    alternates: {
      canonical: "/images/open-graph.png",
      types: {
        "application/opensearchdescription+xml": "/opensearch.xml",
        "application/rss+xml": "https://sorgulat.com/rss.xml",
      },
    },
  }
}

