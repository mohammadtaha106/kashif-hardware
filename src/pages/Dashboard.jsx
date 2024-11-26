import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';

function Dashboard() {
    const [selectedContent, setSelectedContent] = useState('Products');
  return (
    <div className="flex h-screen mt-16">
 
      <Sidebar className="h-screen" setSelectedContent={setSelectedContent} />
    
      <DashboardContent selectedContent={selectedContent} />
    </div>

  )
}

export default Dashboard