import { useEffect } from "react";
import Router from "next/router";

function error() {
  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (navigator.onLine) {
        Router.back();
      }
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <h3 className="text-red-600 bg-red-50 border border-red-500 p-4 rounded-lg">
        Network Error!... Please check your internet connection
      </h3>
    </div>
  );
}

export default error;
