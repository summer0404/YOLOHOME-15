import React, { useEffect, useState } from "react";
import { Thermometer } from "lucide-react";
import { Droplet } from "lucide-react";
import { fetchAdafruitData } from "../../utils/fetchAdafruitData";

export default function FaceIDHeader() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const temp = await fetchAdafruitData("bbc-temperature");
      const hum = await fetchAdafruitData("bbc-humidity");
      setTemperature(temp);
      setHumidity(hum);
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-black text-2xl font-semibold">Face ID</h1>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Thermometer className="text-gray-600" />
          <span>{temperature}°C</span>
        </div>
        <div className="flex items-center space-x-1">
          <Droplet className="text-gray-600" />
          <span>{humidity}%</span>
        </div>
      </div>
    </div>
  );
}
