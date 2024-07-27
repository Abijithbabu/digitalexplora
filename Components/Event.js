import React from "react";
import Image from "next/image";
import { ArrowRight } from "@mui/icons-material";

function Event({ event }) {
  return (
    <div className="event mb-8">
      {event.id % 2 == 0 ? (
        <div className="md:grid md:grid-cols-2 md:gap-4 items-center">
          <div className="colLeft">
            <Image
              width="600"
              height="450"
              layout="responsive"
              alt="Featured Image"
              src={event.featuredImage}
            />
          </div>
          <div className="colRight">
            <div className="flex items-center mb-4">
              <Image width="40" height="40" src={event.icon} />
              <h3 className="text-xl md:text-4xl ml-4 font-extrabold">
                {event.title}
              </h3>
            </div>
            <p>{event.description}</p>
            {event.list.map((listItem) => {
              return (
                <div className="flex my-6" key={listItem.item}>
                  <div className="icon mr-2">
                    <listItem.icon />
                  </div>
                  <div className="listRight">
                    <h3>
                      <span className="text-lg font-bold">
                        {listItem.title}
                      </span>
                      <span className="ml-2">
                        <ArrowRight />
                      </span>
                    </h3>
                    <p>{listItem.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-2 md:gap-4 items-center">
          <div className="colLeft">
            <div className="flex items-center mb-4">
              <Image width="40" height="40" src={event.icon} />
              <h3 className="text-xl md:text-4xl ml-4 font-extrabold">
                {event.title}
              </h3>
            </div>
            <p>{event.description}</p>
            {event.list.map((listItem) => {
              return (
                <div className="flex my-6" key={listItem.item}>
                  <div className="icon mr-2">
                    <listItem.icon />
                  </div>
                  <div className="listRight">
                    <h3>
                      <span className="text-lg font-bold">
                        {listItem.title}
                      </span>
                      <span className="ml-2">
                        <ArrowRight />
                      </span>
                    </h3>
                    <p>{listItem.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="colRight">
            <Image
              width="640"
              height="450"
              layout="responsive"
              alt="Featured Image"
              src={event.featuredImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;
