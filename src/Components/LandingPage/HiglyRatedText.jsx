import React, { useState } from 'react';

function HiglyRatedText({fun}) {
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId); // Set the clicked button as active
  };

  return (
    <>
      <div>
        <h1 className="text-center text-[42px] font-bold">
          Explore Properties Tailored to Your Needs! <br /> Discover Your Dream Space
        </h1>
      </div>

      <div className="mt-10  flex items-center justify-center gap-6">
        <button 
          className={`w-[120px] h-10 rounded-3xl text-[14px] font-medium ${
            activeButton === 1 ? 'bg-[#0b1D27] text-white' : ' border border-[#0b1D27] text-[#0b1D27] '
            
          }`}
          onClick={() => {handleButtonClick(1); fun('house')}}
        >
          House
        </button>
        <button
          className={`w-[120px] h-10 rounded-3xl text-[14px] font-medium ${
            activeButton === 2 ? 'bg-[#0b1D27] text-white' : ' border border-[#0b1D27] text-[#0b1D27]'
          }`}
          onClick={() => {handleButtonClick(2); fun('apartment')}}
        >
          Apartment
        </button>
        {/* <button
          className={`w-[120px] h-10 rounded-3xl text-[14px] font-medium ${
            activeButton === 3 ? 'bg-[#0b1D27] text-white' : ' border border-[#0b1D27] text-[#0b1D27]'
          }`}
          onClick={() => handleButtonClick(3)}
        >
          Newest
        </button> */}
      </div>
    </>
  );
}

export default HiglyRatedText;
