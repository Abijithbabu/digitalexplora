import React from "react";
import AdminLayout from "../../../Components/admin/AdminLayout";
import AdminSettings from "../../../Components/admin/settings/AdminSettings";

function settings() {
  return (
    <AdminLayout title="Settings">
      <AdminSettings />
    </AdminLayout>
  );
}

export default settings;
