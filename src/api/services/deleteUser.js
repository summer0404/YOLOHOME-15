import axios from "axios";

const API_URL = "https://36b6-14-187-91-80.ngrok-free.app/delete/";

export const deleteUser = async (name) => {
    if (!name) {
        throw new Error("Name is required");
    }

    try {
        const response = await axios.delete(
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
        console.error("Delete failed:", error.response?.data || error);
        throw error;
    }
}