import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Üniversite Tercih Robotu - Üniversiteleri Bize Sorgulatın!',
    description: 'Üniversite tercih robotu ile size en uygun üniversite ve bölümleri keşfedin. Puan, sıralama, şehir ve bölüm filtreleri ile kişiselleştirilmiş tercih önerileri alın. YKS tercih sürecinizi kolaylaştırın!',
    keywords: [
        'üniversite tercih robotu',
        'YKS tercih robotu',
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
        title: 'Üniversite Tercih Robotu - Size En Uygun Üniversiteyi Bulun',
        description: 'Üniversite tercih robotu ile size en uygun üniversite ve bölümleri keşfedin. Puan, sıralama, şehir ve bölüm filtreleri ile kişiselleştirilmiş tercih önerileri alın.',
        url: 'https://sorgulat.com/egitim/tercih-robotu',
        siteName: 'Sorgulat',
        images: [
            {
                url: '/images/tercih-robotu-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Üniversite Tercih Robotu - Size En Uygun Üniversiteyi Bulun',
            },
        ],
        locale: 'tr_TR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Üniversite Tercih Robotu - Size En Uygun Üniversiteyi Bulun',
        description: 'Üniversite tercih robotu ile size en uygun üniversite ve bölümleri keşfedin. Puan, sıralama, şehir ve bölüm filtreleri ile kişiselleştirilmiş tercih önerileri alın.',
        images: ['/images/tercih-robotu-twitter.jpg'],
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
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
    },
    category: 'education',
    classification: 'University Selection Tool',
    other: {
        'application-name': 'Sorgulat Üniversite Tercih Robotu',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Tercih Robotu',
        'msapplication-TileColor': '#3B82F6',
        'msapplication-config': '/browserconfig.xml',
        'theme-color': '#3B82F6',
    },
};

export default function TercihRobotuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 