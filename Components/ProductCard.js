import React from "react";
import styles from "./ProductCard.module.css";
import Link from "next/link";

function ProductCard({ product }) {
  return (
    <div className="rounded-lg bg-white shadow hover:shadow-xl overflow-hidden border border-gray-200 mb-10 lg:mb-0">
      <div>
        {product?.imageLink ? (
          <img
            src={product.imageLink}
            alt={product.productName}
            width="100%"
            className="object-cover h-36 w-full"
          />
        ) : (
          <img
            src="https://dummyimage.com/300x150"
            alt={product.productName}
            className="object-cover h-36 w-full"
          />
        )}
      </div>
      <div className="p-8">
        <h3 className="capitalize text-lg font-bold mb-2">
          {product.productName}
        </h3>
        <p className="text-gray-500 text-sm">{product.description}</p>
        <div className={styles.card__footer}>
          {product.broughtStatus ? (
            <Link href={`/user/products/${product.slug}`}>
              <p className="block w-full">
                <button className="btn bg-blue-600 text-white text-sm font-semibold py-3 w-full mt-4">
                  Access now
                </button>
              </p>
            </Link>
          ) : (
            <div className="lg:grid grid-cols-2 gap-4 items-center">
              <Link href={`/user/products/${product.slug}`}>
                <p className="block w-full">
                  <button className="btn bg-white border border-blue-600 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white text-sm py-3 px-2 w-full mt-4">
                    Details
                  </button>
                </p>
              </Link>
              <Link href={`/checkout/${product.slug}`}>
                <p className="block w-full">
                  <button className="btn bg-yellow-500 font-semibold text-sm py-3 px-2 w-full mt-4">
                    Buy now
                  </button>
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
