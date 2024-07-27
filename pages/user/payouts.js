import UserLayout from "../../Components/user/UserLayout";
import PayoutPage from "../../Components/user/payouts/PayoutPage";

function payouts() {
  return (
    <UserLayout title="Payouts">
      <PayoutPage />
    </UserLayout>
  );
}

export default payouts;
