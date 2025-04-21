import axios from "axios";

const URL = import.meta.env.VITE_URL_API_AI;

const API_URL = `${URL}/face/detect`;

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

export const predictVoice = async (action = "listen") => {
    try {
        const response = await axios.get(
            `${URL}/voice/${action}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Voice ${action} failed:`, error.response?.data || error);
        throw error;
    }
}