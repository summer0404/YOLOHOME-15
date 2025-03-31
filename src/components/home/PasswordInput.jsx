import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { fetchAdafruitData } from "../../utils/fetchAdafruitData";
import { controlPasswordValue } from "../../utils/controlPasswordValue";



export default function PasswordInput() {
  const [password, setPassword] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchAdafruitData("bbc-password");
          if (data !== "") {
            const receivedPass = data.split('');
            if (receivedPass.length === 4) {
              setPassword(receivedPass);
            }
          } else {
            setPassword(new Array(4).fill(""));
          }
          
        } catch (error) {
          console.error('Error fetching password:', error);
        }
      };
  
      fetchData();
  
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }, []);

  const onPasswordSubmit = async (password) => {
    await controlPasswordValue(password);
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
    <div className=" rounded-[28px] py-[40px] w-full mt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[18px] font-semibold">Password</h1>
        <MoreVertical className="cursor-pointer" />
      </div>

      <div className="flex justify-between pt-[10px]">
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
              readOnly
              className="w-[70px] h-[70px] bg-white rounded-[15px] outline outline-[#E6E5F2] text-center text-[20px] font-semibold mr-2"
            />
          );
        })}
      </div>
    </div>
  );
}
