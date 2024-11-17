import React, { useState } from 'react';
import Image from 'next/image';

// components/Sidebar.js

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const channels = [
    { name: 'KaiCenat', viewers: '65.4K', game: "I'm Only Sleeping" },
    { name: 'pan1k_t0p', viewers: '2.7K', game: 'STALCRAFT: X' },
    // Add more channels as needed
  ];


  return (
    <div className={`w-64 bg-[#f8f8f8] text-black h-screen overflow-y-auto lg:block ${expanded ? 'block' : 'hidden'}`}>
      <h3 className="p-4 font-bold">RECOMMENDED CHANNELS</h3>
      {channels.map((channel, index) => (
        <div key={index} className="flex items-center p-2 hover:bg-[#e8e8e8]">
          <Image src={`/avatar-${index}.png`} alt={channel.name} width={30} height={30} className="rounded-full" />
          <div className="ml-2">
            <p className="font-semibold">{channel.name}</p>
            <p className="text-sm text-gray-400">{channel.game}</p>
          </div>
          <span className="ml-auto text-sm">{channel.viewers}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;