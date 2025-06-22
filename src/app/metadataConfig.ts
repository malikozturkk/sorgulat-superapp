interface MetadataConfig {
    title: string;
    description: string;
    robots: string;
    keywords: string;
    authors: { name: string; url: string }[];
    icon: string;
    openGraph?: {
      title: string;
      description: string;
      url: string;
      images: string;
      type: 'website' | 'article';
      siteName: string;
    };
    twitter?: {
      card: 'summary_large_image' | 'summary' | 'player' | 'app';
      title: string;
      description: string;
      images: string;
      site: string;
    };
    alternates?: {
      canonical: string;
      types: Record<string, string>;
    };
    verification?: {
        yandex?: string
        google?: string
    },
    other?: any
  }

export const defaultMetadata = {
    title: 'Sayfa Bulunamadı | Sorgulat',
    description: 'Aradığınız sayfa bulunamadı. Sorgulat.com ile saat bilgisi, vizesiz ülkeler ve seyahat rehberlerine ulaşabilirsiniz.',
    robots: "noindex, follow",
    keywords: '404, sayfa bulunamadı, hata, sorgulat, seyahat rehberi',
    authors: [
        {
            name: 'Sorgulat',
            url: 'https://www.sorgulat.com',
        },
    ],
    icon: '/favicon.ico',
}

export const defaultGenerateMetadata = () => {
    return {
        title: defaultMetadata?.title,
        description: defaultMetadata?.description,
        robots: "noindex, follow",
        icons: defaultMetadata?.icon,
        authors: defaultMetadata?.authors,
        openGraph: {
            title: 'Sayfa Bulunamadı | Sorgulat',
            description: 'Aradığınız sayfa bulunamadı. Sorgulat.com ile saat bilgisi, vizesiz ülkeler ve seyahat rehberlerine ulaşabilirsiniz.',
            url: 'https://www.sorgulat.com',
            images: '/images/openGraph/404.png',
            type: 'website',
            siteName: 'Sorgulat',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Sayfa Bulunamadı | Sorgulat',
            description: 'Aradığınız sayfa bulunamadı. Sorgulat.com ile saat bilgisi, vizesiz ülkeler ve seyahat rehberlerine ulaşabilirsiniz.',
            images: '/images/openGraph/404.png',
            site: '@Sorgulat',
        },
        alternates: {
            canonical: '/', 
        },
    }
}

export const metadataConfig: Record<string, MetadataConfig> = {
    "/": {
        title: "Anasayfa | Sorgulat",
        description: "Dünyanın saatini, vizelerini ve seyahat rehberlerini keşfedin! Anlık saat bilgileri, vize gereklilikleri ve kapsamlı seyahat rehberleriyle yolculuğunuzu planlayın.",
        robots: "index, follow",
        keywords: "saat kaç, dünya saatleri, vize gereklilikleri, vizesiz ülkeler, kapıda vize, seyahat rehberi, yurtdışı seyahat, pasaport bilgileri",
        authors: [
            {
                "name": "Sorgulat",
                "url": "https://www.sorgulat.com"
            }
        ],
        icon: "/favicon.ico",
        openGraph: {
            title: "Anasayfa | Sorgulat",
            description: "Dünyanın saatini, vizelerini ve seyahat rehberlerini keşfedin! Anlık saat bilgileri, vize gereklilikleri ve kapsamlı seyahat rehberleriyle yolculuğunuzu planlayın.",
            url: "https://www.sorgulat.com",
            images: "/images/openGraph/home.png",
            type: "website",
            siteName: "Sorgulat"
        },
        twitter: {
            card: "summary_large_image",
            title: "Anasayfa | Sorgulat",
            description: "Dünyanın saatini, vizelerini ve seyahat rehberlerini keşfedin! Anlık saat bilgileri, vize gereklilikleri ve kapsamlı seyahat rehberleriyle yolculuğunuzu planlayın.",
            images: "/images/openGraph/home.png",
            site: "@Sorgulat"
        },
        alternates: {
            canonical: "/",
            types: {
                "application/opensearchdescription+xml": "/opensearch.xml",
                "application/rss+xml": "https://sorgulat.com/rss.xml"
            }
        },
        verification: {
            yandex: '96dd6c199b3f276d',
        },
        other: {
            'application-name': 'Anasayfa',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': 'Anasayfa',
            'msapplication-TileColor': '#646ecb',
            'msapplication-config': '/browserconfig.xml',
            'theme-color': '#646ecb',
        },
    },
    '/saat-kac': {
        title: 'Saat Kaç | Sorgulat',
        description: 'Dünyadaki binlerce lokasyon için atomik saate göre senkronize olmuş en doğru yerel saat bilgisi.',
        robots: "index, follow",
        keywords: 'saat kaç?, sorgulat, sorgula, sorgu, saati sorgulat, hangi yıldayız, saat kaç, sorgulat.com',
        openGraph: {
            title: 'Saat Kaç | Sorgulat',
            description: 'Dünyadaki binlerce lokasyon için atomik saate göre senkronize olmuş en doğru yerel saat bilgisi.',
            url: 'https://www.sorgulat.com/saat-kac',
            images: '/images/openGraph/time.png',
            type: 'website',
            siteName: 'Sorgulat',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Saat Kaç | Sorgulat',
            description: 'Dünyadaki binlerce lokasyon için atomik saate göre senkronize olmuş en doğru yerel saat bilgisi.',
            images: '/images/openGraph/time.png',
            site: '@Sorgulat',
        },
        authors: [
            {
                name: 'Saat Kaç | Sorgulat',
                url: 'https://www.sorgulat.com',
            },
        ],
        icon: '/favicon.ico',
        verification: {
            yandex: '96dd6c199b3f276d',
        },
        other: {
            'application-name': 'Saat Kaç',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': 'Saat Kaç',
            'msapplication-TileColor': '#646ecb',
            'msapplication-config': '/browserconfig.xml',
            'theme-color': '#646ecb',
        },
    },
    '/gizlilik': {
        title: 'Gizlilik Koşulları | Sorgulat',
        description: 'Kullanım şartları / Gizlilik politikası / Reklam Politikası | Sorgulat',
        robots: "index, follow",
        keywords: 'saat kaç?, sorgulat, sorgula, sorgu, saati sorgulat, hangi yıldayız, saat kaç, sorgulat.com, gizlilik kosullari, gizlilik koşulları, sorgulat gizlilik koşulları',
        authors: [
            {
                name: 'Gizlilik Koşulları | Sorgulat',
                url: 'https://www.sorgulat.com/gizlilik',
            },
        ],
        icon: '/favicon.ico',
        openGraph: {
            title: 'Gizlilik Koşulları | Sorgulat',
            description: 'Kullanım şartları / Gizlilik politikası / Reklam Politikası | Sorgulat',
            url: 'https://www.sorgulat.com/gizlilik',
            images:
              '/images/openGraph/privacy.png',
            type: 'website',
            siteName: 'Sorgulat',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'Gizlilik Koşulları | Sorgulat',
            description: 'Kullanım şartları / Gizlilik politikası / Reklam Politikası | Sorgulat',
            images: '/images/openGraph/privacy.png',
            site: '@Sorgulat',
          },
          alternates: {
            canonical: "/gizlilik",
            types: {
              "application/opensearchdescription+xml": "/opensearch.xml",
              "application/rss+xml": "https://sorgulat.com/rss.xml",
            },
          },
          verification: {
            yandex: '96dd6c199b3f276d',
        },
        other: {
            'application-name': 'Gizlilik',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': 'Gizlilik',
            'msapplication-TileColor': '#646ecb',
            'msapplication-config': '/browserconfig.xml',
            'theme-color': '#646ecb',
        },
    },
    '/iletisim': {
        title: 'İletişim | Sorgulat',
        description: 'İletişim | Sorgulat',
        robots: "index, follow",
        keywords: 'saat kaç?, sorgulat, sorgula, sorgu, saati sorgulat, hangi yıldayız, saat kaç, sorgulat.com, iletisim, iletişim, sorgulat iletişim',
        authors: [
            {
                name: 'İletişim | Sorgulat',
                url: 'https://www.sorgulat.com/iletisim',
            },
        ],
        icon: '/favicon.ico',
        openGraph: {
            title: 'İletişim | Sorgulat',
            description: 'İletişim | Sorgulat',
            url: 'https://www.sorgulat.com/iletisim',
            images:
              '/images/openGraph/contact.png',
            type: 'website',
            siteName: 'Sorgulat',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'İletişim | Sorgulat',
            description: 'İletişim | Sorgulat',
            images: '/images/openGraph/contact.png',
            site: '@Sorgulat',
          },
          alternates: {
            canonical: "/iletisim",
            types: {
              "application/opensearchdescription+xml": "/opensearch.xml",
              "application/rss+xml": "https://sorgulat.com/rss.xml",
            },
          },
          verification: {
            yandex: '96dd6c199b3f276d',
        },
        other: {
            'application-name': 'İletişim',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': 'İletişim',
            'msapplication-TileColor': '#646ecb',
            'msapplication-config': '/browserconfig.xml',
            'theme-color': '#646ecb',
        },
    },
    "/pasaport": {
        title: "Pasaport Vize Durumu | Sorgulat",
        description: "Türkiye pasaportu ile hangi ülkelerin vize istediğini, istemediğini, kapıda vize verdiğini veya eTA gerektirdiğini dünya haritası üzerinden öğrenin.",
        robots: "index, follow",
        keywords: "Türkiye pasaportu vize durumu, vizesiz ülkeler, vize gerekli ülkeler, kapıda vize, eTA ile giriş, dünya haritası pasaport durumu, pasaport vize bilgileri",
        authors: [
            {
                name: "Pasaport Vize Durumu | Sorgulat",
                url: "https://www.sorgulat.com/pasaport"
            }
        ],
        icon: "/favicon.ico",
        openGraph: {
            title: "Pasaport Vize Durumu | Sorgulat",
            description: "Türkiye pasaportu ile dünya genelindeki vize durumlarını kolayca öğrenin. Vizesiz, vize gerekli, kapıda vize ve eTA bilgilerini görün.",
            url: "https://www.sorgulat.com/pasaport",
            images: "/images/openGraph/passport.png",
            type: "website",
            siteName: "Sorgulat"
        },
        twitter: {
            card: "summary_large_image",
            title: "Pasaport Vize Durumu | Sorgulat",
            description: "Türkiye pasaportu ile dünya genelindeki vize durumlarını kolayca öğrenin.",
            images: "/images/openGraph/passport.png",
            site: "@Sorgulat"
        },
        alternates: {
            canonical: "/pasaport",
            types: {
                "application/opensearchdescription+xml": "/opensearch.xml",
                "application/rss+xml": "https://sorgulat.com/rss.xml"
            }
        },
        verification: {
            yandex: '96dd6c199b3f276d',
        },
        other: {
            'application-name': 'Pasaport',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': 'Pasaport',
            'msapplication-TileColor': '#646ecb',
            'msapplication-config': '/browserconfig.xml',
            'theme-color': '#646ecb',
        },
    },
    "/blog": {
        title: "Blog | Sorgulat",
        description: "En güncel ve detaylı analizlerle vize durumları, seyahat rehberleri ve pasaport bilgileri hakkında bilgi edinin.",
        robots: "index, follow",
        keywords: "vize rehberi, seyahat ipuçları, pasaport bilgileri, vizesiz ülkeler, eTA gereklilikleri, yurtdışı seyahat, vize başvurusu",
        authors: [
            {
                name: "Blog | Sorgulat",
                url: "https://www.sorgulat.com/blog"
            }
        ],
        icon: "/favicon.ico",
        openGraph: {
            title: "Blog | Sorgulat",
            description: "Vize, pasaport ve seyahat rehberleri hakkında en güncel içeriklere ulaşın.",
            url: "https://www.sorgulat.com/blog",
            images: "/images/openGraph/blog.png",
            type: "website",
            siteName: "Sorgulat"
        },
        twitter: {
            card: "summary_large_image",
            title: "Blog | Sorgulat",
            description: "Vize, pasaport ve seyahat rehberleri hakkında en güncel içeriklere ulaşın.",
            images: "/images/openGraph/blog.png",
            site: "@Sorgulat"
        },
        alternates: {
            canonical: "/blog",
            types: {
                "application/opensearchdescription+xml": "/opensearch.xml",
                "application/rss+xml": "https://sorgulat.com/rss.xml"
            }
        },
        verification: {
            yandex: '96dd6c199b3f276d',
        },
        other: {
            'application-name': 'Blog',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': 'Blog',
            'msapplication-TileColor': '#646ecb',
            'msapplication-config': '/browserconfig.xml',
            'theme-color': '#646ecb',
        },
    },
    "/pasaport-blog": {
        title: "Pasaport Blog Rehberi | Sorgulat",
        description: "En güncel ve detaylı analizlerle vize durumları, seyahat rehberleri ve pasaport bilgileri hakkında bilgi edinin.",
        robots: "index, follow",
        keywords: "vize rehberi, seyahat ipuçları, pasaport bilgileri, vizesiz ülkeler, eTA gereklilikleri, yurtdışı seyahat, vize başvurusu",
        authors: [
            {
                name: "Blog | Sorgulat",
                url: "https://www.sorgulat.com/blog"
            }
        ],
        icon: "/favicon.ico",
        openGraph: {
            title: "Pasaport Blog Rehberi | Sorgulat",
            description: "Vize, pasaport ve seyahat rehberleri hakkında en güncel içeriklere ulaşın.",
            url: "https://www.sorgulat.com/blog",
            images: "/images/openGraph/blog.png",
            type: "website",
            siteName: "Sorgulat"
        },
        twitter: {
            card: "summary_large_image",
            title: "Pasaport Blog Rehberi | Sorgulat",
            description: "Vize, pasaport ve seyahat rehberleri hakkında en güncel içeriklere ulaşın.",
            images: "/images/openGraph/blog.png",
            site: "@Sorgulat"
        },
        alternates: {
            canonical: "/pasaport-blog",
            types: {
                "application/opensearchdescription+xml": "/opensearch.xml",
                "application/rss+xml": "https://sorgulat.com/rss.xml"
            }
        },
        verification: {
            yandex: '96dd6c199b3f276d',
        },
        other: {
            'application-name': 'Pasaport Blogları',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': 'Pasaport Blogları',
            'msapplication-TileColor': '#646ecb',
            'msapplication-config': '/browserconfig.xml',
            'theme-color': '#646ecb',
        },
    },
    "/hakkinda": {
        title: "Sorgulat Hakkında | Sorgulat",
        description: "Sorgulat; kullanıcılarına vize, pasaport, seyahat rehberleri ve ülke bilgileri gibi konularda güncel ve doğru bilgiler sunmayı amaçlayan bir dijital bilgi platformudur.",
        robots: "index, follow",
        keywords: "Sorgulat hakkında, vize platformu, seyahat bilgileri, pasaport rehberi, ülke rehberleri, dijital seyahat asistanı, sorgulat.com",
        authors: [
            {
                name: "Sorgulat Ekibi",
                url: "https://www.sorgulat.com/hakkinda"
            }
        ],
        icon: "/favicon.ico",
        openGraph: {
            title: "Sorgulat Hakkında | Sorgulat",
            description: "Vize ve seyahat bilgilerini güvenilir kaynaklardan derleyerek kullanıcılarına en doğru verileri sunan Sorgulat'ı yakından tanıyın.",
            url: "https://www.sorgulat.com/hakkinda",
            images: "/images/openGraph/about.png",
            type: "website",
            siteName: "Sorgulat"
        },
        twitter: {
            card: "summary_large_image",
            title: "Sorgulat Hakkında | Sorgulat",
            description: "Vize ve seyahat bilgilerini güvenilir kaynaklardan derleyerek kullanıcılarına en doğru verileri sunan Sorgulat'ı yakından tanıyın.",
            images: "/images/openGraph/about.png",
            site: "@Sorgulat"
        },
        alternates: {
            canonical: "/hakkinda",
            types: {
                "application/opensearchdescription+xml": "/opensearch.xml",
                "application/rss+xml": "https://sorgulat.com/rss.xml"
            }
        },
        verification: {
            yandex: '96dd6c199b3f276d',
        },
        other: {
            'application-name': 'Hakkında',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': 'Hakkında',
            'msapplication-TileColor': '#646ecb',
            'msapplication-config': '/browserconfig.xml',
            'theme-color': '#646ecb',
        },
    },
    '/fark': {
        title: "Saat Farkı Hesapla | Sorgulat",
        description: "Seçtiğiniz şehirler veya ülkeler arasındaki anlık saat farkını hesaplayın. Gelecekteki saat farklarıyla ilgili bilgileri öğrenin.",
        robots: "index, follow",
        keywords: "saat farkı, saat hesapla, anlık saat farkı, zaman farkı, saat farkı hesaplama, saat farkı sorgula, zaman dilimi, zaman dilimi farkı, sorgulat.com, saat, şehir saati, ülke saati, zaman farkı, compare saat",
        authors: [
            {
                name: "Sorgulat",
                url: "https://sorgulat.com/saat-kac/fark",
            }
        ],
        icon: "/favicon.ico",
        openGraph: {
            title: "Saat Farkı Hesapla | Sorgulat",
            description: "Seçtiğiniz şehirler veya ülkeler arasındaki anlık saat farkını öğrenin.",
            url: "https://sorgulat.com/saat-kac/fark",
            images: "/images/openGraph/difference.png",
            type: "website",
            siteName: "Sorgulat"
        },
        twitter: {
            card: "summary_large_image",
            title: "Saat Farkı Hesapla | Sorgulat",
            description: "Seçtiğiniz şehirler veya ülkeler arasındaki saat farkını hesaplayın.",
            images: "/images/openGraph/difference.png",
            site: "@Sorgulat"
        },
        alternates: {
            canonical: "/fark",
            types: {
                "application/opensearchdescription+xml": "/opensearch.xml",
                "application/rss+xml": "https://sorgulat.com/rss.xml"
            }
        },
        verification: {
            yandex: '96dd6c199b3f276d',
        },
        other: {
            'application-name': 'Saat Farkı',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
            'apple-mobile-web-app-title': 'Saat Farkı',
            'msapplication-TileColor': '#646ecb',
            'msapplication-config': '/browserconfig.xml',
            'theme-color': '#646ecb',
        },
    }
}
