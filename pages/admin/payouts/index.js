import AdminLayout from "../../../Components/admin/AdminLayout";
import PayoutsPage from "../../../Components/admin/payouts/PayoutsPage";

export default function payment() {
  return (
    <AdminLayout title="Payouts">
      <PayoutsPage />
    </AdminLayout>
  );
}
