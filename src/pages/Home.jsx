import { useEffect, useState } from "react";
import PasswordInput from "../components/home/PasswordInput";
import WelcomeCard from "../components/home/WelcomeCard";
import { Droplet } from "lucide-react";
import { Thermometer } from "lucide-react";
import { ChevronDown } from "lucide-react";
import AIService from "../components/home/AIService";
import CustomChart from "../components/home/CustomChart";
import { fetchAdafruitData } from "../utils/fetchAdafruitData";
import { controlAdafruitDevice } from "../utils/controlAdafruitDevice";
import { controlFanSpeed } from "../utils/controlFanSpeed";

const handleLockClick = async (item) => {
  item.setState(1); 
  await controlAdafruitDevice(item.device, 1); 
  setTimeout(async () => {
    item.setState(0); 
    await controlAdafruitDevice(item.device, 0); 
  }, 5000); 
};

function AdminDashboard() {
  const [isLockOn, setIsLockOn] = useState(0);
  const [isFanOn, setIsFanOn] = useState(0);
  const [isLightsOn, setIsLightsOn] = useState(0);

  // const [passwordVisible, setPasswordVisible] = useState(false);
  const [fanSpeed, setFanSpeed] = useState(50);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [temp, hum, lockState, fanState, lightState, fanSpeedValue] = await Promise.all([
        fetchAdafruitData("bbc-temperature"),
        fetchAdafruitData("bbc-humidity"),
        fetchAdafruitData("bbc-servo"),
        fetchAdafruitData("bbc-fan"),
        fetchAdafruitData("bbc-led"),
        fetchAdafruitData("bbc-control-fan")
      ]);

      setTemperature(temp);
      setHumidity(hum);
      setIsLockOn(parseInt(lockState));
      setIsFanOn(parseInt(fanState));
      setIsLightsOn(parseInt(lightState));
      setFanSpeed(parseInt(fanSpeedValue));
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleDevice = async (device, currentState, setState) => {
    const newState = currentState === 0 ? 1 : 0;
    await controlAdafruitDevice(device, newState);
    setState(newState);
  };

  const handleSpeedChange = async (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    setFanSpeed(newSpeed);
    await controlFanSpeed(newSpeed);
  };

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <div className="container mx-auto px-4 bg-[#F9F9F9] ml-[120px] mt-[90px] mb-[40px]">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left and Middle Column */}
        <div className="xl:col-span-2 space-y-6">
          <WelcomeCard
            name="Xuan Ha"
            temp={`${temperature}°C`}
            weather="Fuzzy cloudy weather"
          />
          <div className="w-full p-4 rounded-lg flex justify-between items-center ">
            <h3 className="text-xl font-semibold">Home</h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Droplet className="text-gray-600" />
                <span>{humidity}%</span>
              </span>
              <span className="flex items-center gap-1">
                <Thermometer className="text-gray-600" />
                <span>{temperature}°C</span>
              </span>
              <div className="relative w-[200px]">
                <select className="w-full p-2 bg-[#EDEEF4] rounded-xl appearance-none pr-8 outline-none">
                  <option>Living Room</option>
                </select>
                <ChevronDown className="absolute top-2 right-3 text-gray-500" />
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
                device: "bbc-servo",
                isButton: true,
              },
              {
                state: isFanOn,
                setState: setIsFanOn,
                icon: "fa-fan",
                label: "Fan",
                device: "bbc-fan",
              },
              {
                state: isLightsOn,
                setState: setIsLightsOn,
                icon: "fa-lightbulb",
                label: "Lights",
                device: "bbc-led",
              },
            ].map((item, index) => (
              <div key={index} className="p-4">
                <div
                  className={`p-4 h-35 flex flex-col items-center justify-center rounded-[25px] cursor-pointer  ${
                    item.state
                      ? (item.label == "Lock" ? " text-white bg-white border-[#E6E5F2] rounded-[25px] border-[1px]" : "bg-primary text-white shadow-md shadow-primary")
                      : "bg-white text-gray-800 border-[#E6E5F2] rounded-[25px] border-[1px]"
                  }`}
                >
                  {item.isButton ? (
                    // Lock Button
                    <div className="flex flex-col relative">
                      <button
                        onClick={() => handleLockClick(item)}
                        className={`w-23 h-23 flex items-center cursor-pointer justify-center rounded-full text-xl font-bold ${
                          item.state ? "bg-white text-primary lock-animation pulse-animation after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-primary after:border-[20px] after:border-[#DDD7FF] after:transition-all after:duration-300 after:ease-in-out" : "bg-[#F5F5F5] text-[#9897AD] after:content-[''] after:absolute after:inset-0 after:rounded-full after:border-[20px] after:border-[#FAFAFA] after:transition-all after:duration-300 after:ease-in-out"
                        }`}
                      >
                        {/* Change the icon dynamically based on the state */}
                        <i className={`font-[9px]  z-1 fas ${item.state ? "fa-lock-open text-white " : "fa-lock text-gray-500"}`}></i>
                      </button>
                      {/* <div className="mt-4 text-lg ]">{item.label}</div> */}
                    </div>
                  ) : (
        
                    <>
                      <div className="flex items-center justify-between w-full">
                        <span>{item.state ? "ON" : "OFF"}</span>
                        <label className="switch">
                          <div
                            className={`w-[42px] h-[24px] flex items-center rounded-[12px] cursor-pointer transition-all ${
                              item.state ? "bg-white" : "bg-[#F3F1F1]"
                            }`}
                            onClick={() =>
                              toggleDevice(
                                item.device,
                                item.state,
                                item.setState
                              )
                            }
                          >
                            <div
                              className={`w-[20px] h-[20px] rounded-[50%] transition-transform ${
                                item.state
                                  ? "translate-x-[20px] bg-primary"
                                  : "translate-x-[2.5px] translate-y-[-0.5px] bg-white"
                              }`}
                            ></div>
                          </div>
                          <span className="slider round"></span>
                        </label>
                      </div>
                      <i
                        className={`fas ${item.icon} text-2xl mt-4 ${
                          item.state ? "text-white" : "text-gray-500"
                        }`}
                      ></i>
                      <span className="mt-2">{item.label}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Fan Control Panel */}
          <div className="p-6 bg-white rounded-[25px] pb-[60px] shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Fan</span>
              </div>
              <div
                className={`p-4 rounded-lg flex flex-col items-start justify-between ${
                  isFanOn ? "bg-white text-gray-800" : "bg-white text-gray-800"
                }`}
              >
                <div className="flex items-center justify-between w-full gap-x-4">
                  <span>{isFanOn ? "ON" : "OFF"}</span>
                  <label className="switch">
                    <div
                      className={`w-[42px] h-[24px] flex items-center rounded-[12px] cursor-pointer transition-all ${
                        isFanOn ? "bg-primary" : "bg-[#F3F1F1]"
                      }`}
                      onClick={() => toggleDevice("bbc-fan", isFanOn,setIsFanOn)}
                    >
                      <div
                        className={`w-[20px] h-[20px] rounded-[50%] transition-transform ${
                          isFanOn
                            ? "translate-x-[20px] bg-white"
                            : "translate-x-[2.5px] translate-y-[-0.5px] bg-white"
                        }`}
                      ></div>
                    </div>
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() =>
                  handleSpeedChange({
                    target: { value: Math.max(fanSpeed - 5, 0) },
                  })
                }
                disabled={!isFanOn} // Disable button if fan is off
                className={`w-10 h-10 flex items-center justify-center cursor-pointer text-2xl shadow-2xs rounded-lg pb-[5px] active:scale-95 ${
                  isFanOn
                    ? "bg-[#F5F5F5] text-gray-600"
                    : "bg-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                -
              </button>
              <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-gradient-to-b from-gray-200 to-white shadow-lg">
                <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-semibold">{fanSpeed}</span>
                  <span className="text-gray-400 text-sm">Speed</span>
                </div>
              </div>
              <button
                onClick={() =>
                  handleSpeedChange({
                    target: { value: Math.min(fanSpeed + 5, 100) },
                  })
                }
                disabled={!isFanOn}
                className={`w-10 h-10 flex items-center justify-center cursor-pointer text-2xl rounded-lg shadow-lg active:scale-95 ${
                  isFanOn
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-1">
          <div className="bg-[#ededf5bd] w-full px-[30px] py-[40px] rounded-[28px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-black text-[23px] font-semibold">Services</h2>
              <span className="text-base bg-[#EDEEF4] px-[20px] py-[10px] rounded-[10px]">
                {date}
              </span>
            </div>
            <AIService />
            <PasswordInput />
            <div className="mt-6">
              <h3 className="text-black text-[18px] font-semibold pb-[20px]">
                Temperature
              </h3>
              <div className="">
                {/* <img
                  alt="Temperature graph"
                  className="w-full h-auto rounded-lg"
                  src="/tem.png"
                /> */}
                <CustomChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
