import { features } from "../../constants/LandingPage";

function Features() {
  return (
    <div className="py-10 md:py-20 px-10 md:px-10 bg-gray-50 max-w-7xl mx-auto">
      <h3 className="text-3xl md:text-5xl font-bold capitalize text-gray-900 text-center mb-10">
        Explore Digital explora Tracks
      </h3>
      {features.map((feature, index) => {
        return (
          <div
            key={index}
            className={`featureItems transition-all ease-linear duration-200 rounded-lg px-6 py-6 ${
              feature.id % 2 === 0
                ? "bg-gradient-to-tr from-blue-700 to-blue-500 text-white"
                : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <span
                className={
                  feature.id % 2 === 0 ? "text-blue-600" : "text-gray-900"
                }
              >
                <feature.icon />
              </span>
              <h3 className="text-xl md:text-2xl ml-4 font-semibold capitalize">
                {feature.title}
              </h3>
            </div>
            <p>{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Features;
