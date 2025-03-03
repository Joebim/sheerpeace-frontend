import axios from "axios";
import useUserStore from "@/store/user.store";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Add an interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response, // Return the response if successful
  (error) => {
    if (error.response?.status === 401 && error.response?.data?.message === "Invalid token.") {
      useUserStore.getState().logout(); // Logout if JWT is invalid
    }
    return Promise.reject(error); // Pass the error along
  }
);

export default apiClient;
