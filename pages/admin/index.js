import React from "react";
import AdminLayout from "../../Components/admin/AdminLayout";
import Analytics from "../../Components/admin/Analytics";
import Brokenpage from "../../Components/Brokenpage";
import { adminRequests } from "../../config/requests";
import useFetchData from "../../hooks/useFetchData";

function AdminDashboard() {
  const { state } = useFetchData(adminRequests.getAnalytics);
  return (
    <AdminLayout title="Analytics">
      {state?.error ? (
        <Brokenpage />
      ) : state?.loading ? (
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <Analytics data={state?.data} />
      )}
    </AdminLayout>
  );
}

export default AdminDashboard;
