import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h3 className="text-xl md:text-4xl text-gray-700 font-bold text-center mb-4">
          Access Denied!
        </h3>
        <Link href="/">
          <p className="text-blue-600">Back to Home</p>
        </Link>
      </div>
    </div>
  );
}
