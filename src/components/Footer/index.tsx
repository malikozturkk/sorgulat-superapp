import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiClock, FiGlobe, FiMapPin, FiBookOpen } from "react-icons/fi";

const footerData = [
  {
    title: "Saat Kaç",
    url: "/saat-kac",
    icon: <FiClock className="w-4 h-4" />,
    subItems: [
      { title: "İstanbul Saat Kaç", url: "/saat-kac/istanbul" },
      { title: "New York Saat Kaç", url: "/saat-kac/new-york" },
      { title: "Paris Saat Kaç", url: "/saat-kac/paris" },
      { title: "Tokyo Saat Kaç", url: "/saat-kac/tokyo" },
      { title: "Londra Saat Kaç", url: "/saat-kac/londra" },
      { title: "Dubai Saat Kaç", url: "/saat-kac/dubai" }
    ]
  },
  {
    title: "Pasaport",
    url: "/pasaport",
    icon: <FiGlobe className="w-4 h-4" />,
    subItems: [
      { title: "Vizesiz Ülkeler", url: "/pasaport/vizesiz-seyahat" },
      { title: "Vize Gereken Ülkeler", url: "/pasaport/vizeli-seyahat" },
      { title: "Kapıda Vize Veren Ülkeler", url: "/pasaport/kapida-vize-seyahat" },
      { title: "Elektronik Vize Veren Ülkeler", url: "/pasaport/eta-seyahat" }
    ]
  },
  {
    title: "Saat Farkı",
    url: "/saat-kac/fark",
    icon: <FiMapPin className="w-4 h-4" />,
    subItems: [
      { title: "İstanbul - New York Saat Farkı", url: "/saat-kac/fark/from-istanbul-to-new-york" },
      { title: "İstanbul - Paris Saat Farkı", url: "/saat-kac/fark/from-istanbul-to-paris" },
      { title: "İstanbul - Tokyo Saat Farkı", url: "/saat-kac/fark/from-istanbul-to-tokyo" },
      { title: "İstanbul - Londra Saat Farkı", url: "/saat-kac/fark/from-istanbul-to-londra" },
      { title: "İstanbul - Dubai Saat Farkı", url: "/saat-kac/fark/from-istanbul-to-dubai" },
    ]
  },
  {
    title: "Eğitim",
    url: "/egitim/tercih-robotu",
    icon: <FiBookOpen className="w-4 h-4" />,
    subItems: [
      { title: "Tüm Üniversiteler", url: "/egitim/universiteler" },
      { title: "YKS Tercih Robotu", url: "/egitim/tercih-robotu" },
      { title: "Üniversite Tercihleri", url: "/egitim/tercih-robotu" },
      { title: "Bölüm Seçimi", url: "/egitim/tercih-robotu" },
      { title: "Tercih Rehberi", url: "/egitim/tercih-robotu" },
    ]
  }
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-12">
        {/* Ana İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Logo ve Açıklama */}
          <div className="lg:col-span-2">
            <Link href="/" title="Logo" className="inline-block mb-4">
              <Image 
                src="/icons/logo.svg" 
                width={140} 
                height={47} 
                alt="Sorgulat Logo" 
              />
            </Link>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Sorgulat.com, dünya saatlerini anlık takip edebileceğiniz, vize durumlarını harita üzerinden görebileceğiniz, YKS tercih robotumuzla üniversite seçiminizi kolaylaştırabileceğiniz ve seyahat rehberleriyle dolu blog yazılarına ulaşabileceğiniz pratik bir bilgi kaynağıdır.
            </p>
            
            {/* Sosyal Medya */}
            <div className="flex items-center gap-3">
              <Link
                target="_blank"
                title="Sorgulat - Instagram"
                className="flex items-center justify-center text-gray-600 hover:text-pink-500 transition-colors duration-200"
                href="https://www.instagram.com/sorgulatcom/"
                rel="noopener noreferrer"
                aria-label="Sorgulat Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link
                target="_blank"
                title="Sorgulat - Linkedin"
                className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                href="https://www.linkedin.com/company/sorgulat/"
                rel="noopener noreferrer"
                aria-label="Sorgulat Linkedin"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link
                target="_blank"
                title="Sorgulat - X"
                className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                href="https://x.com/sorgulatcom"
                rel="noopener noreferrer"
                aria-label="Sorgulat X"
              >
                <FaXTwitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Menü Bölümleri */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerData.map((data) => (
                <div key={data.title}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-primary">
                      {data.icon}
                    </div>
                    <Link
                      title={data.title}
                      className="text-sm font-semibold text-gray-900 hover:text-primary transition-colors duration-200"
                      href={data.url || "#"}
                      aria-label={`Visit ${data.title}`}
                    >
                      {data.title}
                    </Link>
                  </div>
                  
                  <ul className="space-y-2">
                    {data.subItems.map((subItem) => (
                      <li key={subItem.title}>
                        <Link
                          title={subItem.title}
                          className="text-xs text-gray-600 hover:text-primary transition-colors duration-200 block"
                          href={subItem.url}
                          aria-label={`Visit ${subItem.title}`}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-xs">
                © {currentYear} <Link href="/" className="text-primary font-medium hover:opacity-80 duration-150">Sorgulat.com</Link>. Tüm hakları saklıdır.
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <Link href="/gizlilik" className="text-gray-500 hover:text-primary transition-colors duration-200">
                Gizlilik Politikası
              </Link>
              <Link href="/iletisim" className="text-gray-500 hover:text-primary transition-colors duration-200">
                İletişim
              </Link>
              <Link href="/hakkinda" className="text-gray-500 hover:text-primary transition-colors duration-200">
                Hakkımızda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
