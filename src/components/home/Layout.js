'use client';

import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default Layout; 