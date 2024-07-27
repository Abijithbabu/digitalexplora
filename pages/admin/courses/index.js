import AdminLayout from "../../../Components/admin/AdminLayout";
import CoursePage from "../../../Components/admin/courses/CoursePage";

function courses() {
  return (
    <AdminLayout title="Courses">
      <CoursePage />
    </AdminLayout>
  );
}

export default courses;
