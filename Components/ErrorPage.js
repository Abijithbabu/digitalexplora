function ErrorPage() {
  return (
    <div className="text-center">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Connect to internet
      </h3>
      <p>Try to connect to internet</p>
      <button
        className="userBtn py-2 mx-auto mt-4"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
}

export default ErrorPage;
