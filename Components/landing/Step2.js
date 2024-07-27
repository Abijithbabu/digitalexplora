import { fetchWrapper } from "../../helpers";
import { BASE_URL } from "../../config";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import getSymbolFromCurrency from "currency-symbol-map";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Step2({
  handleChange,
  state,
  countries,
  provinces,
  products,
  setIsPaid,
  isPaid,
}) {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (products) {
      const product = products?.filter((item) => item.slug === slug);
      if (product) {
        setProduct(product[0]);
      }
    }
  }, [products]);

  if (state.currentStep !== 2) {
    return null;
  }

  const __DEV__ = document.domain === "localhost";

  // on pay button clicked
  const displayRazorpay = async () => {
    setLoading(true);

    const result = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!result) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const res = await fetchWrapper.post(
        `${BASE_URL}/checkout/razorpay/order/${slug}`
      );
      const resJson = await res.json();

      if (resJson.returnStatus === 400) {
        alert(resJson.message);
        setLoading(false);
        setIsPaid(false);
      } else {
        const { amount, id: order_id, currency } = resJson.data;

        const options = {
          key: __DEV__
            ? process.env.RAZORPAY_DEV_ID
            : process.env.RAZORPAY_PROD_ID,
          amount: amount.toString(),
          currency: currency,
          name: "Digital Explora",
          description: "Pay for the product you are selected. Thank you",
          image: "https://www.digitalexplora.in/img/logo.png",
          order_id: order_id,
          handler: async function ({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          }) {
            const user = JSON.parse(localStorage.getItem("user"));

            const body = {
              orderId: razorpay_order_id,
              paymentId: razorpay_payment_id,
              razorpay_signature: razorpay_signature,
              userId: user._id,
              productId: product._id,
            };

            try {
              setLoading(true);
              const res = await fetchWrapper.post(
                `${BASE_URL}/checkout/razorpay/order`,
                body
              );
              const resJson = await res.json();

              if (res.ok) {
                setLoading(false);
                setIsPaid(true);
                console.log(resJson.data);
                localStorage.setItem(
                  "warningMessage",
                  JSON.stringify(resJson.data.warningMessage)
                );
                router.push(`/checkout/${slug}/thankyou`);
              } else {
                console.log(resJson.message);
                setLoading(false);
                setIsPaid(false);
              }
            } catch (error) {
              console.log(error);
              setLoading(false);
              setIsPaid(false);
            }
          },
          prefill: {
            name: "Alex Marsale",
          },
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.on("payment.failed", function (response) {
          alert("Payment failed! Try again...");
          console.log(response.error);
          setIsPaid(false);
        });

        paymentObject.open();
      }
    } catch (error) {
      console.log(error);
      setIsPaid(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          className="field2"
          name="address"
          placeholder="Address..."
          value={state.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        {countries.length > 0 && (
          <select
            name="country"
            className="field2"
            onChange={handleChange}
            value={state.country}
            required
          >
            {countries?.map((country) => (
              <option value={country.iso2} key={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mb-4">
        {provinces.length > 0 && (
          <select
            name="province"
            className="field2"
            onChange={handleChange}
            value={state.province}
            required
          >
            <option value="selectState" disabled>
              Select a state
            </option>
            {provinces?.map((state) => (
              <option value={state.iso2} key={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="field2"
          name="zipcode"
          placeholder="Zipcode..."
          value={state.zipcode}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-4">Details of product to purchase:</h3>
        <p>Product name:</p>
        <p className="text-xl font-bold text-gray-900 mb-2">
          {product ? product.productName : ""}
        </p>
        <p>Price:</p>
        <p className="font-bold text-2xl text-gray-900 mb-3">
          {getSymbolFromCurrency("INR")}
          {product ? product.price : "00.00"}
          <span className="text-sm ml-2 text-green-500">
            {product ? product.gst : "0"}% gst
          </span>
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="terms"
            checked={state.terms}
            onChange={handleChange}
            className="form-checkbox bg-gray-200 rounded w-5 h-5 cursor-pointer mr-4"
            required
          />
          <label className="text-gray-700 font-semibold text-sm mb-0">
            I agree to the{" "}
            <p href="#" className="text-blue-600">
              terms & conditions
            </p>
          </label>
        </div>
      </div>

      {isPaid ? (
        <div className="mb-6 mt-10">
          <div className="py-4 bg-green-500 text-white w-full font-semibold text-sm relative overflow-hidden animate-bounce">
            <div className="relative z-10 flex items-center justify-center">
              <BadgeCheckIcon className="h-6 w-6 mr-1" />
              Payment successfull
            </div>
            <img
              src="https://cliply.co/wp-content/uploads/2019/02/371812620_FIREWORKS_400.gif"
              alt="Paid Successfull"
              className="object-cover w-full h-full absolute left-0 top-0 z-0"
            />
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <button
            disabled={!state.terms || loading}
            className="btn py-3 bg-blue-900 text-white rounded w-full font-semibold text-sm flex items-center justify-center mt-4"
            onClick={() => displayRazorpay()}
          >
            <img
              width="40"
              className="object-contain"
              src="/img/logos/razorpay_icon.svg"
            />
            Pay with Razorpay
          </button>
        </div>
      )}
    </>
  );
}

export default Step2;
