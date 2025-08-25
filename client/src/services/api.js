import axios from "axios";

// Create axios instance
const api = axios.create({
    baseURL: "/api", // Vite proxy forwards /api to backend
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});



// Response interceptor (error handling)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            error.message = data?.message || `Request failed with status ${status}`;
        } else if (error.request) {
            error.message = "Network error. Please check your connection.";
        } else {
            error.message = "An unexpected error occurred.";
        }
        return Promise.reject(error);
    }
);

// API endpoints
export const dealsApi = {
    getDeals: (params = {}) => api.get("/deals", { params }),
    getDeal: (id) => api.get(`/deals/${id}`),
   
};

export default api;
