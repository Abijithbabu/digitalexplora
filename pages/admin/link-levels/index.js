import LinkLevels from "../../../Components/admin/linkLevels/LinkLevels";
import AdminLayout from "../../../Components/admin/AdminLayout";

function index() {
  return (
    <AdminLayout title="Link levels">
      <LinkLevels />
    </AdminLayout>
  );
}

export default index;
