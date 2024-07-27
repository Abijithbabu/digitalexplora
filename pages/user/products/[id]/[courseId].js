import Link from "next/link";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  ChevronUpIcon,
  MenuIcon,
} from "@heroicons/react/24/solid";
import CheckIconOutline from "@heroicons/react/outline/CheckCircleIcon";
import styles from "../../../../styles/CourseView.module.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../store";
import { useEffect, useState } from "react";
import { courseService } from "../../../../services/course.service";
import { useRouter } from "next/router";
import Iframe from "../../../../Components/Iframe";
import { Disclosure } from "@headlessui/react";
import { useSelector } from "react-redux";
import { fetchWrapper } from "../../../../helpers";
import { BASE_URL } from "../../../../config";

function CourseView() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { logout, setMessage } = bindActionCreators(actionCreators, dispatch);
  const router = useRouter();
  const { courseId } = router.query;

  const [state, setState] = useState(false);
  const [course, setCourse] = useState();
  const [selectedLesson, setSelectedLesson] = useState();
  const [redirectLink, setRedirectLink] = useState(null);
  const [referralId, setReferralId] = useState();

  useEffect(() => {
    if (courseId) {
      getCourse(courseId);
    }
  }, [courseId]);

  useEffect(async () => {
    if (selectedLesson?._id) {
      try {
        const res = await fetchWrapper.get(
          `${BASE_URL}/course/get-lesson-redirect-link/${selectedLesson._id}`
        );
        const resJson = await res.json();

        if (res.ok) {
          console.log(resJson.data);
          setRedirectLink(resJson.data);
        } else {
          console.log(resJson.message);
          setMessage({ sc: "", er: resJson.message });
        }
      } catch (error) {
        console.log(error.message);
        setMessage({ sc: "", er: error.message });
      }
    }
  }, [selectedLesson?._id]);

  async function getCourse(courseId) {
    try {
      const res = await courseService.getById(courseId);
      const resJson = await res.json();

      if (res.ok) {
        setCourse(resJson.data);
        setSelectedLesson(resJson.data.modules[0].lessons[0]);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function goBack() {
    router.back();
  }

  return (
    <>
      <nav className="bg-gray-900 h-14 px-4 flex items-center sticky top-0 z-50">
        <button title="Go back" onClick={goBack}>
          <ArrowLeftIcon className="w-4 h-4 text-gray-300 mr-6" />
        </button>
        <div className="logo">
          <h3 className="uppercase text-white font-bold">Digital explora</h3>
        </div>
        <h3 className="text-white ml-8 capitalize">
          {course ? course.courseDetails.courseName : "Loading..."}
        </h3>
        <div className="menu relative ml-auto">
          <MenuIcon
            className="w-5 h-5 text-gray-500 ml-auto cursor-pointer"
            onClick={() => setState((prevState) => !prevState)}
          />
          <ul
            className={`${
              styles.menuPanel
            } bg-white rounded absolute right-0 top-10 shadow-xl overflow-hidden ${
              state ? "block" : "hidden"
            }`}
          >
            <li>
              <Link href="/user">
                <p>Dashboard</p>
              </Link>
            </li>
            <li>
              <p href="/login" onClick={() => logout()}>
                Logout
              </p>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className="lg:grid lg:grid-cols-12 courseView"
        onClick={() => setState(false)}
      >
        <div className="col-span-3 min-h-screen bg-gray-100">
          <aside className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text font-bold">Course Content</h1>
            </div>

            {course?.modules?.length > 0 ? (
              <>
                {course?.modules.map((module) => (
                  <div key={module?._id}>
                    <Disclosure as="div" className="mt-4">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <div>
                              <h3 className="font-bold">{module.moduleName}</h3>
                              <p className="text-xs text-gray-400 font-medium">
                                5/5 | 15 min
                              </p>
                            </div>
                            <ChevronUpIcon
                              className={`${
                                open ? "transform rotate-180" : ""
                              } w-5 h-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            {module?.lessons?.length > 0 ? (
                              <>
                                {module?.lessons.map((lesson, index) => (
                                  <div
                                    key={lesson?._id}
                                    className={`cursor-pointer hover:bg-white hover:shadow-lg focus:bg-white p-4 rounded transition-all ease-in-out duration-300 ${
                                      selectedLesson?._id === lesson?._id
                                        ? "bg-white"
                                        : ""
                                    }`}
                                    onClick={() => setSelectedLesson(lesson)}
                                  >
                                    <div className="lessons flex">
                                      <CheckIconOutline className="w-5 h-5" />
                                      <div className="text-gray-600 flex-1 ml-2">
                                        {index + 1}. {lesson.lessonName}
                                        <span className="flex text-xs mt-2">
                                          <BookOpenIcon className="w-4 h-4 text-gray-400 mr-1" />{" "}
                                          1 min
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </>
                            ) : (
                              "No courses found"
                            )}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                ))}
              </>
            ) : (
              "No courses found"
            )}
          </aside>
        </div>

        <div className="col-span-9">
          <main className="video">
            <Iframe id="courseVideo" src={selectedLesson?.embedUrl} />
            <div className="p-6 lg:p-10">
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {selectedLesson ? selectedLesson?.lessonName : "Loading..."}
                </h3>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="font-medium mb-4">
                  {selectedLesson ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedLesson?.description,
                      }}
                      className="courseDescription"
                    ></div>
                  ) : (
                    "Loading..."
                  )}
                </p>
                <label>Redirect link</label>
                {redirectLink ? (
                  <p
                    href={redirectLink}
                    className="text-blue-600 cursor-pointer underline"
                  >
                    {redirectLink}
                  </p>
                ) : (
                  "--"
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default CourseView;
