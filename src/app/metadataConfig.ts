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
  }

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

export const metadataConfig: Record<string, MetadataConfig> = {
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
    },
    "/ip-sorgulama": {
        title: "IP Sorgulama | Sorgulat",
        description: "IP adresinizin konum, ülke, şehir, saat dilimi, ISP ve diğer bilgilerini anında sorgulayın. Türkiye ve dünya genelindeki IP adreslerini analiz edin.",
        robots: "index, follow",
        keywords: "IP sorgulama, IP adresi bul, IP konumu, IP bilgileri, IP'den şehir bul, IP adresi analizi, IP adresi Türkiye, Superonline IP sorgu, IP adresinden konum bulma, IP adresi detayları",
        authors: [
            {
                "name": "IP Sorgulama | Sorgulat",
                "url": "https://www.sorgulat.com/ip-sorgulama"
            }
        ],
        icon: '/favicon.ico',
        openGraph: {
            title: 'IP Sorgulama | Sorgulat',
            description: 'IP adresinizin konum, ISP, saat dilimi ve diğer detaylarını öğrenin. Hangi şehirde olduğunuzu bulun ve IP bilgilerinizi analiz edin.',
            url: 'https://www.sorgulat.com/ip-sorgulama',
            images:
              '/images/open-graph-ip.png',
            type: 'website',
            siteName: 'Sorgulat',
          },
          twitter: {
            card: 'summary_large_image',
            title: 'IP Sorgulama | Sorgulat',
            description: 'IP adresinizin konum, ISP, saat dilimi ve diğer detaylarını öğrenin.',
            images: '/images/open-graph-ip.png',
            site: '@Sorgulat',
          },
          alternates: {
            canonical: "/images/open-graph-ip.png",
            types: {
              "application/opensearchdescription+xml": "/opensearch.xml",
              "application/rss+xml": "https://sorgulat.com/rss.xml",
            },
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
            images: "/images/open-graph-passport.png",
            type: "website",
            siteName: "Sorgulat"
        },
        twitter: {
            card: "summary_large_image",
            title: "Pasaport Vize Durumu | Sorgulat",
            description: "Türkiye pasaportu ile dünya genelindeki vize durumlarını kolayca öğrenin.",
            images: "/images/open-graph-passport.png",
            site: "@Sorgulat"
        },
        alternates: {
            canonical: "/pasaport",
            types: {
                "application/opensearchdescription+xml": "/opensearch.xml",
                "application/rss+xml": "https://sorgulat.com/rss.xml"
            }
        }
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
            images: "/images/open-graph-blog.png",
            type: "website",
            siteName: "Sorgulat"
        },
        twitter: {
            card: "summary_large_image",
            title: "Blog | Sorgulat",
            description: "Vize, pasaport ve seyahat rehberleri hakkında en güncel içeriklere ulaşın.",
            images: "/images/open-graph-blog.png",
            site: "@Sorgulat"
        },
        alternates: {
            canonical: "/blog",
            types: {
                "application/opensearchdescription+xml": "/opensearch.xml",
                "application/rss+xml": "https://sorgulat.com/rss.xml"
            }
        }
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
            images: "/images/open-graph-blog.png",
            type: "website",
            siteName: "Sorgulat"
        },
        twitter: {
            card: "summary_large_image",
            title: "Pasaport Blog Rehberi | Sorgulat",
            description: "Vize, pasaport ve seyahat rehberleri hakkında en güncel içeriklere ulaşın.",
            images: "/images/open-graph-blog.png",
            site: "@Sorgulat"
        },
        alternates: {
            canonical: "/blog",
            types: {
                "application/opensearchdescription+xml": "/opensearch.xml",
                "application/rss+xml": "https://sorgulat.com/rss.xml"
            }
        }
    },
}
