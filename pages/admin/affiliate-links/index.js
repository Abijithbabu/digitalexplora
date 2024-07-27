import AdminLayout from "../../../Components/admin/AdminLayout";
import AffiliateLinksPage from "../../../Components/admin/affiliates/AffiliateLinksPage";

function index() {
  return (
    <AdminLayout title="Affiliate Links">
      <AffiliateLinksPage />
    </AdminLayout>
  );
}

export default index;
