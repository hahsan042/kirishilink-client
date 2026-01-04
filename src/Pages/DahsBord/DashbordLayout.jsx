import React from 'react';

import SideBar from './SideBar';
import { Outlet } from 'react-router';

const DashbordLayout = () => {
    return (
      <div className='relative min-h-screen md:flex bg-white'>
      {/* Left Side: Sidebar Component */}
      <SideBar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet/>
        </div>
      </div>
    </div>
    );
};

export default DashbordLayout;