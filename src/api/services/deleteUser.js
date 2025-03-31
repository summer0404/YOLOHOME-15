import axios from "axios";

const URL = import.meta.env.VITE_URL_API_AI;

const API_URL = `${URL}/delete/`;

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