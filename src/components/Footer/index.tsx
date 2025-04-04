import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-white sm:pt-16 lg:pt-24">
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

          <div>
            <p className="text-sm font-semibold text-primary uppercase">Şirket</p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  title="İletişim"
                  className="flex text-base text-black transition-all duration-200 hover:text-red focus:text-red"
                  href="/iletisim"
                  aria-label="Visit Contact Page"
                >
                  İletişim
                </Link>
              </li>
              <li>
                <Link
                  title="Gizlilik"
                  className="flex text-base text-black transition-all duration-200 hover:text-red focus:text-red"
                  href="/gizlilik"
                  aria-label="Visit Privacy Policy"
                >
                  Gizlilik
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-primary uppercase">Sunduklarımız</p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  title="Saat Kaç"
                  className="flex text-base text-black transition-all duration-200 hover:text-red focus:text-red"
                  href="/saat-kac"
                  aria-label="Visit Saat Kaç"
                >
                  Saat Kaç
                </Link>
              </li>
              <li>
                <Link
                  title="Ip Sorgulama"
                  className="flex text-base text-black transition-all duration-200 hover:text-red focus:text-red"
                  href="/ip-sorgulama"
                  aria-label="Visit Ip Sorgulama"
                >
                  Ip Sorgulama
                </Link>
              </li>
              <li>
                <Link
                  title="Pasaport"
                  className="flex text-base text-black transition-all duration-200 hover:text-red focus:text-red"
                  href="/pasaport"
                  aria-label="Visit Pasaport"
                >
                  Pasaport
                </Link>
              </li>
              <li>
                <Link
                  title="Blog"
                  className="flex text-base text-black transition-all duration-200 hover:text-red focus:text-red"
                  href="/blog"
                  aria-label="Visit Blog"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
