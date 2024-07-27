import { BookOpenIcon } from "@heroicons/react/24/solid";
import CourseModal from "../../modals/CourseModal";
import Table from "../../Table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { courseService } from "../../../services";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store/index";
import ELoading from "../../ELoading";
import AdminNavbar from "../AdminNavbar";
import SearchInput from "../../SearchInput";

const COLUMNS = [
  {
    Header: "Course Name",
    accessor: "courseName",
    Cell: ({ row }) => (
      <div className="flex items-center">
        <img
          src={
            checkUrl(row?.original?.courseImage)
              ? row?.original?.courseImage
              : "/img/no_image.jpg"
          }
          className="w-32 object-cover rounded-md mr-2"
          alt={row.original.courseName}
        />
        <Link
          href={`/admin/courses/${row?.original?._id}?=${row?.original?.courseName}`}
        >
          <p className="text-blue-500 font-bold capitalize text-sm">
            {row?.original?.courseName}
          </p>
        </Link>
      </div>
    ),
  },
  {
    Header: "Description",
    accessor: "description",
    Cell: ({ row }) => (
      <>
        <p
          className="text-gray-800 w-44 line-clamp-3"
          title={row?.original?.description}
        >
          {row?.original?.description}
        </p>
      </>
    ),
  },
  {
    Header: "Created Date",
    accessor: "createdDate",
  },
  {
    Header: "Total Modules",
    accessor: "totalModules",
    Cell: ({ row }) => (
      <>
        <p className="text-gray-800">{row.original.modules.length ?? 0}</p>
      </>
    ),
  },
  {
    Header: "Total Lessons",
    accessor: "totalLessons",
    Cell: ({ row }) => {
      if (row.original.modules) {
        if (row.original.modules.length > 0) {
          const modules = row.original.modules;
          const totalLessons = modules
            .map((module) => module?.lessons?.length)
            .reduce((a, b) => a + b);
          return <p className="text-gray-800">{totalLessons}</p>;
        }
      }
      return <p className="text-gray-800">0</p>;
    },
  },
];

function checkUrl(url) {
  if (!url) return null;
  return url.match(/\.(jpeg|jpg|gif|png|JPG)$/) != null;
}

function CoursePage() {
  const courseState = useSelector((state) => state.courses);
  const [showModal, setShowModal] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [errorComponent, setError] = useState(false);

  const dispatch = useDispatch();
  const { setCourses, setMessage, searchCourseAction } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    const totalCourses = JSON.parse(localStorage.getItem("totalCourses"));
    if (!searchTerm) {
      if (totalCourses < limit) {
        setTotalPages(1);
      } else {
        setTotalPages(Math.ceil(totalCourses / limit));
      }
    } else {
      if (totalCourses < limit) {
        setTotalPages(1);
      } else {
        setTotalPages(Math.ceil(totalCourses / limit));
      }
    }
  }, [skip, limit]);

  useEffect(() => {
    const fetchLoading = true;
    if (!searchTerm) {
      getAllCourses(fetchLoading);
      setSearchTerm("");
    } else {
      searchCourse();
    }
  }, [limit, skip, searchTerm]);

  const getAllCourses = async (fetchLoading) => {
    setError(false);
    if (fetchLoading) {
      setIsFetching(true);
    }
    try {
      const response = await courseService.getAll(skip, limit);
      const resJson = await response.json();

      if (response.ok) {
        setCourses(resJson);
        localStorage.setItem("totalCourses", resJson.data.totalCourses);
        setIsFetching(false);
      } else {
        localStorage.setItem("totalCourses", null);
        console.log(resJson.message);
        setIsFetching(false);
      }
    } catch (error) {
      console.log(error);
      setIsFetching(false);
      setError(true);
    }
    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  };

  function handleSearch(e) {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm.toLowerCase());
  }

  const hasChar = (string) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(string);
  };

  const searchCourse = async (event) => {
    setError(false);
    if (event) {
      event.preventDefault();
    }
    if (!searchTerm) {
      alert("Enter an input");
      return;
    }
    if (hasChar(searchTerm)) {
      setMessage({ sc: "", er: "Remove special characters" });
      return;
    } else {
      try {
        const res = await courseService.search(searchTerm);
        const resJson = await res.json();

        if (res.ok) {
          searchCourseAction(resJson);
        } else {
          setMessage({ sc: "", er: resJson.message });
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
      setTimeout(() => {
        setMessage({ sc: "", er: "" });
      }, 3000);
    }
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Courses</h3>

        <SearchInput placeholder="Search courses..." onChange={handleSearch} />

        <button
          className="userBtn w-full font-medium sm:w-auto sm:ml-2 py-2"
          onClick={() => setShowModal(true)}
        >
          Add Course
        </button>
      </div>

      <div className="courses">
        {isFetching || !courseState ? (
          <ELoading />
        ) : (
          <>
            {courseState?.courses.length > 0 ? (
              <Table
                DATA={courseState?.courses.filter(
                  (course) => course.suspended === false
                )}
                COLUMNS={COLUMNS}
                skip={skip}
                limit={limit}
                setSkip={setSkip}
                setLimit={setLimit}
                totalPages={totalPages}
              />
            ) : errorComponent ? (
              <div className="p-8 text-center col-span-4">
                <p className="text-base text-red-500">
                  Something went wrong...
                </p>
              </div>
            ) : (
              <div className="p-8 text-center col-span-4">
                <p className="text-base">No data Found</p>
                <p className="text-3xl font-semibold">Add a course</p>
              </div>
            )}
          </>
        )}
      </div>
      <CourseModal
        showModal={showModal}
        setShowModal={setShowModal}
        getAllCourses={getAllCourses}
      />
    </>
  );
}

export default CoursePage;
