import { useEffect } from "react";
import { productService } from "../services";

function useFetchProducts(id, fetchRequest) {
  useEffect(() => {
    fetchRequest();

    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      const res = await productService.getById(productId);
      const resJson = await res.json();
      return resJson.data;
    } catch (error) {
      return error;
    }
  };
}

export default useFetchProducts;
