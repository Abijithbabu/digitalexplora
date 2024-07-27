import { useRouter } from "next/router";
import UserLayout from "../../../../Components/user/UserLayout";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../../store";
import ProductView from "../../../../Components/user/products/ProductView";
import { fetchWrapper } from "../../../../helpers";
import { BASE_URL } from "../../../../config";
import { userRequests } from "../../../../config/requests";

function product() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const { id, status } = router.query;

  const { fetchRequest, setUserProduct, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    fetchRequest();

    if (id && user) {
      fetchProduct(user._id, id);
    }
  }, [id, user]);

  const fetchProduct = async (userId, productId) => {
    const body = {
      userId: userId,
    };

    try {
      const res = await fetchWrapper.post(
        `${BASE_URL}${userRequests.getProduct}${productId}`,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        setProduct(resJson.data);
        setUserProduct(resJson.data);
      } else {
        console.log(resJson.message);
        setMessage({ sc: "", er: resJson.message });
      }
    } catch (error) {
      setMessage({ sc: "", er: error.message });
      console.log(error.message);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  };

  return (
    <UserLayout>
      <ProductView
        product={product}
        status={status}
        fetchProduct={fetchProduct}
      />
    </UserLayout>
  );
}

export default product;
