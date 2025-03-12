import Image from "next/image";
import Link from "next/link";

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
              </Link>, kullanıcılar için dünya saatleri ve diğer çeşitli hizmetler sunan bir superapp'tir.
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
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                    <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">Şirket</p>
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
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">Sunduklarımız</p>
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
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
