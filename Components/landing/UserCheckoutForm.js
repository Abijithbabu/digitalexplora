import router from "next/router";
import { useState, useEffect } from "react";
// import { BASE_URL } from "../../config";
const BASE_URL = "http://localhost:5000";
import { landingRequests } from "../../config/requests";
import { fetchWrapper } from "../../helpers";
import useFetchData from "../../hooks/useFetchData";
import Step1 from "./userSteps/Step1";

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

function UserCheckoutForm({ user, referalId, slug }) {
  // fetching product data
  const { state: data } = useFetchData(landingRequests.PRODUCTS);
  const [product, setProduct] = useState();

  const [paidStatus, setPaidStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    currentStep: 1,
    email: user.email.toLowerCase(),
    phoneNumber: user.phoneNumber,
    referalId: referalId,
    terms: false,
  });

  useEffect(() => {
    if (data?.data) {
      const product = data?.data?.filter((item) => item.slug === slug);
      if (product) {
        setProduct(product[0]);
      }
    }
  }, [data?.data]);

  function handleChange(event) {
    const { name, value, type } = event.target;
    if (type !== "checkbox") {
      setState({
        ...state,
        [name]: value,
      });
    } else {
      setState({
        ...state,
        [name]: !state.terms,
      });
    }
  }

  // Trigger an alert on form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/checkout/${slug}/thankyou`);
  };

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
console.log('hai',resJson);
if (resJson.returnStatus === 400) {
        console.log('hai kutty',resJson);
        alert(resJson.message);
        setLoading(false);
        setPaidStatus(false);
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
                setPaidStatus(true);
                console.log(resJson.data);
                localStorage.setItem(
                  "warningMessage",
                  JSON.stringify(resJson.data.warningMessage)
                );
                router.push(`/checkout/${slug}/thankyou`);
              } else {
                console.log(resJson.message);
                setLoading(false);
                setPaidStatus(false);
              }
            } catch (error) {
              console.log(error);
              setLoading(false);
              setPaidStatus(false);
            }
          },
          prefill: {
            name: "Alex Marsale",
          },
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.on("payment.failed", function (response) {
          alert("Payment failed! Try again...");
          setPaidStatus(false);
          console.log(response);
        });

        paymentObject.open();
      }
    } catch (error) {
      setPaidStatus(false);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <Step1
        state={state}
        products={data?.data}
        handleChange={handleChange}
        setState={setState}
        loading={loading}
        displayRazorpay={displayRazorpay}
        paidStatus={paidStatus}
        setPaidStatus={setPaidStatus}
      />
    </form>
  );
}

export default UserCheckoutForm;
