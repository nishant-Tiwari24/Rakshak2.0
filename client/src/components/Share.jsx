import React from 'react';
import Section from './Section';
import { RightBox } from './RightBox';
import { LeftBox } from './LeftBox';
import Split from 'react-split';
import { Line } from 'react-chartjs-2';
import { FaUserMd, FaCalendarAlt, FaDollarSign, FaSyringe } from 'react-icons/fa';

const Share = () => {
  const sdata = {
    labels: ['June 1', 'June 2', 'June 3', 'June 4', 'June 5', 'June 6', 'June 7'],
    datasets: [
      {
        label: 'Total Data Sent',
        data: [0, 0, 0, 0, 0, 0, 0],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const rdata = {
    labels: ['June 1', 'June 2', 'June 3', 'June 4', 'June 5', 'June 6', 'June 7'],
    datasets: [
      {
        label: 'Total Data Sent',
        data: [1, 3, 0, 0, 0, 0, 0],
        fill: true,
        borderColor: 'lime',
        tension: 0.1,
      },
    ],
  };

  return (
    <Section
      className="pt-[8rem] min-h-screen -mt-[4rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="share"
    >
      
      <Split expandToMin={false} minSize={40} className="relative container flex gap-2 mt-8">
        <RightBox />
        <LeftBox />
      </Split>
      <h1 className="text-center font-bold text-3xl md:text-4xl mb-4 md:mb-8 mt-8">
        Service Dashboard
      </h1>

      <div className="flex justify-center flex-wrap gap-4 mt-8">
        <div className="w-full lg:w-[710px] bg-zinc-800 p-4 rounded-[10px] shadow-lg">
        <div className="bg-gradient-to-r bg-zinc-600 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold flex items-center">
                                Total Documents Sent
                            </h3>
                            <p className="text-3xl">4 Files</p>
                            <p className="text-green-200">100% Last Month</p>
                        </div>
          <Line data={rdata} />
        </div>
        <div className="w-full lg:w-[710px] bg-zinc-800 p-4 rounded-[10px] shadow-lg">
        <div className="bg-gradient-to-r bg-zinc-600 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold flex items-center">
                                Total Documents Recieved
                            </h3>
                            <p className="text-3xl">0 Files</p>
                            <p className="text-red-200">0% Last Month</p>
                        </div>
          <Line data={sdata} />
        </div>
      </div>

      
    </Section>
  );
};

export default Share;

