import { StarIcon } from "@heroicons/react/24/solid";
import getSymbolFromCurrency from "currency-symbol-map";
import { useRouter } from "next/router";

function BuyProductView({ product }) {
  const router = useRouter();

  return (
    <div className="md:grid md:grid-cols-3 md:gap-4">
      <div className="bg-white rounded-md overflow-hidden col-span-2 leftCol shadow-md border-l border-r border-gray-200">
        <img
          src={
            product.imageLink
              ? product.imageLink
              : "http://dummyimage.com/300x150"
          }
          className="w-full h-64 object-cover"
          alt={product.productName}
        />
        <div className="p-8 card-body">
          <div className="block md:flex md:items-center mb-2">
            <h3 className="text-gray-900 capitalize text-2xl font-semibold">
              {product.productName}
            </h3>
          </div>
          <h3 className="mt-4 font-bold mb-4">Description</h3>
          <p>{product.description}</p>

          <div className="accordion mt-10">
            <h5 className="text-lg text-gray-900 font-semibold mb-4">
              List of 🔥 <span className="text-blue-500">Courses</span> you will
              get:
            </h5>

            <ul className="list-outside list-disc ml-10">
              {product.courses.map((course, index) => (
                <li key={index} className="mb-3">
                  <h3 className="font-semibold capitalize text-lg">
                    {course.label}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rightCol mt-5 md:mt-0 text-center">
        <div className="bg-white p-8 rounded-md lg:sticky lg:top-8 shadow-md">
          <div className="mb-6">
            <h3 className="text-xl font-bold">{product.productName}</h3>
            <div className="flex justify-center">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <div className="mb-6">
            <p className="text-2xl text-gray-800 font-semibold ">
              {getSymbolFromCurrency("INR")}
              {product.price}{" "}
              <span className="text-gray-400 font-semibold text-xl mb-2">
                <s>
                  {getSymbolFromCurrency("INR")}
                  {product.oldPrice}
                </s>
              </span>
            </p>
            <p className="text-sm text-green-500 font-semibold mt-2">
              (GST: {product.gst}%)
            </p>
          </div>
          <button
            className="userBtn w-full mt-4"
            onClick={() => router.push(`/checkout/${product.slug}`)}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyProductView;
