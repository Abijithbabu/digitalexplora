import UserLayout from "../../Components/user/UserLayout";
import useFetchData from "../../hooks/useFetchData";
import { userRequests } from "../../config/requests";
import Card from "../../Components/user/leaderboard/Card";
import Brokenpage from "../../Components/Brokenpage";
import NoData from "../../Components/NoData";

function leaderboard() {
  const { state } = useFetchData(userRequests.getLeaderboard);

  console.log(state);

  return (
    <UserLayout title="Leaderboard">
      {state?.error ? (
        <Brokenpage />
      ) : (
        <div className="max-w-6xl mx-auto py-10">
          <h3 className="text-center text-xl font-bold mb-6">
            👑 Leaderboard (TOP 10)
          </h3>
          <div className="md:grid md:grid-cols-3 md:gap-4">
            <Card title="Today" data={state?.data?.today?.slice(0, 10)} />
            <Card title="All time" data={state?.data?.year?.slice(0, 10)} />
            <Card
              title="Last 30 days"
              data={state?.data?.month?.slice(0, 10)}
            />
          </div>
        </div>
      )}
    </UserLayout>
  );
}

export default leaderboard;
