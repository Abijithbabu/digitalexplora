import { useRouter } from "next/router";
import AdminLayout from "../../../../Components/admin/AdminLayout";
import CourseDetail from "../../../../Components/admin/courses/CourseDetail";
import { useEffect, useState } from "react";
import { courseService } from "../../../../services/course.service";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../store/index";
import ELoading from "../../../../Components/ELoading";

function course() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [course, setCourse] = useState("");
  const { id } = router.query;

  const { fetchRequest, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    fetchRequest();

    if (id) {
      fetchCourse(id);
    }
  }, [id]);

  const fetchCourse = async (courseId) => {
    try {
      const res = await courseService.getById(courseId);
      const resJson = await res.json();
      if (res.ok) {
        setCourse(resJson.data);
        setMessage({ sc: resJson.message, er: "" });
      } else {
        console.log(resJson.message);
        setMessage({ er: resJson.message, sc: "" });
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  };

  return (
    <AdminLayout>
      {course ? (
        <CourseDetail course={course} fetchCourse={fetchCourse} />
      ) : (
        <div className="p-8">
          <ELoading />
        </div>
      )}
    </AdminLayout>
  );
}

export default course;
