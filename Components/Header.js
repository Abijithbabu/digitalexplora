import { Container } from "@material-ui/core";
import React from "react";

function Header() {
  return (
    <div className="deHeader text-center" id="header">
      <Container maxWidth="md">
        <h3 className="text-2xl md:text-6xl font-extrabold leading-snug text-white">
          The World’s Largest Ecommerce Event
        </h3>
        <div className="flex items-center justify-evenly mt-4">
          <div className="date flex items-center justify-center">
            <img src="/img/calendar.png" height="30" width="30" alt="Date" />
            <p className="text-md md:text-2xl ml-3 text-white">
              28-29 JUNE 2021
            </p>
          </div>
          <div className="online flex items-center justify-center">
            <img src="/img/live.webp" width="80" alt="Live Webinar" />
            <p className="text-md md:text-2xl ml-3 text-white">Live Webinar</p>
          </div>
        </div>
        <button className="bg-gray-900 hover:bg-gray-800 mt-8 text-white font-semibold text-xl px-20 py-5 hover:shadow-lg transition-all ease-in-out duration-300">
          Buy Now
        </button>
      </Container>
    </div>
  );
}

export default Header;
