import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Loading from "@/Components/Loading";
import { actionCreators } from "@/store";
import Footer from "@/Components/landing/Footer";
import Modal from "@/Components/landing/Modal";

function Webinar() {
  const { webinar } = useSelector((state) => state.webinar);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const dispatch = useDispatch();
  const { fetchWebinar } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (slug) {
      fetchWebinar(slug);
    }
  }, [slug]);

  function checkUrl(url) {
    if (!url) return null;
    return url.match(/\.(jpeg|jpg|gif|png|JPG)$/) != null;
  }

  return (
    <>
      <div className="topBar bg-black py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <button
              className="text-white flex items-center focus:outline-none"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Go Back
            </button>
            <img
              src="https://d1yei2z3i6k35z.cloudfront.net/389125/5fb5f8ffb7ffb_logo-light-02.png"
              alt="Digital explora logo"
              width="300"
              className="mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="levelSection max-w-7xl mx-auto">
          <div className="webinarHeader py-10 mx-auto max-w-4xl text-center">
            <p className="font-medium text-xl">
              {webinar ? (
                webinar?.smallHead ? (
                  webinar?.smallHead
                ) : (
                  "--"
                )
              ) : (
                <Loading />
              )}
            </p>
            <h3 className="text-2xl md:text-4xl font-semibold mt-4 leading-snug">
              {webinar ? (
                webinar?.heading ? (
                  webinar?.heading
                ) : (
                  "--"
                )
              ) : (
                <Loading />
              )}
            </h3>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="video leftCol">
              <img
                src={
                  checkUrl(webinar?.featuredImage)
                    ? webinar?.featuredImage
                    : "/img/no_image.jpg"
                }
                alt="Webinar registration"
                className="w-full rounded shadow-xl h-72 object-cover"
              />
            </div>
            <div className="rightCol p-4 v__centered">
              <h3 className="font-bold text-lg">
                {webinar ? (
                  webinar?.point?.heading ? (
                    webinar.point?.heading
                  ) : (
                    "No heading"
                  )
                ) : (
                  <Loading />
                )}
              </h3>
              <ul className="mt-6">
                {/* {JSON.parse(webinar.point.points)} */}

                {webinar ? (
                  webinar?.point?.points?.length > 0 ? (
                    "Points"
                  ) : (
                    "No points"
                  )
                ) : (
                  <Loading />
                )}
              </ul>
              <button
                onClick={() => setOpen(true)}
                className={`btn font-bold w-full text-lg uppercase mb-2 mt-6`}
                style={{
                  backgroundColor:
                    webinar?.styles?.buttonColor?.indexOf("#") !== -1
                      ? webinar?.styles?.buttonColor
                      : "",
                  color:
                    webinar?.styles?.textColor?.indexOf("#") !== -1
                      ? `${webinar?.styles?.textColor}`
                      : "white",
                }}
              >
                {webinar ? (
                  webinar?.styles?.text ? (
                    webinar?.styles?.text
                  ) : (
                    "No button text"
                  )
                ) : (
                  <Loading />
                )}
              </button>
              <p className="text-xs text-center">
                <em>EXCLUSIVE Free Training from Alex Marsale:</em>
              </p>
            </div>
          </div>

          <main className="container py-20">
            <div className="title max-w-5xl mx-auto mb-10 text-center">
              <h3 className="text-xl md:text-3xl font-bold capitalize text-gray-800 mb-4">
                {webinar ? (
                  webinar?.grids?.heading ? (
                    webinar?.grids?.heading
                  ) : (
                    "No grids heading"
                  )
                ) : (
                  <Loading />
                )}
              </h3>
              <p className="text-lg">
                {webinar ? (
                  webinar?.grids?.subHeading ? (
                    webinar?.grids?.subHeading
                  ) : (
                    "No grids sub heading"
                  )
                ) : (
                  <Loading />
                )}
              </p>
            </div>
            <div className="md:grid md:grid-cols-3 md:gap-10">
              <div className="mb-10 md:mb-0 card">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/389125/5f40d1797e3a3_level1.jpg"
                  alt="Level 1"
                  className="w-full mb-4"
                />
                <h3 className="font-bold text-lg">
                  {webinar ? (
                    webinar?.grids?.grid1?.heading ? (
                      webinar?.grids?.grid1?.heading
                    ) : (
                      "No grids column 1 heading"
                    )
                  ) : (
                    <Loading />
                  )}
                </h3>
                <p className="font-medium text-gray-500 mt-2">
                  {webinar ? (
                    webinar?.grids?.grid1?.description ? (
                      webinar?.grids?.grid1?.description
                    ) : (
                      "No grids column 1 description"
                    )
                  ) : (
                    <Loading />
                  )}
                </p>
              </div>
              <div className="mb-10 md:mb-0 card">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/389125/5f40d1797e3a3_level1.jpg"
                  alt="Level 1"
                  className="w-full mb-4"
                />
                <h3 className="font-bold text-lg">
                  {webinar ? (
                    webinar?.grids?.grid2?.heading ? (
                      webinar?.grids?.grid2?.heading
                    ) : (
                      "No grids column 2 heading"
                    )
                  ) : (
                    <Loading />
                  )}
                </h3>
                <p className="font-medium text-gray-500 mt-2">
                  {webinar ? (
                    webinar?.grids?.grid2?.description ? (
                      webinar?.grids?.grid2?.description
                    ) : (
                      "No grids column 2 description"
                    )
                  ) : (
                    <Loading />
                  )}
                </p>
              </div>
              <div className="mb-10 md:mb-0 card">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/389125/5f40d1797e3a3_level1.jpg"
                  alt="Level 1"
                  className="w-full mb-4"
                />
                <h3 className="font-bold text-lg">
                  {webinar ? (
                    webinar?.grids?.grid3?.heading ? (
                      webinar?.grids?.grid3?.heading
                    ) : (
                      "No grids column 3 heading"
                    )
                  ) : (
                    <Loading />
                  )}
                </h3>
                <p className="font-medium text-gray-500 mt-2">
                  {webinar ? (
                    webinar?.grids?.grid3?.description ? (
                      webinar?.grids?.grid3?.description
                    ) : (
                      "No grids column 3 description"
                    )
                  ) : (
                    <Loading />
                  )}
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer isWebinar />

      <Modal setOpen={setOpen} open={open} webinar={webinar} />
    </>
  );
}

export default Webinar;
