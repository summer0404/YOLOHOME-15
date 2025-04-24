import axios from "axios";

const URL = import.meta.env.VITE_URL_API_AI;

const API_URL = `${URL}/system/train`;

export const train = async () => {
    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",  
                "Access-Control-Allow-Origin": "*" 
            },
        });

        console.log('Response from train model:', response);
        
        return response.data;
    } catch (error) {
        console.error("Train model failed:", error.response?.data || error);
        throw error;
    }
}