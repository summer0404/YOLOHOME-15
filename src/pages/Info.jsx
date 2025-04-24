import { useState } from 'react';
import FaceIdInput from "../components/info/FaceIdInput";
import PasswordInput from "../components/info/PasswordInput";
import UserActions from "../components/info/UserActions";
import FaceIDHeader from "../components/info/FaceIDHeader";
import AddButton from "../components/info/AddButton";

export default function Info() {
  const [faceIdInputs, setFaceIdInputs] = useState([{ id: 0 }]);

  const [fetchUsersTrigger, setFetchUsersTrigger] = useState(false);
  const handleFetchUsers = () => {
    setFetchUsersTrigger((prev) => !prev);
  };

  const handleAddInput = () => {
    setFaceIdInputs(prevInputs => [...prevInputs, { id: prevInputs.length }]);
  };

  return (
    <div className="flex min-h-screen w-[1200px] mx-auto ml-[150px] mt-[90px]">
      {/* Left Column */}
      <div className="w-[750px] p-4"> 
        <FaceIDHeader />
        <div className="flex flex-col items-center space-y-4">
          {faceIdInputs.map((input) => (
            <FaceIdInput key={input.id} onFetchUsers={handleFetchUsers}/>
          ))}
          <AddButton onClick={handleAddInput} />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-[430px] p-4">
        <UserActions onFetchUsers={fetchUsersTrigger} />
        <PasswordInput bgColor='color-primary'/>
      </div>
    </div>
  );
}
