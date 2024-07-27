import AdminLayout from "../../../Components/admin/AdminLayout";
import UsersPage from "../../../Components/admin/users/UsersPage";

function users() {
  return (
    <AdminLayout title="User management">
      <UsersPage />
    </AdminLayout>
  );
}
export default users;
