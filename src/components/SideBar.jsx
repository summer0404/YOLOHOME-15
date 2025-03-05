import { Home, LayoutGrid, Shield, User, LogOut } from "lucide-react";

export default function SideBar() {
  return (
    <div className="flex items-center justify-center">

      <div className="h-full p-4 rounded-2xl flex flex-col items-center justify-between py-10">

        <a href="#" className="text-primary">
          <Home size={24} />
        </a>
        <div className="bg-primary p-2 rounded-2xl flex flex-col items-center py-10 ml-4">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white p-4 rounded-xl flex flex-col items-center">
            <a href="#" className="text-primary">
              <LayoutGrid size={24} />
            </a>
          </div>
          <div className="p-4 rounded-xl flex flex-col items-center">
            <a href="#" className="text-white">
              <Shield size={24} />
            </a>
          </div>
          <div className="p-4 rounded-xl flex flex-col items-center">
            <a href="#" className="text-white">
              <User size={24} />
            </a>
          </div>
        </div>
        </div>
        <a href="#" className="text-primary">
          <LogOut size={24} />
        </a>
      </div>
    </div>
  );
}
