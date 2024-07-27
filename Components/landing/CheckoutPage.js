import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import UserCheckoutForm from "./UserCheckoutForm";

function CheckoutPage() {
  const router = useRouter();
  const asPath = router.asPath;
  const { slug } = router.query;

  // const { user } = useSelector((state) => state.auth);
  const [user, setUser] = useState();
  const [referalId, setReferalId] = useState("admin");

  useEffect(() => {
    if (!slug) {
      alert("Select a product");
      router.push("/products");
    }

    var urlParams = localStorage.getItem("urlParams");
    var refId;

    if (asPath.indexOf("ref=") !== -1) {
      refId = asPath.split("ref=");
    }

    if (urlParams && asPath.indexOf("ref=") === -1) {
      router.replace(`${asPath}?${urlParams}`);
      refId = urlParams.split("ref=");
    } else {
      refId = asPath.split("ref=");
    }

    setReferalId(refId[1]);
  }, [asPath]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setUser(user);
  }, []);

  return (
    <div className="p-4 lg:p-8 bg-blue-900 min-h-screen">
      <div className="max-w-lg mx-auto">
        <div className="bg-white shadow-4xl rounded-xl border-transparent overflow-hidden px-6 lg:px-14 py-6">
          {!user && <CheckoutForm />}

          {user && (
            <UserCheckoutForm user={user} referalId={referalId} slug={slug} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
