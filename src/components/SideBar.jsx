import { LayoutGrid, Shield, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/api";

export default function SideBar() {
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-[120px] h-full z-50">
      <div className="h-full p-4 rounded-2xl flex flex-col items-center justify-between py-10">
        <Link to="/" className="text-primary">
      
        </Link>
        <div className="bg-primary p-2 rounded-[10px] flex flex-col items-center py-[15px] ml-4">
          <div className="flex flex-col items-center gap-6">
            <div className={`p-4 rounded-[10px] flex flex-col items-center ${location.pathname === "/home" ? "bg-white" : ""}`}>
              <Link to="/home" className={location.pathname === "/home" ? "text-primary" : "text-white"}>
                <LayoutGrid size={24} />
              </Link>
            </div>
            <div className={`p-4 rounded-[10px] flex flex-col items-center ${location.pathname === "/info" ? "bg-white" : ""}`}>
              <Link to="/info" className={location.pathname === "/info" ? "text-primary" : "text-white"}>
                <Shield size={24} />
              </Link>
            </div>
            <div className={`p-4 rounded-[10px] flex flex-col items-center ${location.pathname === "/user" ? "bg-white" : ""}`}>
              <Link to="#" className="text-white">
                <User size={24} />
              </Link>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="text-primary cursor-pointer">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
}
