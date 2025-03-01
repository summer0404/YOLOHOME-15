import axios from "axios";

const API_URL = "https://36b6-14-187-91-80.ngrok-free.app/users/";

export const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",  // Add this header
                "Access-Control-Allow-Origin": "*"      // Add this header
            },
        });

        // Add debug logging
        console.log('Response:', response);
        
        if (response.data && typeof response.data === 'object') {
            return Array.isArray(response.data) ? response.data : [];
        }
        
        return [];
    } catch (error) {
        console.error("Get users failed:", error.response?.data || error);
        return [];  // Return empty array instead of throwing
    }
}