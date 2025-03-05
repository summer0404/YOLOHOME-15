import { Home, LayoutGrid, Shield, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();

  return (
    <div className="flex items-center justify-center">
      <div className="h-full p-4 rounded-2xl flex flex-col items-center justify-between py-10">
        <Link to="/" className="text-primary">
          <Home size={24} />
        </Link>
        <div className="bg-primary p-2 rounded-2xl flex flex-col items-center py-10 ml-4">
          <div className="flex flex-col items-center gap-6">
            <div className={`p-4 rounded-xl flex flex-col items-center ${location.pathname === "/" ? "bg-white" : ""}`}>
              <Link to="/" className={location.pathname === "/" ? "text-primary" : "text-white"}>
                <LayoutGrid size={24} />
              </Link>
            </div>
            <div className={`p-4 rounded-xl flex flex-col items-center ${location.pathname === "/info" ? "bg-white" : ""}`}>
              <Link to="/info" className={location.pathname === "/info" ? "text-primary" : "text-white"}>
                <Shield size={24} />
              </Link>
            </div>
            <div className={`p-4 rounded-xl flex flex-col items-center ${location.pathname === "/user" ? "bg-white" : ""}`}>
              <Link to="#" className="text-white">
                <User size={24} />
              </Link>
            </div>
          </div>
        </div>
        <Link to="#" className="text-primary">
          <LogOut size={24} />
        </Link>
      </div>
    </div>
  );
}
