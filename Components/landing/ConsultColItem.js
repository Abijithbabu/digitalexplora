import Link from "next/link";

function ConsultColItem({ img, title, desc, levelTitle, levelRange }) {
  return (
    <div className="card rounded-lg shadow-xl overflow-hidden mb-4 flex flex-col justify-between border border-gray-200">
      <div className="card-header">
        <img
          src={img ? img : "/img/no_image.jpg"}
          className="w-full h-52 object-cover rounded-lg"
          alt={title}
        />
      </div>
      <div className="card-body px-3 py-8 pb-4 text-center">
        <h3 className="md:text-2xl font-semibold text-gray-900 capitalize">
          {title} <sup className="text-xs">TM</sup>
        </h3>
        <p className="text-sm text-gray-500 my-4 capitalize">{levelTitle}</p>
        <div className="shadow w-1/2 mx-auto rounded-lg overflow-hidden bg-gray-200">
          <div
            className="bg-blue-600 text-xs leading-none py-1 text-center text-white"
            style={{ width: levelRange }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 my-4">{desc}</p>
        <Link href={`/webinars`}>
          <p className="userBtn px-4 lg:px-14 mx-auto">Access Now</p>
        </Link>
      </div>
    </div>
  );
}

export default ConsultColItem;
