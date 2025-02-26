import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AdSense from "@/components/AdSense";
import { defaultMetadata, metadataConfig } from "./metadataConfig";

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
      </body>
    </html >
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const slug = params.slug || ''
  const pathname = slug ? `/${slug}` : '/'
  const metadata = metadataConfig[pathname as keyof typeof metadataConfig] || defaultMetadata
  return {
    title: metadata?.title,
    description: metadata?.description,
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

