import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Header() {
  return (
    <div className="deHeader text-center relative px-4" id="header">
      <div className="max-w-4xl mx-auto px-2">
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">
          Welcome to Digitalexplora
        </h1>
        <h2 className="text-lg md:text-2xl text-white">
          Taking You To The Next Level with Marketing & Sales
        </h2>

        <div className="flex items-center justify-around my-10">
          <div className="date md:flex items-center justify-center mr-0 md:mr-10">
            <img
              src="/img/hacker.png"
              width="30"
              alt="hacker icon"
              className="mx-auto rounded-md"
            />
            <p className="text-base mt-2 md:mt-0 md:text-2xl md:ml-3 text-white font-bold">
              Level Hackers
            </p>
          </div>
          <div className="online md:flex items-center justify-center">
            <img
              src="/img/live.png"
              width="50"
              alt="Live Webinar"
              className="mx-auto"
            />
            <p className="text-base mt-2 md:mt-0 md:text-2xl md:ml-3 text-white font-bold">
              Live Webinar
            </p>
          </div>
        </div>

        <div>
          <Link href="/webinars">
            <p>
              <button className="bg-gray-900 text-white border-2 border-transparent hover:border-yellow-300 hover:bg-gray-800 w-full lg:text-xl font-semibold p-4 rounded transition-all ease-linear duration-200">
                Register for Live Training
              </button>
            </p>
          </Link>
        </div>
      </div>

      <div className="text-center hidden lg:block absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-pulse">
        <p className="text-white font-semibold">Scroll down</p>
        <ChevronDoubleDownIcon className="w-5 h-5 inline-block text-white" />
      </div>
    </div>
  );
}

export default Header;
