
import React from "react";
import { BeakerIcon, ComputerDesktopIcon, UserIcon, UsersIcon } from "@heroicons/react/24/outline";

const stats = [
  { id: 1, count: "1000+", title: "Webinars", icon: ComputerDesktopIcon },
  { id: 2, count: "500+", title: "Users", icon: UsersIcon },
  { id: 3, count: "10+", title: "Speakers", icon: UserIcon },
  { id: 4, count: "10+", title: "Products", icon: BeakerIcon },
];

function Stats() {
  return (
    <div className="statsDiv px-6 lg:px-0">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-4 md:grid md:grid-cols-4 md:gap-4 -mt-8 lg:-mt-6 relative z-10">
          {stats.map((item) => (
            <div
              className="stats text-center bg-white shadow-xl rounded-lg p-6"
              key={item.id}
            >
              <item.icon className="w-10 h-10 text-blue-700 mx-auto mb-2" />
              <h3 className="font-bold text-2xl">{item.count}</h3>
              <p className="font-semibold text-sm text-gray-600 tracking-wide uppercase md:mt-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stats;
