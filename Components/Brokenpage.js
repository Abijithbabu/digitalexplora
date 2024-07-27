function Brokenpage({ error }) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-10">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">Page has broken</h3>
      <p className="text-red-500">{error}</p>
    </div>
  );
}

export default Brokenpage;
