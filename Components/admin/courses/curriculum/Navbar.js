import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  return (
    <div className="w-full bg-gray-800 text-white py-4 px-8">
      <button onClick={() => router.back()} className="flex items-center">
        <ArrowLeftIcon className="mr-2 w-4 h-4" />
        Dashboard
      </button>
    </div>
  );
}

export default Navbar;
