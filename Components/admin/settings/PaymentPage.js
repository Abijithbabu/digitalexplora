import { CreditCardIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import AdminNavbar from "../AdminNavbar";

function PaymentPage() {
  const [tabItems, setTabItems] = useState({
    razorpay: true,
    cashfree: false,
    stripe: false,
  });

  const Razorpay = () => {
    return (
      <div className="razorpay">
        <form action="#" className="md:col-span-1">
          <div className="mb-6">
            <label htmlFor="razorpayEmail">Razorpay Email id:</label>
            <input type="text" placeholder="Email Id" className="field" />
          </div>
          <div className="mb-8">
            <label htmlFor="razorpayKey">Razorpay Secret Key:</label>
            <input type="email" placeholder="Secret Key" className="field" />
          </div>
          <div>
            <button className="w-full userBtn">Save</button>
          </div>
        </form>
      </div>
    );
  };

  const Cashfree = () => {
    return (
      <div className="cashfree">
        <form action="#" className="col-span-1">
          <div className="mb-6">
            <label htmlFor="cashfreeEmail">Cashfree Email id:</label>
            <input type="email" placeholder="Email Id" className="field" />
          </div>
          <div className="mb-8">
            <label htmlFor="cashfreeKey">Cashfree Secret Key:</label>
            <input type="text" placeholder="Secret Key" className="field" />
          </div>
          <div>
            <button className="w-full userBtn">Save</button>
          </div>
        </form>
      </div>
    );
  };

  const Stripe = () => {
    return (
      <div className="stripe">
        <form action="#" className="col-span-1">
          <div className="mb-6">
            <label htmlFor="stripeEmail">Stripe Email id:</label>
            <input type="email" placeholder="Email Id" className="field" />
          </div>
          <div className="mb-8">
            <label htmlFor="stripeKey">Stripe Secret Key:</label>
            <input type="text" placeholder="Secret Key" className="field" />
          </div>
          <div>
            <button className="w-full userBtn">Save</button>
          </div>
        </form>
      </div>
    );
  };

  function handleToggle(tab) {
    if (tab === "razorpay") {
      setTabItems({
        razorpay: true,
        cashfree: false,
        stripe: false,
      });
    } else if (tab === "cashfree") {
      setTabItems({
        razorpay: false,
        cashfree: true,
        stripe: false,
      });
    } else {
      setTabItems({
        razorpay: false,
        cashfree: false,
        stripe: true,
      });
    }
  }

  return (
    <>
      <div className="p-6 max-w-md mx-auto">
        <div className="paymentIntegration bg-white rounded-lg shadow-xl">
          <div className="lg:flex bg-gray-100 items-center justify-center rounded-lg px-4 py-2 shadow">
            <button
              className={`block px-6 py-2 rounded-md focus:outline-none mb-3 md:mb-0 transition-opacity ease-in-out duration-300 ${
                tabItems.razorpay ? "opacity-100 bg-white" : "opacity-50"
              }`}
              onClick={() => handleToggle("razorpay")}
            >
              <img
                src="/img/razorpay.png"
                className="h-6 object-contain"
                alt="Razorpay tab button"
              />
            </button>
            <button
              className={`block px-6 py-2 rounded-md focus:outline-none md:ml-2 mb-3 md:mb-0 transition-opacity ease-in-out duration-300 ${
                tabItems.cashfree ? "opacity-100 bg-white" : "opacity-50"
              }`}
              onClick={() => handleToggle("cashfree")}
            >
              <img
                src="/img/cashfree.png"
                className="h-6 object-contain"
                alt="Cashfree tab button"
              />
            </button>
            <button
              className={`block px-6 py-2 rounded-md focus:outline-none md:ml-2 transition-opacity ease-in-out duration-300 ${
                tabItems.stripe ? "opacity-100 bg-white" : "opacity-50"
              }`}
              onClick={() => handleToggle("stripe")}
            >
              <img
                src="/img/stripe.png"
                className="h-10 object-contain"
                alt="stripe tab button"
              />
            </button>
          </div>
          <div className="content p-8">
            {tabItems.razorpay && <Razorpay />}
            {tabItems.cashfree && <Cashfree />}
            {tabItems.stripe && <Stripe />}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
