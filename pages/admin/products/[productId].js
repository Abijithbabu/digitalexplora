import { useEffect, useState } from "react";
import AdminLayout from "../../../Components/admin/AdminLayout";
import { useRouter } from "next/router";
import ProductDetail from "../../../Components/admin/products/ProductDetails";
import Loading from "../../../Components/Loading";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store/index";
import { productService } from "../../../services";

function product() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const { productId } = router.query;

  const { fetchRequest, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    fetchRequest();

    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (productId) => {
    try {
      const res = await productService.getById(productId);
      const resJson = await res.json();

      if (res.ok) {
        setProduct(resJson.data);
        setMessage({ sc: resJson.message, er: "" });
      } else {
        console.log(resJson.message);
        setMessage({ er: resJson.message, sc: "" });
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  };

  return (
    <AdminLayout>
      {product ? (
        <ProductDetail product={product} fetchProduct={fetchProduct} />
      ) : (
        <div className="p-8">
          <Loading />
        </div>
      )}
    </AdminLayout>
  );
}

export default product;
