import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

export default function PasswordInput() {
  const [password, setPassword] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const onPasswordSubmit = (password) => {
    console.log(password);
    //Save for later use
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newPass = [...password];
    //allow only one number
    newPass[index] = value.substring(value.length - 1);
    setPassword(newPass);

    //submit trigger
    const combinedPass = newPass.join("");
    if (combinedPass.length === 4) {
      onPasswordSubmit(combinedPass);
    }

    //Move to next input if current field is filled
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !password[index - 1]) {
      inputRefs.current[password.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !password[index] &&
      inputRefs.current[index - 1]
    ) {
      //Move to previous input if backsapce is pressed
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="bg-white rounded-[28px] py-[40px] px-[43px] w-full mt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-gray-700 text-2xl font-semibold">Password</h1>
        <MoreVertical className="text-white cursor-pointer" />
      </div>

      <div className="flex justify-between">
        {/* Password Input */}
        {password.map((value, index) => {
          return (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 bg-white rounded-[18px] outline outline-gray-300 text-center text-2xl font-semibold mr-2"
            />
          );
        })}
      </div>
    </div>
  );
}
