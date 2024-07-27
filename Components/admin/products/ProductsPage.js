import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../../Loading";
import { CubeIcon } from "@heroicons/react/24/solid";
import { productService } from "../../../services";
import ProductModal from "../../modals/ProductModal";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store/index";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import AdminNavbar from "../AdminNavbar";
import SearchInput from "../../SearchInput";
import NetworkError from "../../NetworkError";
import NoData from "../../NoData";

function ProductsPage() {
  const { products, totalProducts, error, loading } = useSelector(
    (state) => state.products
  );
  const { aside } = useSelector((state) => state.utils);
  const [showModal, setShowModal] = useState(false);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { getAllProducts, setMessage, searchProductAction, setAside } =
    bindActionCreators(actionCreators, dispatch);

  const totalPages = totalProducts ? Math.ceil(totalProducts / limit) : 0;

  useEffect(() => {
    if (!searchTerm) {
      getAllProducts(skip, limit);
      setSearchTerm("");
    } else {
      searchProduct();
    }
  }, [limit, skip, searchTerm]);

  const handleClick = () => {
    setShowModal(true);
  };

  const handlePageSize = (e) => {
    setLimit(Number(e.target.value));
  };

  function goToNextPage() {
    setSkip((skip) => skip + 1);
  }

  function goToPreviousPage() {
    setSkip((skip) => skip - 1);
  }

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
    if (!searchTerm) {
      alert("Enter an input");
      return;
    }
    if (hasChar(searchTerm)) {
      setMessage({ sc: "", er: "Remove special characters" });
      return;
    } else {
      try {
        const res = await productService.search(searchTerm);
        const resJson = await res.json();

        if (res.ok) {
          searchProductAction(resJson);
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

  return (
    <>
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Products</h3>

        <SearchInput
          placeholder="Search product..."
          onChange={handleSearch}
          value={searchTerm}
        />

        <button
          className="userBtn w-full font-medium sm:w-auto sm:ml-2 py-2"
          onClick={handleClick}
        >
          Add Product
        </button>
      </div>

      {error ? (
        <NetworkError error={error} />
      ) : (
        <>
          {loading ? (
            <div className="block sm:grid gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 p-8">
              <Loading />
            </div>
          ) : (
            <div className="block sm:grid gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {products?.length > 0 ? (
                <>
                  {products?.map((product) => {
                    return (
                      <Link
                        href={`/admin/products/${product.slug}`}
                        key={product._id}
                      >
                        <p>
                          <div className="bg-white rounded shadow hover:shadow-xl transition-all ease-in-out duration-300 overflow-hidden mb-2 lg:mb-0 cursor-pointer">
                            <img
                              src={
                                product.imageLink
                                  ? product.imageLink
                                  : "https://dummyimage.com/300x150"
                              }
                              alt={product.name}
                              className="object-cover w-full h-32"
                            />
                            <div className="content p-6">
                              <h2
                                className="capitalize text-gray-700 font-bold truncate w-full"
                                title={product.productName}
                              >
                                {product.productName}
                              </h2>
                              <p className="text-sm text-gray-400 font-medium mt-2">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </p>
                      </Link>
                    );
                  })}
                </>
              ) : (
                <NoData />
              )}
            </div>
          )}
        </>
      )}

      <ProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        getAllProducts={getAllProducts}
        skip={skip}
        limit={limit}
      />
    </>
  );
}

export default ProductsPage;
