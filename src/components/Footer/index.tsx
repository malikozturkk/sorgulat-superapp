import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiGlobe, FiClock, FiMapPin, FiBookOpen, FiInfo } from "react-icons/fi";

const footerData = [
  {
    title: "Saat Kaç",
    url: "/saat-kac",
    icon: <FiClock className="w-5 h-5" />,
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
    icon: <FiGlobe className="w-5 h-5" />,
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
    icon: <FiMapPin className="w-5 h-5" />,
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
    icon: <FiBookOpen className="w-5 h-5" />,
    subItems: [
      { title: "YKS Tercih Robotu", url: "/egitim/tercih-robotu" },
      { title: "Üniversite Tercihleri", url: "/egitim/tercih-robotu" },
      { title: "Bölüm Seçimi", url: "/egitim/tercih-robotu" },
      { title: "Tercih Rehberi", url: "/egitim/tercih-robotu" },
    ]
  },
  {
    title: "Diğer",
    icon: <FiInfo className="w-5 h-5" />,
    subItems: [
      { title: "Sorgulat Blog", url: "/blog" },
    ]
  }
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-50 border-t border-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Ana İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Logo ve Açıklama */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <Link href="/" title="Logo" className="inline-block mb-6 group">
                <div className="relative">
                  <Image 
                    src="/icons/logo.svg" 
                    width={173.5} 
                    height={58.5} 
                    className="transition-transform duration-200 group-hover:scale-105" 
                    alt="Sorgulat Logo" 
                  />
                </div>
              </Link>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                <Link className="text-primary font-bold hover:opacity-80 duration-150" href="/" aria-label="Visit Sorgulat Website">
                  Sorgulat.com
                </Link>, dünya saatlerini anlık takip edebileceğiniz, vize durumlarını harita üzerinden görebileceğiniz, YKS tercih robotumuzla üniversite seçiminizi kolaylaştırabileceğiniz ve seyahat rehberleriyle dolu blog yazılarına ulaşabileceğiniz pratik bir bilgi kaynağıdır.
              </p>
              
              {/* Sosyal Medya */}
              <div className="flex items-center gap-3">
                <Link
                  target="_blank"
                  title="Sorgulat - Instagram"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl w-10 h-10 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  href="https://www.instagram.com/sorgulatcom/"
                  rel="noopener noreferrer"
                  aria-label="Sorgulat Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </Link>
                <Link
                  target="_blank"
                  title="Sorgulat - Linkedin"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl w-10 h-10 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  href="https://www.linkedin.com/company/sorgulat/"
                  rel="noopener noreferrer"
                  aria-label="Sorgulat Linkedin"
                >
                  <FaLinkedin className="w-4 h-4" />
                </Link>
                <Link
                  target="_blank"
                  title="Sorgulat - X"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black rounded-xl w-10 h-10 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  href="https://x.com/sorgulatcom"
                  rel="noopener noreferrer"
                  aria-label="Sorgulat X"
                >
                  <FaXTwitter className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Menü Bölümleri */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {footerData.map((data) => (
                <div key={data.title} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primaryDark rounded-lg flex items-center justify-center">
                      <div className="text-white">
                        {data.icon}
                      </div>
                    </div>
                    <Link
                      title={data.title}
                      className="text-lg font-bold text-gray-900 hover:text-primary transition-all duration-200"
                      href={data.url || "#"}
                      aria-label={`Visit ${data.title}`}
                    >
                      {data.title}
                    </Link>
                  </div>
                  
                  <ul className="space-y-3">
                    {data.subItems.map((subItem) => (
                      <li key={subItem.title}>
                        <Link
                          title={subItem.title}
                          className="text-gray-600 hover:text-primary transition-all duration-200 hover:translate-x-1 block"
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
              <p className="text-gray-600 text-sm">
                © {currentYear} <Link href="/" className="text-primary font-semibold hover:opacity-80 duration-150">Sorgulat.com</Link>. Tüm hakları saklıdır.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/gizlilik" className="text-gray-600 hover:text-primary transition-colors duration-200">
                Gizlilik Politikası
              </Link>
              <Link href="/iletisim" className="text-gray-600 hover:text-primary transition-colors duration-200">
                İletişim
              </Link>
              <Link href="/hakkinda" className="text-gray-600 hover:text-primary transition-colors duration-200">
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
