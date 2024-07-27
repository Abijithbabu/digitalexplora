import Link from "next/link";
import Member from "./Member";
import { team } from "../../constants/LandingPage";

function Team() {
  return (
    <div className="speakers bg-white py-10 md:py-20 max-w-7xl px-6 lg:px-0 mx-auto">
      <div className="container">
        <div className="sectionTitle mb-10 md:w-3/4 mx-auto">
          <h3 className="text-xl md:text-5xl font-bold capitalize text-gray-800 text-center mb-5">
            Digitalexplora Team
          </h3>
          <p className="my-6 text-center">
            Come hear from the world’s most successful DTC brand founders, CEOs,
            and CMOs, as well as top industry authorities and the brightest
            minds in ecommerce. They’ll reveal some of the practical strategies
            and exclusive secrets that the biggest businesses (including their
            own) use to grow and profit.
          </p>
        </div>
        <div className="flex flex-nowrap overflow-x-auto lg:grid lg:grid-cols-5 lg:gap-4 text-center">
          {team.map((member) => {
            return <Member member={member} key={member.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Team;
