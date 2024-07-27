import { StarIcon } from "@heroicons/react/24/solid";
import { reviews } from "../../constants/LandingPage";

function Reviews() {
  return (
    <div className="reviews py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-20">
          <div className="sectionTitle mb-10 md:w-3/4 mx-auto">
            <h3 className="text-xl md:text-4xl font-bold capitalize text-gray-900 text-center mb-4 md:mb-10">
              What attendees say about our events
            </h3>
          </div>
          <div className="md:grid md:grid-cols-4 md:gap-8">
            {reviews.map((review) => {
              return (
                <div
                  className="reviewItem flex flex-col justify-between text-center mb-3 md:mb-0"
                  key={review.id}
                >
                  <div className="flex justify-center">
                    {Array(review.rating)
                      .fill()
                      .map((_, i) => (
                        <StarIcon className="h-5 text-yellow-300" key={i} />
                      ))}
                  </div>
                  <h3 className="mb-3">“{review.text}”</h3>
                  <img
                    src={review.logo}
                    height="30"
                    alt="review logo"
                    className="mx-auto"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
