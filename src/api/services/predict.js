import axios from "axios";

const URL = import.meta.env.VITE_URL_API_AI;

const API_URL = `${URL}/face_detect`;

export const predict = async () => {
    try {
        const response = await axios.get(
            `${API_URL}`, 
            {
                headers: {
                    "Content-Type": "application/json",
                     "ngrok-skip-browser-warning": "true",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );

        return response.data;
    }
    catch (error) {
        console.error("Capture failed:", error.response?.data || error);
        throw error;
    }
}