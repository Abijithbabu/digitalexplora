import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import Layout from "../../Components/landing/Layout";
import NoData from "../../Components/NoData";
import Link from "next/link";
import { checkUrl } from "../../helpers/checkUrl";

function Webinar() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const { webinars, fetching, error } = useSelector((state) => state.webinar);

  const dispatch = useDispatch();
  const { fetchAllWebinars } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchAllWebinars(skip, limit);
  }, [skip, limit]);

  return (
    <Layout
      title="Webinars"
      canonicalUrl="https://www.digitalexplora.in/webinars"
      isWebinar
    >
      <main className="bg-white py-10 lg:py-20 ">
        <div className="max-w-5xl mx-auto text-center mb-10" id="header">
          <div className="title">
            <h3 className="uppercase text-3xl font-extrabold mb-4 text-center text-gray-700">
              Webinars
            </h3>
          </div>
        </div>

        {fetching ? (
          <div className="md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-8 px-20 mt-10 text-center">
            {Array(4).fill(
              <div className="rounded bg-white shadow hover:shadow-xl overflow-hidden">
                <div className="h-36 w-full bg-gray-200 animate-pulse"></div>
                <div className="p-8">
                  <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>

                  <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>

                  <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>
                </div>
              </div>
            )}
          </div>
        ) : error ? (
          <p>Something went wrong</p>
        ) : (
          <>
            {webinars?.length > 0 ? (
              <div className="md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-8 px-20 mt-10">
                {console.log(webinars)}
                {webinars?.map((webinar) => (
                  <div
                    className="card p-0 overflow-hidden mb-10 md:mb-0"
                    key={webinar._id}
                  >
                    <img
                      src={
                        checkUrl(webinar?.featuredImage)
                          ? webinar?.featuredImage
                          : "/img/no_image.jpg"
                      }
                      className="w-full h-44 object-cover"
                      alt={webinar?.webinarName}
                    />
                    <div className="card-body p-6">
                      <h3 className="text-base text-gray-800 font-bold mb-2">
                        {webinar?.webinarName}
                      </h3>
                      <Link href={`/webinars/${webinar?.slug}`}>
                        <p>
                          <button className="userBtn w-full mt-4">
                            Register now
                          </button>
                        </p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <NoData />
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}

export default Webinar;
