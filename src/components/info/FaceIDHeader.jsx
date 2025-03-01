import { Thermometer } from "lucide-react";
import { Droplet } from "lucide-react";

export default function FaceIDHeader() {
  return (
    <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-2xl font-semibold">Face ID</h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Thermometer className="text-gray-600" />
            <span>26°C</span>
          </div>
          <div className="flex items-center space-x-1">
            <Droplet className="text-gray-600" />
            <span>50%</span>
          </div>
        </div>
      </div>
  );
}