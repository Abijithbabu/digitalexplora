import AdminLayout from "../../../Components/admin/AdminLayout";
import ProductsPage from "../../../Components/admin/products/ProductsPage";

function adminProducts() {
  return (
    <AdminLayout title="Products">
      <ProductsPage />
    </AdminLayout>
  );
}

export default adminProducts;
