import React from "react";

function Event({ event }) {
  return (
    <div className="event mb-8">
      {event.id % 2 === 0 ? (
        <div className="md:grid md:grid-cols-2 md:gap-10 items-center">
          <div className="colLeft">
            <img
              alt="Featured"
              className="rounded-lg w-full"
              src={event.featuredImage}
            />
          </div>
          <div className="colRight">
            <div className="flex items-center mb-4">
              <img
                width="40"
                height="40"
                className="rounded"
                src={event.icon}
                alt="icon"
              />
              <h3 className="text-xl md:text-3xl ml-4 font-extrabold">
                {event.title}
              </h3>
            </div>
            <p className="text-gray-600 leading-6">{event.description}</p>
            {event.list.map((listItem, index) => {
              return (
                <div className="flex my-6" key={index}>
                  <div className="icon mr-2 text-gray-600">{listItem.icon}</div>
                  <div className="listRight">
                    <div className="flex">
                      <span className="text-lg font-bold capitalize">
                        {listItem.title}
                      </span>
                      <span className="ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    </div>
                    <p className="text-gray-600 leading-6">
                      {listItem.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-2 md:gap-10 items-center mb-6">
          <div className="colLeft">
            <div className="flex items-center mb-4">
              <img
                width="40"
                height="40"
                className="rounded"
                src={event.icon}
                alt="Icon"
              />
              <h3 className="text-xl md:text-3xl ml-4 font-extrabold">
                {event.title}
              </h3>
            </div>
            <p className="text-gray-600 leading-6">{event.description}</p>
            {event.list.map((listItem) => {
              return (
                <div className="flex my-6" key={listItem.item}>
                  <div className="icon mr-2 text-gray-600">{listItem.icon}</div>
                  <div className="listRight">
                    <div className="flex">
                      <span className="text-lg font-bold capitalize">
                        {listItem.title}
                      </span>
                      <span className="ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    </div>
                    <p className="text-gray-600 leading-6">
                      {listItem.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="colRight">
            <img
              alt="Featured"
              className="rounded-lg w-full"
              src={event.featuredImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;
