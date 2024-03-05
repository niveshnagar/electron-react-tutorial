import React, { useState } from "react";

const Mock = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [answer, setAnswer] = useState<null | number>(null);
  const [inputValue, setInputValue] = useState(""); // Add state for input value

  const handleClick = async () => {
    const num = parseInt(inputValue);
    console.log(num);
    if (!isNaN(num)) {
      // Check if 'num' is a valid number
      const answer = await (window as any).myAPI.multiply(num);
      setAnswer(answer);
      setIsHidden(false);
    } else {
      // Handle the case where the input is not a valid number
      setIsHidden(true);
    }
  };

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <p>Return from main.js {isHidden ? null : answer}</p>
      <input value={inputValue} onChange={handleChange} />
      <button onClick={handleClick}>Multiply</button>
    </div>
  );
};

export default Mock;
