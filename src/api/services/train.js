import axios from "axios";

const API_URL = "https://36b6-14-187-91-80.ngrok-free.app/train_model/face_detect";

export const train = async () => {
    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",  // Add this header
                "Access-Control-Allow-Origin": "*"      // Add this header
            },
        });

        console.log('Response from train model:', response);
        
        return response.data;
    } catch (error) {
        console.error("Train model failed:", error.response?.data || error);
        throw error;
    }
}