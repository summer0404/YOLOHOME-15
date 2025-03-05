import React, { useState } from "react";
import PasswordInput from "../components/home/PasswordInput";
import WelcomeCard from "../components/home/WelcomeCard";
import { Droplet } from "lucide-react";
import { Thermometer } from "lucide-react";
import { ChevronDown } from "lucide-react";
import AIService from "../components/home/AIService";

function AdminDashboard() {
  const [isTemperatureOn, setIsTemperatureOn] = useState(false);
  const [isLockOn, setIsLockOn] = useState(false);
  const [isAirConditionerOn, setIsAirConditionerOn] = useState(false);
  const [isLightsOn, setIsLightsOn] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isOn, setIsOn] = useState(true);
  const [temperature, setTemperature] = useState(25);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left and Middle Column */}
        <div className="xl:col-span-2 space-y-6">
          <WelcomeCard
            name="Xuan Ha"
            temp="+26°C"
            weather="Fuzzy cloudy weather"
          />

          {/* Room Selection Bar */}
          <div className="w-full p-4 bg-gray-100 rounded-lg flex flex-wrap gap-4 items-center">
            <h3 className="text-xl font-semibold">Home</h3>
            <div className="flex flex-1 items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                <Droplet className="text-gray-600" />
                <span>35%</span>
              </span>
              <span className="flex items-center gap-1">
                <Thermometer className="text-gray-600" />
                <span>15°C</span>
              </span>
              <div className="relative flex-1 max-w-xs">
                <select className="w-full p-2 bg-[#EDEEF4] rounded-xl appearance-none pr-8 outline-none">
                  <option>Living Room</option>
                </select>
                <ChevronDown className="absolute top-3 right-3 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Device Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                state: isLockOn,
                setState: setIsLockOn,
                icon: "fa-lock",
                label: "Lock",
              },
              {
                state: isAirConditionerOn,
                setState: setIsAirConditionerOn,
                icon: "fa-wind",
                label: "Air Conditioner",
              },
              {
                state: isLightsOn,
                setState: setIsLightsOn,
                icon: "fa-lightbulb",
                label: "Lights",
              },
            ].map((item, index) => (
              <div key={index} className="p-4">
                <div
                  className={`p-4 rounded-[24px] flex flex-col items-start justify-start ${
                    item.state
                      ? "bg-primary text-white shadow-lg shadow-primary"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{item.state ? "ON" : "OFF"}</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={item.state}
                        onChange={() => item.setState((prev) => !prev)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <i
                    className={`fas ${item.icon} text-2xl mt-4 ${
                      item.state ? "text-white" : "text-gray-400"
                    }`}
                  ></i>
                  <span className="mt-2">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Air Conditioner Control Panel */}
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 text-lg">⚡</span>
                <span className="text-gray-600 font-medium">
                  Air Conditioner
                </span>
              </div>
              <div
                className={`p-4 rounded-lg flex flex-col items-start justify-between ${
                  isAirConditionerOn
                    ? "bg-white text-gray-800"
                    : "bg-white text-gray-800"
                }`}
              >
                <div className="flex items-center justify-between w-full gap-x-4">
                  <span>{isAirConditionerOn ? "ON" : "OFF"}</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isAirConditionerOn}
                      onChange={() =>
                        setIsAirConditionerOn((prev) => !prev)
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() =>
                  setTemperature((prev) => Math.max(prev - 1, 16))
                }
                className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 text-2xl rounded-lg shadow-lg active:scale-95"
              >
                −
              </button>
              <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-gradient-to-b from-gray-200 to-white shadow-lg">
                <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-semibold">
                    {temperature}°C
                  </span>
                  <span className="text-gray-400 text-sm">Celcius</span>
                </div>
              </div>
              <button
                onClick={() =>
                  setTemperature((prev) => Math.min(prev + 1, 30))
                }
                className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white text-2xl rounded-lg shadow-lg active:scale-95"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-1">
          <div className="bg-gray-200 w-full h-auto p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-black text-2xl font-semibold">Services</h2>
              <span className="text-base bg-gray-200 px-3 py-1 rounded-md">
                {date}
              </span>
            </div>
            <AIService />
            <PasswordInput />
            <div className="mt-6">
              <h3 className="text-black text-xl font-medium">Temperature</h3>
              <div className="bg-white rounded-lg shadow p-4">
                <img
                  alt="Temperature graph"
                  className="w-full h-auto rounded-lg"
                  src="/tem.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
