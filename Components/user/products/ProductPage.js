import ProductCard from "@/Components/ProductCard";
import styles from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import { productService, userService } from "@/services";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import { useSelector } from "react-redux";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

function ProductPage() {
  const { user } = useSelector((state) => state.users);
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (!searchTerm && user._id) {
      getAllProducts(user._id);
      setSearchTerm("");
    } else {
      searchProduct();
    }
  }, [limit, skip, searchTerm]);

  const getAllProducts = async (userId) => {
    setLoading(true);
    try {
      const res = await userService.getUserProducts(userId);
      const resJson = await res.json();

      if (res.ok) {
        setProducts(resJson.data);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }

    setLoading(false);
  };

  function handleSearch(e) {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm.toLowerCase());
  }

  const hasChar = (string) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(string);
  };

  const searchProduct = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (hasChar(searchTerm)) {
      setMessage({ sc: "", er: "Remove special characters" });
      return;
    } else {
      setMessage({ sc: "", er: "" });
      try {
        const res = await productService.search(searchTerm);
        const resJson = await res.json();

        if (res.ok) {
          setProducts(resJson.data);
          setMessage({ sc: resJson.message, er: "" });
        } else {
          setMessage({ sc: "", er: resJson.message });
        }
      } catch (error) {
        console.error(error);
      }
    }
    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  };

  if (error) {
    return (
      <div className="p-4 lg:p-10">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="products">
      <div
        className={`${styles.productHeader} bg-gray-900 bg-blend-darken py-10 px-10 lg:px-0 lg:py-14`}
      >
        <div className="pageTitle text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">
            The world's largest selection of products
          </h2>
          <p>
            Choose from 130,000 online video products with new additions
            published every month
          </p>
          <div className="flex items-center justify-between p-4 px-4 rounded bg-gray-50 ml-auto shadow-md mt-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="bg-transparent border-none text-sm flex-1 focus:outline-none text-gray-900"
              placeholder="Search products..."
              autoFocus={true}
            />
            <MagnifyingGlassCircleIcon className="w-5 h-5 text-gray-900" />
          </div>
        </div>
      </div>
      {/* mainbody */}
      <div className="py-10 px-6 lg:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-4 lg:gap-4">
            {!isLoading ? (
              <>
                {products.length > 0 ? (
                  <>
                    {products.map((product, index) => (
                      <ProductCard product={product} key={index} />
                    ))}
                  </>
                ) : (
                  <p>No products found</p>
                )}
              </>
            ) : (
              <>
                {Array(4).fill(
                  <div className="rounded bg-white shadow hover:shadow-xl overflow-hidden">
                    <div className="h-36 w-full bg-gray-200 animate-pulse"></div>
                    <div className="p-8">
                      <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>

                      <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>

                      <p className="capitalize text-lg font-bold mb-2 animate-pulse w-full bg-gray-200 h-5"></p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
