import axios from "axios";

const URL = import.meta.env.VITE_URL_API_AI;

const API_URL = `${URL}/upload-faces/`;


export const uploadFace = async (name, files) => {
  if (!files || files.length !== 5) {
    throw new Error("Exactly 5 files are required");
  }

  const formData = new FormData();
  
  // Append each file individually
  files.forEach((file) => {
    formData.append("files", file);
  });
  console.log(`${API_URL}?name=${encodeURIComponent(name)}`);
  try {
    const response = await axios.post(
      `${API_URL}?name=${encodeURIComponent(name)}`, 
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error);
    throw error;
  }
};
