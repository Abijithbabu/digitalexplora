function NoData() {
  return (
    <div className="text-center col-span-4">
      <img
        src="/img/data-not-found.webp"
        width="150"
        className="mx-auto"
        alt=""
      />
      <h3 className="text-2xl mb-1 font-bold text-gray-800">Oops!</h3>
      <p className="text-gray-400 font-semibold">No data found</p>
    </div>
  );
}

export default NoData;
