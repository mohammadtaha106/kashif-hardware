import React from 'react';

const Sidebar = ({ setSelectedContent, selectedContent }) => {
  const navItems = ['home', 'product', 'profile', 'settings', 'reports'];

  return (
    <div className="w-full md:w-1/4 bg-white text-black p-6 shadow-xl border-r border-gray-200">
      <h2 className="text-xl mb-6 font-semibold">Dashboard</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li
            key={item}
            className={`cursor-pointer px-6 py-3 rounded-md text-base transition-all duration-300
            ${item === selectedContent
              ? 'bg-black text-white shadow-md'
              : 'hover:bg-gray-100 hover:text-black focus:ring-2 focus:ring-black focus:outline-none'
            }`}
            onClick={() => setSelectedContent(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
