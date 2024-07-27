import { useRouter } from "next/router";

function pageNotFound() {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      <img
        src="https://image.flaticon.com/icons/png/128/4076/4076559.png"
        width="80"
        className="mx-auto mb-4"
        alt=""
      />
      <h3 className="text-gray-800 font-medium text-center text-2xl">
        404 | Page Not Found
      </h3>
      <button className="text-blue-500 text-sm underline mt-5" onClick={goBack}>
        Go back
      </button>
    </div>
  );
}

export default pageNotFound;
