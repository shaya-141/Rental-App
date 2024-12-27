import React, { createContext, useContext, useState } from 'react';

// Create Context
const DashboardContext = createContext();

// Provider Component
export const DashboardProvider = ({ children }) => {
    const [activePage, setActivePage] = useState('properties'); // Default value
    const [check, setcheck] = useState('check')
    const [currentPage, setcurrentPage] = useState('propertise')
    const [PropertyFormShowOrNot, setPropertyFormShowOrNot] = useState(false)
    
    let a = 'ahfah'
//   console.log('Active Page in Provider:', activePage); // Debugging

  return (
    <DashboardContext.Provider value={{currentPage,setcurrentPage, a,check ,PropertyFormShowOrNot, setPropertyFormShowOrNot}}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom Hook to Use Context
export const useDashboardContext = () => {
  return useContext(DashboardContext);
  
 

};
