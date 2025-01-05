import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homelogo from '../../assets/icons/homelogo.png';
import arrow from '../../assets/icons/arrow.png';
import menu from '../../assets/icons/menu.png';
import avatar from '../../assets/icons/avatar.png';
// Correct rsuite Drawer import
 // Import rsuite styles
import { getAuth, signOut } from 'firebase/auth';
import { useAuthContext } from '../../Context/Auth';

function Navbar() {
  const { isLoggedin, User } = useAuthContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful');
      })
      .catch((error) => {
        console.log('An error happened', error);
      });
  };

  return (
    <>
      {/* First Navbar */}
      <div id="navbar1" className="w-full h-[80px] p-9 flex items-center justify-between">
        <Link to={'/'}>
          <div id="logotext" className="flex items-center gap-2">
            <img src={homelogo} alt="" className="h-6 mb-[2px]" />
            <h1 class='mainheading' className="text-[28px] font-semibold text-[#0b1D27] ">Gharana</h1>
          </div>
        </Link>

        <div id="links" className="flex gap-8 items-center">
          <Link to={'/'}>
            <span className="text-[16px] cursor-pointer text-[#0b1D27] font-semibold">Home</span>
          </Link>
          <span className="text-[16px] cursor-pointer font-semibold text-[#656e73]">
            About us
          </span>
          <Link to={'/propertise'}>
            <span className="text-[16px] cursor-pointer font-semibold text-[#656e73]">
              Properties
            </span>
          </Link>
          <span className="text-[16px] cursor-pointer font-semibold text-[#656e73]">Blogs</span>
        </div>

        <div>
          {isLoggedin ? (
            <Link to={'/dashboard'}>
              <div className="w-[45px] h-[45px] rounded-3xl bg-red-400">
                <img src={User?.img ? User?.img : avatar} alt="" className="w-full h-full" />
              </div>
            </Link>
          ) : (
            <button className="text-[14px] font-medium h-[40px] gap-1 bg-[#0b1D27] text-white rounded-[24px] w-[90px]">
              <Link className="flex items-center text-white justify-center gap-1" to={'/login'}>
                Login <img src={arrow} className="h-3" alt="" />
              </Link>
            </button>
          )}
        </div>
      </div>

      {/* Second Navbar */}
      <div id="Navbar2" className="w-full h-[80px] p-9 flex items-center justify-between">
        <div onClick={toggleDrawer}>
          <img src={menu} alt="" className="h-6 cursor-pointer" />
        </div>

        <Link to={'/'}>
          <div id="logotext" className="flex items-center gap-2">
            <img src={homelogo} alt="" className="h-6 mb-[2px]" />
            <h1 class='mainheading' className="text-[28px] text-[#0b1D27] font-semibold">Gharana</h1>
          </div>
        </Link>

        <div>
          {isLoggedin ? (
            <Link to={'/dashboard'}>
              <div className="w-[45px] h-[45px] rounded-3xl bg-red-400">
                <img src={User?.img ? User?.img : avatar} alt="" className="w-full h-full" />
              </div>
            </Link>
          ) : (
            <button className="text-[14px] font-medium h-[40px] gap-1 bg-[#0b1D27] text-white rounded-[24px] px-4">
              <Link className="flex text-white items-center justify-center gap-1" to={'/login'}>
                Login
              </Link>
            </button>
          )}
        </div>
      </div>
          
          {/* drwaer */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white transition-transform duration-300 transform ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-lg z-50`}
      >
        <div className="p-4 ">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <nav className="flex flex-col mt-6">
            <Link to="/" className="mb-2 text-lg font-medium">Home</Link>
            <Link to="/about" className="mb-2 text-lg font-medium">About</Link>
            <Link to="/contact" className="mb-2 text-lg font-medium">Contact</Link>
            <Link to="/dashboard" className="mb-2 text-lg font-medium">Dashboard</Link>
          </nav>
        </div>
      </div>



      {/* Overlay */}
      {drawerOpen && (
        <div
          className=" fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleDrawer}
        />
      )}
    </>
  );
}

export default Navbar;
