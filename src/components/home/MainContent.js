import React from "react";
import Image from "next/image";

const MainContent = () => {
  const streams = [
    {
      title: "MAFIATHON 2 ▶️ DAY 5 ▶️ 20% OF REV...",
      streamer: "KaiCenat",
      viewers: "65.4K",
    },
    {
      title: "[DROPS ON] Сюжет Барона - Продолжен...",
      streamer: "pan1k_t0p",
      viewers: "2.7K",
    },
    // Add more streams as needed
  ];

  return (
    <div className="flex-grow bg-white text-black p-4">
      <h2 className="text-xl font-bold mb-4">
        Live channels we think you&apos;ll like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {streams.map((stream, index) => (
          <div key={index} className="relative">
            <Image
              src={`/stream-${index}.jpg`}
              alt={stream.title}
              width={300}
              height={169}
              className="rounded"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-xs px-1 rounded">
              LIVE
            </div>
            <div className="absolute bottom-2 left-2 bg-white bg-opacity-60 text-xs px-1 rounded">
              {stream.viewers} viewers
            </div>
            <p className="mt-2 font-semibold">{stream.title}</p>
            <p className="text-sm text-gray-400">{stream.streamer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
