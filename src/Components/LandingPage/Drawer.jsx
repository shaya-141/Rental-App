import React from 'react';
import PropTypes from 'prop-types';

const Drawer = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-blue-400 shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-50`}
      >
        {/* Close Button */}
        <button onClick={onClose} className='p-4 text-black'>
          Close
        </button>
        <div className='p-4'>{children}</div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'
        ></div>
      )}
    </>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Whether the drawer is open
  onClose: PropTypes.func.isRequired, // Function to close the drawer
  children: PropTypes.node, // Content inside the drawer
};