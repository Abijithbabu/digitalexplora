function NetworkError({ error }) {
  return (
    <div className="py-10 text-center">
      <span className="font-semibold bg-red-100 text-red-500 border-2 border-red-500 p-4 rounded">
        {error}
      </span>
    </div>
  );
}

export default NetworkError;
