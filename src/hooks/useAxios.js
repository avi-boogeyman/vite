import { useMemo } from "react";
import axios from "axios";

const useAxios = () => {
  console.log("useAxios");
  const axiosInstance = useMemo(() => {
    console.log("axiosInstance");

    const instance = axios.create({
      baseURL: "http://localhost:9000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ✅ Request Interceptor: Attach Token from Redux
    instance.interceptors.request.use(
      (config) => {
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response Interceptor: Handle Unauthorized Errors
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.error("Unauthorized! Redirecting to login...");
          // Handle logout or token refresh here in the future
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []); // Recreate Axios instance when token changes

  return axiosInstance;
};

export default useAxios;
