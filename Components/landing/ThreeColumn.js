import ConsultColItem from "./ConsultColItem";
import { steps } from "../../constants/LandingPage";

function ThreeColumn() {
  return (
    <div
      className="bg-white py-10 md:py-20 max-w-6xl mx-auto px-6 lg:px-0"
      id="courses"
    >
      <div className="max-w-7xl">
        <div className="sectionTitle md:w-3/5 mx-auto text-center mb-6">
          <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
            Products we offer
          </h3>
          <p className="text-sm">
            Digitalexplora is a Full Stack training for Entrepreneurs who wants
            to start, Grow & Scale their Business Online with education & Right
            set of tools
          </p>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-4">
          {steps.map((step) => {
            return (
              <ConsultColItem
                key={step.id}
                img={step.image}
                title={step.title}
                levelTitle={step.levelTitle}
                levelRange={step.levelRange}
                desc={step.desc}
                btnTitle={step.btnTitle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ThreeColumn;
