import { useRouter } from "next/router";
import Link from "next/link";
import NoData from "@/Components/NoData";
import { actionCreators } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

function index() {
  const { webinar } = useSelector((state) => state.webinar);
  const router = useRouter();
  const { slug } = router.query;
  const { language } = router.query;

  const dispatch = useDispatch();
  const { fetchWebinar } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (slug) {
      fetchWebinar(slug);
    }
  }, [slug]);

  return (
    <>
      {webinar ? (
        <div className="webinarVideo min-h-screen bg-gray-900 pb-10">
          <div className="webinarHeader py-10 max-w-4xl mx-auto text-center">
            <Link href="/">
              <p className="font-extrabold p-2 text-lg text-white border-4 border-white uppercase">
                Digital explora
              </p>
            </Link>
            <p className="font-semibold text-lg text-white mt-10">
              {webinar?.videoPage?.smallHead ?? "No small Heading"}
            </p>
            <h3 className="font-extrabold text-4xl text-white">
              {webinar?.videoPage?.heading ?? "No Heading"}
            </h3>
          </div>
          <div className="max-w-4xl mx-auto">
            <iframe
              width="100%"
              height="520"
              src={webinar?.languages?.filter((item) => item.language === language)?.[0]?.videoUrl}
              title="YouTube video player"
              className="rounded-lg shadow-lg bg-white"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => router.push(`/checkout/${slug}`)}
              className="btn font-bold text-lg uppercase mt-10 lg:px-28 mx-auto"
              style={{ backgroundColor: "blue", color: "#fff" }}
            >
              {webinar?.styles?.text ?? "Buy now"}
            </button>
          </div>
        </div>
      ) : (
        <div className=" min-h-screen v__centered bg-gray-900 pt-28 pb-10">
          <NoData />
        </div>
      )}
    </>
  );
}

export default index;
