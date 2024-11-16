import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';

function Dashboard() {
    const [selectedContent, setSelectedContent] = useState('home');
  return (
    <div className="flex h-screen">
 
      <Sidebar setSelectedContent={setSelectedContent} />
    
      <DashboardContent selectedContent={selectedContent} />
    </div>

  )
}

export default Dashboard