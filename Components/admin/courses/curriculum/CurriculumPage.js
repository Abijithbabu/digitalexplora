import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { courseService } from "../../../../services";
import { useEffect, useState } from "react";
import AdminLayout from "../../AdminLayout";
import Breadcrump from "../../../Breadcrump";
import {
  DotsCircleHorizontalIcon,
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { actionCreators } from "../../../../store";
import { bindActionCreators } from "redux";
import AddModuleModal from "./module/AddModuleModal";
import AddLessonModal from "./lesson/AddLessonModal";
import EditModuleModal from "./module/EditModuleModal";
import ELoading from "../../../ELoading";
import EditLessonModal from "./lesson/EditLessonModal";
import { fetchWrapper } from "../../../../helpers";
import { BASE_URL } from "../../../../config";
import { courseRequests } from "../../../../config/requests";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function CurriculumPage() {
  const { course } = useSelector((state) => state.courses);
  const [showModal, setShowModal] = useState({
    module: false,
    lesson: false,
  });
  const [showEditModal, setEditModal] = useState({
    module: false,
    lesson: false,
  });
  const [moduleId, setModuleId] = useState();
  const [lessonData, setLessonData] = useState();
  const [module, setModule] = useState();

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { setcourse } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (id) {
      getCourse(id);
    }
  }, [id]);

  async function getCourse(courseId) {
    try {
      const res = await courseService.getById(courseId);
      const resJson = await res.json();

      if (res.ok) {
        setcourse(resJson.data);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleLessonModal(moduleId) {
    setShowModal({ ...showModal, lesson: true });
    setModuleId(moduleId);
    // console.log(moduleId);
  }

  function handleEditModule(moduleId) {
    const data = course.modules.find((module) => module._id === moduleId);

    setModule(data);
    setEditModal({ ...showEditModal, module: true });
  }

  async function handleDeleteModule(moduleId) {
    const confirmMsg = window.confirm(
      "Do you want to delete the module permanently?"
    );

    if (!confirmMsg) return;

    try {
      const res = await fetchWrapper.patch(
        `${BASE_URL}${courseRequests.deleteModule}${course.courseDetails._id}/${moduleId}`
      );
      const resJson = await res.json();

      if (res.ok) {
        getCourse(course.courseDetails._id);
        console.log("Course deleted successfully!..");
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteLesson(moduleId, lessonId) {
    const confirmMsg = window.confirm(
      "Do you want to delete the module permanently?"
    );

    if (!confirmMsg) return;

    const body = {
      lessonId: lessonId,
    };

    try {
      const res = await fetchWrapper.delete(
        `${BASE_URL}${courseRequests.deleteLesson}${course.courseDetails._id}/${moduleId}`,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        getCourse(course.courseDetails._id);
        console.log("Course deleted successfully!..");
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditLesson(moduleId, lessonId) {
    setModuleId(moduleId);

    const moduleData = course.modules.find((module) => module._id === moduleId);

    if (moduleData) {
      const data = moduleData.lessons.find((lesson) => lesson._id === lessonId);
      setLessonData(data);
      setEditModal({ ...showEditModal, lesson: true });
    }
  }

  function handleToggle(moduleId) {
    const module = document.getElementById(moduleId);
    const lessons = module.querySelector(".lessons");
    const downIcon = document.getElementById(`downIcon${moduleId}`);

    if (lessons.classList.contains("hidden")) {
      lessons.classList.remove("hidden");
      downIcon.classList.add("rotate-180");
    } else {
      lessons.classList.add("hidden");
      downIcon.classList.remove("rotate-180");
    }
  }

  return (
    <>
      <AdminLayout
        title={`${
          course?.courseDetails?.courseName ?? "Loading..."
        } | Curriculum`}
      >
        <div className="bg-white flex flex-between items-center mb-6">
          <Breadcrump
            baseLink="/admin/courses"
            baseTitle="Courses"
            itemName={course?.courseDetails?.courseName}
            id={id}
            edit={false}
            innerPage={true}
            item="Curriculum"
          />

          <button
            className="userBtn ml-auto py-2 font-medium"
            onClick={() => setShowModal({ ...showModal, module: true })}
          >
            Add new module
          </button>
        </div>

        <main className="curriculum">
          {course ? (
            <>
              {course.modules.length > 0 ? (
                <>
                  {course.modules.map((module, index) => (
                    <div
                      key={index}
                      className="mb-4 rounded-lg"
                      id={module._id}
                    >
                      <div className="module flex items-center bg-green-50 p-4 border-l-2 border-transparent hover:border-green-500 rounded">
                        <DotsCircleHorizontalIcon className="w-5 h-5 mr-2 text-gray-600" />
                        <p
                          className="font-semibold cursor-pointer"
                          onClick={() => handleToggle(module._id)}
                        >
                          {module.moduleName}
                        </p>
                        <button
                          className="ml-auto focus:outline-none"
                          onClick={() => handleEditModule(module._id)}
                        >
                          <PencilAltIcon className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          className="ml-4 focus:outline-none"
                          onClick={() => handleDeleteModule(module._id)}
                        >
                          <TrashIcon className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          className="ml-4 focus:outline-none"
                          onClick={() => handleToggle(module._id)}
                        >
                          <ChevronDownIcon
                            className="w-5 h-5 text-gray-600 transform transition-transform ease-in-out duration-300"
                            id={`downIcon${module._id}`}
                          />
                        </button>
                      </div>
                      <div className="lessons hidden">
                        {module?.lessons?.length > 0 && (
                          <>
                            {module.lessons.map((lesson, index) => (
                              <div
                                className="lesson flex items-center p-4 border-l-2 border-transparent hover:border-green-500 px-8 rounded"
                                key={index}
                              >
                                <DotsCircleHorizontalIcon className="w-5 h-5 mr-2 text-gray-600" />
                                <p>{lesson.lessonName}</p>
                                <button
                                  className="ml-auto"
                                  onClick={() =>
                                    handleEditLesson(module._id, lesson._id)
                                  }
                                >
                                  <PencilAltIcon className="w-5 h-5 text-gray-600" />
                                </button>
                                <button
                                  className="ml-4 focus:outline-none"
                                  onClick={() =>
                                    handleDeleteLesson(module._id, lesson._id)
                                  }
                                >
                                  <TrashIcon className="w-5 h-5 text-gray-600" />
                                </button>
                              </div>
                            ))}
                          </>
                        )}
                        <div className="p-4 hover:bg-green-100">
                          <button
                            className="text-green-600 flex items-center focus:outline-none font-semibold"
                            onClick={() => handleLessonModal(module._id)}
                          >
                            <PlusCircleIcon className="w-5 h-5 mr-2" />
                            Add new lesson
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                "Add new Module"
              )}
            </>
          ) : (
            <div className="p-4 bg-white rounded-lg">
              <ELoading />
            </div>
          )}
        </main>
      </AdminLayout>

      <AddModuleModal
        showModal={showModal.module}
        setShowModal={setShowModal}
        getCourse={getCourse}
      />

      <EditModuleModal
        showModal={showEditModal.module}
        setShowModal={setEditModal}
        moduleData={module}
        getCourse={getCourse}
      />

      <EditLessonModal
        moduleId={moduleId}
        lessonData={lessonData}
        showModal={showEditModal.lesson}
        setShowModal={setEditModal}
        getCourse={getCourse}
      />

      <AddLessonModal
        moduleId={moduleId}
        showModal={showModal.lesson}
        setShowModal={setShowModal}
        getCourse={getCourse}
      />
    </>
  );
}

export default CurriculumPage;
