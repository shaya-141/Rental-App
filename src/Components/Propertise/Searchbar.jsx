import React from "react";
import locationicon from "../../assets/icons/location.png";
import search from "../../assets/icons/search.png";
import { useState } from "react";

function Searchbar({ fun }) {
  const [location, setlocation] = useState('all')

  function onchange(e) {
    setlocation(e.target.value)
  }

  return (
    <div className="w-full h-14 flex rounded items-center px-4 border relative gap-4">
      {/* Location Section */}
      <div className="flex gap-2 items-center">
        <img src={locationicon} className="h-5" alt="Location Icon" />
        <h1 className="text-[#656e73]">Location</h1>
      </div>

      {/* Select Dropdown */}
      <select
        onClick={(e) => onchange(e)}
        name="location"
        id="location"
        className="flex-grow h-10 px-4 text-[#656e73] focus:outline-none rounded-lg  focus:ring-[#0b1D27]"
      >
        <option value="all">All</option>
        <option value="gulshan">Gulshan</option>
        <option value="bahria town">Bahria Town</option>
        <option value="clifton">Clifton</option>
        <option value="defence">Defence</option>
        <option value="north nazimabad">North Nazimabad</option>
        <option value="korangi">Korangi</option>
        <option value="pechs">PECHS</option>
        <option value="malir">Malir</option>
        <option value="saddar">Saddar</option>

      </select>

      {/* Search Button */}
      <div onClick={fun(location)} className="bg-[#0b1D27] flex items-center justify-center cursor-pointer h-12 w-14 rounded-lg">
        <img src={search} className="h-5" alt="Search Icon" />
      </div>
    </div>
  );
}

export default Searchbar;
