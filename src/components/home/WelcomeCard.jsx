import React, {useState} from 'react'
import bgHome from '../../assets/images/bgHome.png'
import { Thermometer } from "lucide-react";
import { Cloudy } from "lucide-react";

export default function WelcomeCard({name, temp, weather}) {
    return (
        <div 
            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-cover bg-no-repeat rounded-[28px] drop-shadow-lg p-6"
            style={{ 
                backgroundImage: `url(${bgHome})`, 
                backgroundPosition: 'center'  // Adjust this percentage to move left/right
            }}
        >
            <div className="flex flex-col ">
                <h1 className="text-[#C45A01] font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl">Hello {name}!</h1>
                <p className="text-[#BD5600] text-xs sm:text-sm md:text-base lg:text-base mt-2 max-w-[60%]">Welcome Home! The air quality is good & fresh you can go out today.</p>
            </div>
            <div className="flex items-center space-x-1 mt-2">
                <Thermometer className="text-[#242424] mr-2 w-4 sm:w-5 md:w-6 lg:w-7" />
                <span className="text-[#242424] text-sm sm:text-lg md:text-xl lg:text-2xl mr-2">
                    {temp}
                </span>
                <span className="text-[#242424] text-xs sm:text-sm md:text-base lg:text-lg">
                    Out door temperature
                </span>
            </div>
            <div className="flex items-center space-x-1 mt-2">
                <Cloudy className="text-[#242424] mr-2" />
                <span className='text-[#242424]'>{weather}</span>
            </div>
        </div>
    )
}