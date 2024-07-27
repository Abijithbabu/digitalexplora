import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { fetchWrapper } from "../../../helpers";
import { BASE_URL } from "../../../config";

function Step1({
  handleChange,
  state,
  setState,
  products,
  loading,
  paidStatus,
  displayRazorpay,
}) {
  const [product, setProduct] = useState();
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

  useEffect(() => {
    getReferalId();
  }, []);

  async function getReferalId() {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/user/reffered/${user._id}`
      );
      const resJson = await res.json();

      if (res.ok) {
        if (resJson.data.isAmbassodor) {
          setState({ ...state, referalId: resJson.data.referredBy });
        }
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (state.currentStep !== 1) {
    return null;
  }

  return (
    <>
      <div className="mb-4">
        <h3 className="text-center capitalize text-xl font-bold">
          billing info
        </h3>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="field2"
          name="email"
          placeholder="Email id..."
          value={state.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="field2"
          name="phoneNumber"
          placeholder="Phone number..."
          value={state.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="field2"
          name="referalId"
          placeholder="Referal ID..."
          value={state.referalId}
          onChange={handleChange}
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
          <label className="text-gray-700 font-semibold text-sm">
            I agree to the{" "}
            <p href="#" className="text-blue-600">
              terms & conditions
            </p>
          </label>
        </div>
      </div>

      {paidStatus ? (
        <div className="mb-6">
          <button className="py-4 bg-green-500 text-white rounded w-full font-semibold text-sm flex items-center justify-center mt-4">
            <BadgeCheckIcon className="h-6 w-6 mr-1 animate-bounce" />
            Payment successfull
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <button
            disabled={!state.terms || loading}
            className="btn py-3 bg-blue-900 text-white rounded w-full font-semibold text-sm flex items-center justify-center mt-4"
            onClick={() => displayRazorpay(product._id)}
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

export default Step1;
