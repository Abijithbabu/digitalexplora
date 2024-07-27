import { BookOpenIcon } from "@heroicons/react/outline";
import Link from "next/link";

function AccessProductView({ product }) {
  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-6 mt-5">
      <h3 className="text-center font-bold text-lg col-span-4 mb-5">Courses</h3>
      {product?.courses.length > 0 ? (
        <>
          {product.courses.map((course, index) => (
            <div
              className="rounded shadow hover:shadow-lg overflow-hidden"
              key={index}
            >
              <Link href={`/user/products/${product.slug}/${course.value}`}>
                <p>
                  <img
                    src={
                      course.courseImage
                        ? course.courseImage
                        : "http://dummyimage.com/350x200"
                    }
                    alt={course.label}
                    className="w-full object-cover h-32"
                  />
                  <div className="courseCardBody p-6">
                    <h3 className="font-bold capitalize inline-flex items-center">
                      <BookOpenIcon className="text-blue-600 w-5 h-5 mr-2" />
                      {course.label}
                    </h3>
                    <p className="mt-2">
                      <span className="font-semibold text-blue-600">
                        {course.modules.length} Modules
                      </span>
                      <span className="font-semibold text-green-600 ml-4">
                        {course.modules
                          .map((module) => module?.lessons?.length)
                          .reduce((a, b) => a + b)}{" "}
                        Lessons
                      </span>
                    </p>
                  </div>
                </p>
              </Link>
            </div>
          ))}
        </>
      ) : (
        "No Course found"
      )}
    </div>
  );
}

export default AccessProductView;
