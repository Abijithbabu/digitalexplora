import ELoading from "../../ELoading";
import Breadcrump from "../../Breadcrump";
import BuyProductView from "./BuyProductView";
import AccessProductView from "./AccessProductView";

function ProductView({ product }) {
  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrump
        baseLink="/user/products"
        baseTitle="Products"
        id={product._id}
        itemName={product.productName}
      />
      <div className="p-6 pt-0 lg:px-0">
        {product ? (
          <>
            {product.broughtStatus ? (
              <AccessProductView product={product} />
            ) : (
              <BuyProductView product={product} />
            )}
          </>
        ) : (
          <ELoading />
        )}
      </div>
    </div>
  );
}

export default ProductView;
