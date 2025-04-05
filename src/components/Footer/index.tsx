import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const footerData = [
  {
    title: "Saat Kaç",
    url: "/saat-kac",
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
    subItems: [
      { title: "Vizesiz Ülkeler", url: "/pasaport/vizesiz-seyahat" },
      { title: "Vize Gereken Ülkeler", url: "/pasaport/vizeli-seyahat" },
      { title: "Kapıda Vize Veren Ülkeler", url: "/pasaport/kapida-vize-seyahat" },
      { title: "Elektronik Vize Veren Ülkeler", url: "/pasaport/eta-seyahat" }
    ]
  },
  {
    title: "Diğer",
    subItems: [
      { title: "Sorgulat Blog", url: "/blog" },
      { title: "Ip Sorgulama", url: "/ip-sorgulama" },
      { title: "Sorgulat Hakkında", url: "/hakkinda" },
      { title: "İletişim", url: "/iletisim" },
      { title: "Gizlilik", url: "/gizlilik" }
    ]
  }
];


const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-white sm:pt-16 lg:pt-24" style={{ boxShadow: "0 0px 6px -1px rgba(0,0,0,0.1), 0 -1px 2px -4px rgba(0,0,0,0.1)" }}>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Link href="/" title="Logo" className="flex-shrink-0 flex font-semibold text-xl">
              <Image src="/icons/logo.svg" width={173.5} height={58.5} alt="Sorgulat Logo" />
            </Link>
            <p className="text-base leading-relaxed text-[#4b5563] mt-7">
              <Link className="text-primary font-bold hover:opacity-80 duration-150" href="/" aria-label="Visit Sorgulat Website">
                Sorgulat.com
              </Link>, dünya saatlerini anlık takip edebileceğiniz, vize durumlarını harita üzerinden görebileceğiniz ve seyahat rehberleriyle dolu blog yazılarına ulaşabileceğiniz pratik bir bilgi kaynağıdır.
            </p>
            <ul className="flex items-center space-x-3 mt-9">
              <li>
              <Link
                  target="_blank"
                  title="Sorgulat - Instagram"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-[#1f2937] rounded-full w-7 h-7 hover:bg-red focus:bg-red"
                  href="https://www.instagram.com/sorgulatcom/"
                  rel="noopener noreferrer"
                  aria-label="Sorgulat Instagram"
                >
                  <FaInstagram width={16} height={16} />
                </Link>
              </li>
              <li>
              <Link
                  target="_blank"
                  title="Sorgulat - Linkedin"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-[#1f2937] rounded-full w-7 h-7 hover:bg-red focus:bg-red"
                  href="https://www.linkedin.com/company/sorgulat/"
                  rel="noopener noreferrer"
                  aria-label="Sorgulat Linkedin"
                >
                  <FaLinkedin width={16} height={16} />
                </Link>
              </li>
              <li>
              <Link
                  target="_blank"
                  title="Sorgulat - X"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-[#1f2937] rounded-full w-7 h-7 hover:bg-red focus:bg-red"
                  href="https://x.com/sorgulatcom"
                  rel="noopener noreferrer"
                  aria-label="Sorgulat X"
                >
                  <FaXTwitter width={16} height={16} />
                </Link>
              </li>
            </ul>
          </div>
          {footerData.map((data) => (
            <div key={data.title}>
              <Link
                title={data.title}
                className="flex text-sm font-semibold text-primary uppercase transition-all duration-200 hover:text-red focus:text-red"
                href={data.url || "#"}
                aria-label={`Visit ${data.title}`}
              >
                  {data.title}
              </Link>
              <ul className="mt-6 space-y-4">
                {data.subItems.map((subItem) => (
                  <li key={subItem.title}>
                    <Link
                      title={subItem.title}
                      className="flex text-base text-black transition-all duration-200 hover:text-red focus:text-red"
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
    </footer>
  );
};

export default Footer;
