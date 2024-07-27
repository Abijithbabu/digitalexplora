import { useState } from "react";
import { useEffect } from "react";

function useGetToken() {
  const [authToken, setToken] = useState("");
  //fetching token from localStorage
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("deToken"));
    setToken(token);
  }, []);

  return authToken;
}

export default useGetToken;
