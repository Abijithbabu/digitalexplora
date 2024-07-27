import { learnKit } from "../../constants/LandingPage";

function TwoColumn() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-6 lg:px-0">
      <div className="container">
        <div className="sectionTitle md:w-3/5 mx-auto text-center ">
          <h3 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">
            <span role="img" aria-label="Learn">
              📚{" "}
            </span>{" "}
            Learn, Grow & Sale the Way that Best Suits your Need
          </h3>
          <p className="text-gray-600">
            Learn Anytime, Anywhere with life long access to our course
            materials. All Course Materials comes with lifetime access which
            means you will have unlimited access where ever you need it.
          </p>
        </div>
        <div>
          {learnKit.map((kit, index) => {
            return (
              <div
                className="md:grid md:grid-cols-2 md:gap-10 mt-8 items-center"
                key={index}
              >
                {kit.id % 2 === 0 ? (
                  <>
                    <div className="flex flex-col-reverse lg:block  mb-2 md:mb-0 p-4">
                      <h3 className="text-xl md:text-3xl text-gray-900 font-bold mb-2">
                        {kit.title}
                      </h3>
                      <p className="text-gray-600 leading-6">
                        {kit.description}
                      </p>
                    </div>
                    <div className="mb-2 md:mb-0">
                      <img
                        src={kit.imgUrl}
                        alt="Materials"
                        className="w-full h-44 lg:h-80 object-cover rounded shadow-xl"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-2 md:mb-0">
                      <img
                        src={kit.imgUrl}
                        alt="Materials"
                        className="w-full h-44 lg:h-80 object-cover rounded shadow-xl"
                      />
                    </div>
                    <div className="mb-2 md:mb-0 p-4">
                      <h3 className="text-xl md:text-3xl text-gray-900 font-bold mb-2">
                        {kit.title}
                      </h3>
                      <p className="text-gray-600 leading-6">
                        {kit.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TwoColumn;
