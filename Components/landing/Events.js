import Event from "./Event";
import { events } from "../../constants/LandingPage";

function Events() {
  return (
    <div className="events bg-gray-100 py-10 md:py-20">
      <div className="px-6 max-w-7xl mx-auto lg:px-0">
        <div className="sectionTitle mb-10 md:w-3/4 mx-auto">
          <h3 className="text-3xl md:text-5xl font-bold capitalize text-gray-900 text-center mb-4 md:mb-5">
            The #1 Ecommerce Event Of 2021
          </h3>
        </div>
        <div className="bg-white shadow-xl rounded-xl p-2 md:p-14">
          {events.map((event) => {
            return <Event event={event} key={event.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Events;
