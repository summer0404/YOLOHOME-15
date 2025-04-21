import axios from "axios";

const URL = import.meta.env.VITE_URL_API_AI;

const API_URL = `${URL}/user/list`;


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
            // Extract users array from response data
            return response.data.users || [];
        }
        
        return [];
    } catch (error) {
        console.error("Get users failed:", error.response?.data || error);
        return [];  // Return empty array instead of throwing
    }
}