import UserLayout from "../../Components/user/UserLayout";
import Analytics from "../../Components/user/Analytics";

function Dashboard() {
  return (
    <>
      <UserLayout title="Home">
        <Analytics />
      </UserLayout>
    </>
  );
}

export default Dashboard;
