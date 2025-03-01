import FaceIdInput from "../components/info/FaceIdInput";
import PasswordInput from "../components/info/PasswordInput";
import UserActions from "../components/info/UserActions";
import FaceIDHeader from "../components/info/FaceIDHeader";
import AddButton from "../components/info/AddButton";

export default function Info() {
  return (
    <div className="flex min-h-screen w-2/3 mx-auto">
      {/* Left Column */}
      <div className="w-1/2 p-4 "> 
        <FaceIDHeader />
        <div className="flex flex-col items-center">
        <FaceIdInput />
        <FaceIdInput />
        <AddButton />
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
