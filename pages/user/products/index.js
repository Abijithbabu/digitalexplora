import UserLayout from "../../../Components/user/UserLayout";
import ProductPage from "../../../Components/user/products/ProductPage";

function products() {
  return (
    <UserLayout title="Products">
      <ProductPage />
    </UserLayout>
  );
}

export default products;
