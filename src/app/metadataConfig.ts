export const defaultMetadata = {
    title: 'Saat Kaç | Sorgulat',
    description: 'Dünyadaki binlerce lokasyon için atomik saate göre senkronize olmuş en doğru yerel saat bilgisi.',
    robots: "index, follow",
    keywords: 'saat kaç?, sorgulat, sorgula, sorgu, saati sorgulat, hangi yıldayız, saat kaç, sorgulat.com',
    authors: [
        {
            name: 'Sorgulat Anasayfa',
            url: 'https://www.sorgulat.com',
        },
    ],
    icon: '/favicon.ico',
}

export const defaultGenerateMetadata = () => {
    return {
        title: defaultMetadata?.title,
        description: defaultMetadata?.description,
        robots: "index, follow",
        icons: defaultMetadata?.icon,
        authors: [
            {
                name: defaultMetadata?.authors[0]?.name,
                url: defaultMetadata?.authors[0]?.url,
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

export const metadataConfig = {
    '/saat-kac': {
        title: 'Saat Kaç | Sorgulat',
        description: 'Dünyadaki binlerce lokasyon için atomik saate göre senkronize olmuş en doğru yerel saat bilgisi.',
        robots: "index, follow",
        keywords: 'saat kaç?, sorgulat, sorgula, sorgu, saati sorgulat, hangi yıldayız, saat kaç, sorgulat.com',
        authors: [
            {
                name: 'Saat Kaç | Sorgulat',
                url: 'https://www.sorgulat.com',
            },
        ],
        icon: '/favicon.ico',
    },
}
