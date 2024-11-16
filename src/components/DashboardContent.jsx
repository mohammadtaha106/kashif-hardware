import React from 'react';

const DashboardContent = ({ selectedContent }) => {

  const contentMap = {
    home: <div>Home Content</div>,
    product: <div>product Content</div>,
    profile: <div>Profile Content</div>,
    settings: <div>Settings Content</div>,
    reports: <div>Reports Content</div>,
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
