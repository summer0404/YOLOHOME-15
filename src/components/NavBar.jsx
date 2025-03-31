import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";


export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) { // Adjust this value to change when blur appears
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`top-0 right-0 z-10 left-0 px-6 py-4 fixed pt-[32px] ${
            isScrolled ? 'bg-white/80 backdrop-blur-md' : ''
        }`}>
            
            <div className="max-w-[1920px] mx-auto flex justify-between items-center">
                <Link to="/" className="text-primary px-[26px]">
                    <Home size={26} />
                </Link>
                <div className="relative w-1/3">
                    
                    <input
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-200 focus:outline-none"
                        placeholder="Search"
                        type="text"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
                <div className="flex items-center space-x-4">
                    <i className="fas fa-cog text-xl"></i>
                    <i className="fas fa-bell text-xl"></i>
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://storage.googleapis.com/a1aa/image/81NT1_DOcRyStu69mEiAuLzCLGpwkVNQKi3qx25mNxg.jpg"
                            alt="Admin profile picture"
                            className="w-10 h-10 rounded-full"
                            height="40"
                            width="40"
                        />
                        <span>Admin</span>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}