import Img from "next/image";

function ConsultColItem({
  img,
  title,
  levelTitle,
  levelRange,
  desc,
  btnTitle,
}) {
  return (
    <div className="card rounded-lg shadow-xl overflow-hidden mb-4">
      <div className="card-header">
        <Img
          width="640"
          height="400"
          layout="responsive"
          src={img}
          alt={title}
        />
      </div>
      <div className="card-body px-3 py-8 text-center">
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
        <button className="font-normal text-white shadow-md hover:shadow-xl bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300 cursor-pointer px-8 py-3 rounded capitalize">
          {btnTitle}
        </button>
      </div>
    </div>
  );
}

export default ConsultColItem;
