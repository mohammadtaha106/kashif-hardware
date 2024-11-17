import React from 'react';
import Product from '../pages/Product';

const DashboardContent = ({ selectedContent }) => {

  const contentMap = {
    Products:<Product/> ,
    analytics: <div>analytics Content</div>,
    orders: <div>orders Content</div>,
    users: <div>users Content</div>,
  };

  const content = contentMap[selectedContent] || <div>Select a menu item</div>;

  return (
    <div className="w-3/4 bg-gray-100 p-6">
      <h2 className="text-2xl mb-4"> {selectedContent}</h2>
      <div>{content}</div>
    </div>
  );
};

export default DashboardContent;
