import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'YKS Tercih Robotu - Üniversiteleri Bize Sorgulatın!',
    description: 'YKS tercih robotu ile size en uygun üniversite ve bölümleri keşfedin. Puan, sıralama, şehir ve bölüm filtreleri ile kişiselleştirilmiş tercih önerileri alın. YKS tercih sürecinizi kolaylaştırın!',
    keywords: [
        'YKS tercih robotu',
        'üniversite tercih robotu',
        'YKS tercih',
        'üniversite seçimi',
        'bölüm tercihi',
        'puan hesaplama',
        'sıralama hesaplama',
        'üniversite puanları',
        'tercih rehberi',
        'üniversite bölümleri',
        'YKS sonuçları',
        'üniversite yerleştirme',
        'tercih danışmanlığı',
        'üniversite karşılaştırma',
        'bölüm puanları',
        'üniversite şehirleri'
    ],
    authors: [{ name: 'Sorgulat' }],
    creator: 'Sorgulat',
    publisher: 'Sorgulat',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://sorgulat.com'),
    alternates: {
        canonical: '/egitim/tercih-robotu',
    },
    openGraph: {
        title: 'YKS Tercih Robotu - Size En Uygun Üniversiteyi Bulun',
        description: 'YKS tercih robotu ile size en uygun üniversite ve bölümleri keşfedin. Puan, sıralama, şehir ve bölüm filtreleri ile kişiselleştirilmiş tercih önerileri alın.',
        url: 'https://sorgulat.com/egitim/tercih-robotu',
        siteName: 'Sorgulat',
        images: [
            {
                url: "/images/openGraph/yks-bot.png",
                alt: 'YKS Tercih Robotu - Size En Uygun Üniversiteyi Bulun',
            },
            {
                url: "/images/openGraph/yks-bot-result.png",
                alt: 'YKS Tercih Robotu - Size En Uygun Üniversiteyi Bulun',
            },
        ],
        locale: 'tr_TR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YKS Tercih Robotu - Size En Uygun Üniversiteyi Bulun',
        description: 'YKS tercih robotu ile size en uygun üniversite ve bölümleri keşfedin. Puan, sıralama, şehir ve bölüm filtreleri ile kişiselleştirilmiş tercih önerileri alın.',
        images: "/images/openGraph/yks-bot.png",
        creator: '@sorgulat',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        yandex: '96dd6c199b3f276d',
    },
    category: 'education',
    classification: 'University Selection Tool',
    other: {
        'application-name': 'YKS Tercih Robotu',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'YKS Tercih Robotu',
        'msapplication-TileColor': '#646ecb',
        'msapplication-config': '/browserconfig.xml',
        'theme-color': '#646ecb',
    },
};

export default function TercihRobotuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 