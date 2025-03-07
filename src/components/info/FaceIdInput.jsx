import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { uploadFace } from "../../api/services/uploadFaces";

export default function FaceIdInput() {
  const [name, setName] = useState("");
  const [files, setFiles] = useState(Array(5).fill(null)); // Store 5 files
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [previews, setPreviews] = useState(Array(5).fill(null));

  const handleFileChange = (index, file) => {
    if (!file) return;

    const updatedFiles = [...files];
    const updatedPreviews = [...previews];

    updatedFiles[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);
    
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);

    console.log("Files:", updatedFiles);
  };

  const handleUpload = async () => {
    if (!name.trim() || files.some((file) => file === null)) {
      setMessage("Please enter a name and select 5 pictures.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await uploadFace(name, files);
      setMessage("Upload successful!");
      setIsSuccess(true);
      console.log("Response:", response);
    } catch (error) {
      setMessage("Upload failed. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl py-[17px] px-[27px] bg-white h-[220px]  rounded-[20px] border border-[#E6E5F2] flex flex-col mt-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-[15px] bg-[#EDEEF4] w-[240px] h-[35px] text-[#6d6f75] outline-none text-[12px]"
            disabled={isSuccess}
          />
          <div className="flex items-center space-x-2">
          <button 
          className="px-6 py-2 bg-primary hover:bg-primary/80 cursor-pointer text-white rounded-full shadow"
          onClick={handleUpload}
          >
            Add
          </button>
          <MoreVertical className="text-primary cursor-pointer" />
          </div>
        </div>

        <div className="flex justify-between">
        {[...Array(5)].map((_, index) => (
          <label
            key={index}
            className="w-[100px] h-[100px] rounded-[25px] border border-[#EAEAEA] mt-[12px] flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {previews[index] ? (
              <img src={previews[index]} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#EDEEF4]">+</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
              className="hidden"
            />
          </label>
        ))}
      </div>
      {message && (
        <p className={`mt-2 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
      </div>
    </>
  );
}
