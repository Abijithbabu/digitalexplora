import Layout from "../Components/landing/Layout";
import getCurrencySymbol from "currency-symbol-map";
import { landingRequests } from "../config/requests";
import { BASE_URL } from "../config";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchWrapper } from "../helpers";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

function products() {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      console.log("user found");
      getProducts(`${BASE_URL}/user/${user?._id}/products`);
    } else {
      console.log("user not found");
      getProducts(`${BASE_URL}${landingRequests.PRODUCTS}`);
    }
  }, [user]);

  async function getProducts(url) {
    setLoading(true);
    try {
      const res = await fetchWrapper.get(url);
      const resJson = await res.json();

      if (res.ok) {
        setProducts(resJson.data);
        setLoading(false);
      } else {
        console.log(resJson.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout
      title="Products"
      canonicalUrl="https://www.digitalexplora.in/products"
    >
      <main className=" bg-gray-100 py-10 lg:py-20 flex-1">
        <div className="max-w-7xl mx-auto" id="header">
          <div className="title">
            <h3 className="uppercase text-3xl md:text-5xl font-extrabold mb-4 text-center text-gray-700">
              Our Premium products
            </h3>
            <p className="uppercase text-lg mb-4 text-gray-400 font-semibold text-center">
              YOUR ALL-ACCESS PASS TO JOIN 15,000+ ATTENDEES AT Digital explora
            </p>
          </div>

          {isLoading ? (
            <div className="md:grid md:grid-cols-3 md:gap-8 px-20 mt-10">
              {Array(3).fill(0).map(() => (
                <div key={uuidv4()} className="rounded bg-white shadow hover:shadow-xl overflow-hidden">
                  <div className="h-44 w-full bg-gray-200 animate-pulse"></div>
                  <div className="p-8">
                    <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>
                    <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>
                    <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>
                    <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>
                    <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {products?.length > 0 ? (
                <div className="md:grid md:grid-cols-3 md:gap-8 px-20 mt-10">
                  {products?.map((product) => (
                    <div
                      className="card p-0 overflow-hidden mb-10 md:mb-0"
                      key={product._id}
                    >
                      <img
                        src={
                          product?.imageLink
                            ? product?.imageLink
                            : "/img/no_image.jpg"
                        }
                        className="w-full h-44 object-cover"
                        alt={product?.productName}
                      />
                      <div className="card-body p-6">
                        <h3 className="text-base text-gray-800 font-bold mb-2">
                          {product?.productName}
                        </h3>
                        <h5>
                          <span className="text-lg font-bold">
                            {getCurrencySymbol("INR")} {product?.price}{" "}
                          </span>
                          <span className="text-gray-500">
                            <s>
                              {getCurrencySymbol("INR")} {product?.oldPrice}
                            </s>
                          </span>
                        </h5>
                        <p className="mt-3 font-semibold">Description:</p>
                        <p className="text-gray-500 text-sm">
                          {product?.description}
                        </p>
                        {product.broughtStatus ? (
                          <Link href={`/user/products/${product?.slug}`}>
                            <p>
                              <button className="userBtn w-full mt-4">
                                Access Now
                              </button>
                            </p>
                          </Link>
                        ) : (
                          product?.target ?
                            <div className="flex mt-4">
                              <Link href={product?.target} className="userBtn flex-1 bg-red-500"
                                style={{
                                  backgroundColor:
                                    product?.buttonColor?.indexOf("#") !== -1
                                      ? product?.buttonColor
                                      : "",
                                  color:
                                    product?.textColor?.indexOf("#") !== -1
                                      ? `${product?.textColor}`
                                      : "black",
                                }}>
                                {product?.text ?? "CTA"}
                              </Link>
                              <Link href={`/checkout/${product?.slug}`} className="userBtn flex-1 ml-1">
                                Buy Now
                              </Link>
                            </div> :
                            <Link href={`/checkout/${product?.slug}`}>
                              <button className="userBtn w-full mt-4">
                                Buy Now
                              </button>
                            </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p>OOPS! No products found</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}

export default products;
