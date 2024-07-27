import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import Logo from "../Logo";
import FooterLink from "./FooterLink";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";

function Footer({ isWebinar }) {
  return (
    <div className="footer">
      {!isWebinar && (
        <div className="bg-blue-600 shadow-xl px-10 py-10 md:py-36 text-center z-20 relative footerCta">
          <h3 className="text-xl md:text-4xl font-semibold text-white mb-5">
            Live Webinar Register here
          </h3>
          <Link href="/webinars">
            <p>
              <button className="userBtn bg-white hover:border-white hover:text-white text-gray-800 font-bold text-xl uppercase mx-auto px-6 md:px-14">
                <span className="mr-2">Let's Roll</span>
                <span className="animate-pulse" role="img" aria-label="Launch">
                  🚀
                </span>
              </button>
            </p>
          </Link>
        </div>
      )}
      <div className="bg-white py-20 border-t border-gray-200 z-10 relative">
        <div className="max-w-7xl mx-auto px-10">
          <div className="md:grid md:grid-cols-3 md:gap-4">
            <div className="footerLinks text-center mb-10 md:mb-0">
              <p className="font-semibold uppercase text-gray-800">Company</p>
              <ul className="mt-2">
                <FooterLink text="About us" url="/about" />
                <FooterLink text="Our team" url="/team" />
                <FooterLink text="Contact us" url="/contact" />
              </ul>
            </div>

            <div className="logo text-center mb-10 md:mb-0">
              <h3 className="text-2xl text-gray-900 font-extrabold uppercase mb-3">
                <Link href="/">
                  <p>
                    <Logo className="w-36 object-contain mx-auto" />
                  </p>
                </Link>
              </h3>
              <p className="text-lg">
                Taking You To The Next Level with Marketing & Sales
              </p>
            </div>

            <div className="footerLinks text-center mb-10 md:mb-0">
              <p className="font-semibold uppercase">Terms</p>
              <ul className="mt-2">
                <FooterLink text="Terms & Conditions" url="/terms" />
                <FooterLink text="Privacy policy" url="/privacy" />
                <FooterLink text="Disclaimer" url="/disclaimer" />
                <FooterLink text="Refund Policy" url="/refund" />
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright py-6 px-6 bg-gray-100 text-center">
        <div className="md:grid md:grid-cols-3 md:gap-4 items-center">
          <div className="flex justify-center md:justify-start mb-4 md:mb-0">
            <div className="mr-3 flex items-center">
              <span className="text-blue-700">
                <EllipsisHorizontalCircleIcon className="h-5" />
              </span>
              <Link href="/terms" className="text-sm text-gray-500">
                <p>Terms and conditions</p>
              </Link>
            </div>
            <div className="mr-3 flex items-center">
              <span className="text-blue-700">
                <EllipsisHorizontalCircleIcon className="h-5" />
              </span>
              <Link href="/disclaimer" className="text-sm text-gray-500">
                <p>Disclaimer</p>
              </Link>
            </div>
          </div>

          <div className="socialLinks flex justify-center mb-4 md:mb-0">
            <span>
              <SocialIcon
                url="https://facebook.com/"
                bgColor="#333"
                className="mx-2"
                style={{ height: 25, width: 25 }}
              />
            </span>
            <span>
              <SocialIcon
                url="https://linkedin.com/"
                bgColor="#333"
                className="mx-2"
                style={{ height: 25, width: 25 }}
              />
            </span>
          </div>

          <div className="text-center md:text-right text-sm text-gray-500">
            <p>Copyrighted &copy; 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
