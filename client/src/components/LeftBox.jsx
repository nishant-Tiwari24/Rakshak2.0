import React, { useState } from 'react';
import DataSent from './DataSent.jsx';
import { SmallBox } from './SmallBox.jsx';
import DataReceived from './DataReceived.jsx';

const MiniNavButton = ({ value, isActive, handleClick }) => {
  const buttonClasses = `
    text-white px-4 py-2 rounded-md font-medium
    ${isActive ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-800'}
  `;

  return (
    <button className={buttonClasses} onClick={handleClick}>
      {value}
    </button>
  );
};

export const LeftBox = () => {
  const [activeTab, setActiveTab] = useState('sent');

  const handleTabClick = (tab) => setActiveTab(tab);

  const refreshSentData = () => {
    // Implement your data fetching logic for Sent data here
  };

  const refreshReceivedData = () => {
    // Implement your data fetching logic for Received data here
  };

  const renderContent = () => {
    
      if( 'sent' == activeTab){
        return (
          <DataSent
            refreshData={refreshSentData}
          />
        );
      }
      else if( 'received' == activeTab){
        return (
          <DataReceived
            refreshData={refreshReceivedData}
          />
        );
      }
      else{
        return null;
      }

  };

  return (
    <div className="flex flex-col bg-stone-900 rounded-md">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <h2 className="text-white text-xl font-medium">Data</h2>
        <div className="flex space-x-2">
          <MiniNavButton
            value="Sent"
            isActive={activeTab === 'sent'}
            handleClick={() => handleTabClick('sent')}
          />
          <MiniNavButton
            value="Received"
            isActive={activeTab === 'received'}
            handleClick={() => handleTabClick('received')}
          />
        </div>
      </div>
      {renderContent()}
      {/* { activeTab ?
        <DataSent /> : <DataReceived />
      } */}
    </div>
  );
};
