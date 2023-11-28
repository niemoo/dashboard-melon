import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from './sidePage/Dashboard';

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default Home;
