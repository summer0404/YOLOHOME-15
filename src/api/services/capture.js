import axios from "axios";

const API_URL = "https://36b6-14-187-91-80.ngrok-free.app/capture-photos/";

export const capture = async (name) => {
    if (!name) {
        throw new Error("Name is required");
    }

    try {
        const response = await axios.get(
            `${API_URL}${encodeURIComponent(name)}`, 
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