import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://trademach-backend-production.up.railway.app/api",
  withCredentials: true, // Required to send HttpOnly cookies
});

// Attach access token to every request
apiClient.interceptors.request.use((config) => {
  const access = localStorage.getItem("access_token");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// Response interceptor to refresh access token on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only try refresh if 401 and not retrying already
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/token/refresh/")
    ) {
      originalRequest._retry = true;

      try {
        // Send refresh request; backend reads refresh token from HttpOnly cookie
        const res = await axios.post(
          "http://localhost:8000/api/token/refresh/",
          {},
          { withCredentials: true } // cookies included
        );

        const newAccessToken = res.data.access;

        // Store new access token in localStorage (or memory)
        localStorage.setItem("access_token", newAccessToken);

        // Update Authorization header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError.response?.data);
        console.error("Status:", refreshError.response?.status);

        // Optional: force logout
        localStorage.removeItem("access_token");
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
