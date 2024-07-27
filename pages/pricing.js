import Layout from "@/Components/landing/Layout";
import { pricingConstants } from "@/constants/LandingPage";
import { EllipsisHorizontalCircleIcon, TagIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function pricing() {
  return (
    <Layout
      title="Pricing"
      canonicalUrl="https://www.digitalexplora.in/pricing"
    >
      <main className="max-w-7xl mx-auto">
        <div className="bg-white pt-20 md:pt-20 pb-20" id="header">
          <div className="title">
            <h3 className="uppercase text-3xl md:text-5xl font-extrabold mb-4 text-center text-gray-700">
              PRODUCTS ON SALE NOW
            </h3>
            <p className="uppercase text-lg mb-4 text-gray-400 font-semibold text-center">
              YOUR ALL-ACCESS PASS TO JOIN 15,000+ ATTENDEES AT Digital explora
            </p>
            <p className="text-center mb-8 text-lg">
              Scroll down to buy products{" "}
              <span
                role="img"
                aria-label="hand-down"
                className="animate-bounce"
              >
                👇
              </span>
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-10 md:px-32 px-10">
            {pricingConstants.map((item, idx) => (
              <div
                className="plan rounded-lg shadow-xl overflow-hidden border"
                key={idx}
              >
                <div className={`planName p-5 bg-${item.themeColor}-500`}>
                  <h3 className="text-2xl text-white font-bold text-center uppercase">
                    {item.planName}
                  </h3>
                </div>
                <div className="planBody px-4 md:px-8 py-6">
                  <div className="grid grid-cols-2 divide-x divide-gray-200 text-center">
                    <div className="salePriceDiv">
                      <div className="flex items-center justify-center">
                        <TagIcon className="h-8" />
                        <span className="uppercase font-bold ml-2">
                          sale price
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold mt-1">
                        ₹{item.salePrice}
                      </h3>
                    </div>
                    <div className="fullPriceDiv ml-3">
                      <div className="flex items-center justify-center">
                        <span className="uppercase font-bold">Full price</span>
                      </div>
                      <h3 className="text-xl md:text-3xl text-gray-400 font-bold mt-1">
                        <s>₹{item.fullPrice}</s>
                      </h3>
                    </div>
                  </div>
                  <div className="offer flex justify-center mt-4 mb-8">
                    <span className="bg-yellow-200 rounded-l-full text-sm text-center px-2 md:px-6 py-3 font-bold">
                      Save ₹{item.savePrice}!
                    </span>
                    <span className="bg-yellow-100 rounded-r-full text-xs font-semibold text-center px-2 md:px-6 py-3 uppercase">
                      BUY BEFORE THE PRICE GOES UP
                    </span>
                  </div>
                  <ul className="mb-6">
                    {item.points.map((point, idx) => (
                      <li className="flex mb-2 items-center" key={idx}>
                        <span className={`text-${item.themeColor}-600`}>
                          <EllipsisHorizontalCircleIcon className="h-8" />
                        </span>
                        <span className="ml-2">{point}</span>
                      </li>
                    ))}
                    {/* <li className="flex mb-2 items-center">
                    <span className="text-gray-300">
                      <XCircleIcon className="h-8" />
                    </span>
                    <span className="ml-2">Identified as an Attendee</span>
                  </li> */}
                  </ul>
                  <div className="button text-center">
                    <Link href={item.buyUrl}>
                      <p className="userBtn py-3 w-full">Buy Now</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="mt-10 text-sm text-center">
              Courses Marked * is not released yet but its a future release and
              you will have full and free access to it when we release it with
              free future updates.
            </p>
            <p className="mt-5 text-sm text-center">
              ** will be providing 50 to 80 percent commission based on product
              thats owned by us. In future we might bring in third party deals
              thats not made by us which will have variation in commission than
              products owned by our own company
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default pricing;
