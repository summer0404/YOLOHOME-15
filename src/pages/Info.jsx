import { useState } from 'react';
import FaceIdInput from "../components/info/FaceIdInput";
import PasswordInput from "../components/info/PasswordInput";
import UserActions from "../components/info/UserActions";
import FaceIDHeader from "../components/info/FaceIDHeader";
import AddButton from "../components/info/AddButton";

export default function Info() {
  // Initialize state with one input
  const [faceIdInputs, setFaceIdInputs] = useState([{ id: 0 }]);

  // Handler to add new input
  const handleAddInput = () => {
    setFaceIdInputs(prevInputs => [...prevInputs, { id: prevInputs.length }]);
  };

  return (
    <div className="flex min-h-screen w-2/3 mx-auto">
      {/* Left Column */}
      <div className="w-1/2 p-4"> 
        <FaceIDHeader />
        <div className="flex flex-col items-center space-y-4">
          {faceIdInputs.map((input) => (
            <FaceIdInput key={input.id} />
          ))}
          <AddButton onClick={handleAddInput} />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/2 p-4">
        <UserActions />
        <PasswordInput />
      </div>
    </div>
  );
}
