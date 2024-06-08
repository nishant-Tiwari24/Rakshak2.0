import React from 'react';
import { Card, Metric, Text, Title, DonutChart, LineChart, BarChart } from "@tremor/react";
import { useAddress } from '@thirdweb-dev/react';
import Section from './Section';
import axios from "axios";

const chartdata = [
    {
      date: 'Apr 14',
      SemiAnalysis: 2890,
    },
    {
      date: 'Apr 13',
      SemiAnalysis: 2890,
    },
  ];
  
  const chartdata2 = [
    {
      name: '0x75B2b5853a6fE03cd23691E3910A127853f261e8',
      'times': 24,
    },
    {
      name: 'bafkreic7y764n5ccf6f6f4r2taasakassadvlx2xrtao5g3dqzoealrxne',
      'times': 14,
    },
    {
      name: 'QmRwmgZVQXdbzuCTYpvoJYvBHcRYs2hUHy5BSPtKZEWRD1',
      'times': 14,
    },
    {
      name: 'QmP1iJNWv9zgrWBDJ9fcMszywxiQEHgnQpqAWknF8UvpuG',
      'times': 34,
    },
    {
      name: 'QmWHJv69qY86nyVdHWsQ6SqbSMvkMNapC8mDmvXDruRF9b',
      'times': 12,
    },
    {
      name: 'QmaQgM7RSnE7VpM6tZnQgutQe3D8T6k6RQHwhsNe3HAPHX',
      'times': 6,
    },
    {
      name: 'Qmc5dAkjELhjdvnWHcsS3d8MVtABeauNHqQSTaAuXJLZBC',
      'times': 14,
    },
    {
      name: 'https://ipfs.io/ipfs/bafkreiac5qh6q3njzzco6xelkacfsgxlzybfbjisv47jfuvkmmsnqiyyau',
      'times': 0,
    },

    
  ];

  const dataFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;


  const dataFormat = (number) =>
  Intl.NumberFormat('us').format(number).toString();

  const valueFormatter = function (number) {
    return ' ' + new Intl.NumberFormat('us').format(number).toString();
  }  

  const constantData = [
    {
      name: 'false',
      userScore: 7.8, // Example value
    },
    {
      name: 'false',
      userScore: 10 - 7.8, // Example value
    }
  ];

  const graphData = (data) =>{
    const c = data.reduce((acc, entry) => {
        const monthYear = new Date(entry.createdAt).toLocaleString('default', { month: 'short', year: '2-digit' });
        const existingEntryIndex = acc.findIndex(item => item.date === monthYear);
        if (existingEntryIndex !== -1) {
          acc[existingEntryIndex].sent++;
        } else {
          acc.push({ date: monthYear, sent: 1 });
        }
        return acc;
      }, []);
      return c;
  }

  const graphData1 = (data) =>{
    const c = data.reduce((acc, entry) => {
        const monthYear = new Date(entry.createdAt).toLocaleString('default', { month: 'short', year: '2-digit' });
        const existingEntryIndex = acc.findIndex(item => item.date === monthYear);
        if (existingEntryIndex !== -1) {
          acc[existingEntryIndex].receive++;
        } else {
          acc.push({ date: monthYear, receive: 1 });
        }
        return acc;
      }, []);
      return c;
  }


const Track = () => {

    const [sent, setSent] = React.useState();
    const [receive, setReceive] = React.useState();
    const address = useAddress();
    const [chatData, setChartData] = React.useState([]);
    const [rec, setRec] = React.useState([]);

    const dataBarbie = {
        vote_average: 7.8 
      };

      React.useEffect(() => {
        const fetchData = async () => {
          try {
            const a = address;
            const sentResponse = await axios.get(`https://chat-phi-kohl.vercel.app/getsendData/${a}`);
            const sentCount = sentResponse.data.length; 
            setSent(sentCount);
      
            const b = address;
            const receiveResponse = await axios.get(`https://chat-phi-kohl.vercel.app/getreceiveData/${b}`);
            const receiveCount = receiveResponse.data.length; 
            setReceive(receiveCount);
      
            setChartData(graphData([...sentResponse.data]));
            console.log(graphData([...receiveResponse.data], ));
            setRec(graphData1([...receiveResponse.data]));
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

  return (
    <Section className="w-screen items-center"> 
      <div className='w-[90vw] text-center ml-20'> 
      <h2 className="text-4xl font-medium text-white text-dark-tremor-content-strong">
            File Exchange Statistics
          </h2>
          <br />
          <br />
        <div className='grid grid-cols-3 gap-10 border-transparent'>

          <Card className="mx-auto z-0 max-w-3xl bg-zinc-700 rounded-lg p-4"> 
            <p className="text-tremor-default  text-dark-tremor-content">Data Sent</p>
            <p className="text-3xl text-dark-tremor-content-strong font-semibold">4</p>
          </Card>

          <Card className="mx-auto z-0 max-w-3xl border-transparent bg-zinc-700 rounded-lg p-4"> 
            <p className="text-tremor-default text-dark-tremor-content">Data Recieved</p>
            <p className="text-3xl text-dark-tremor-content-strong font-semibold">{receive}</p>
          </Card>

          <DonutChart
            className="mt-6 mb-6"
            data={constantData}
            category="userScore"
            index="name"
            colors={["green", "slate"]}
            label={`${(dataBarbie.vote_average * 10).toFixed()}%`}
    />
        </div>
        <br />
        <div className='grid grid-cols-2 gap-10 mr-8'>
          <div>
            <h3 className="text-lg font-medium text-dark-tremor-content-strong text-zinc-500">Data sent in past</h3>
            <LineChart
              className="mt-4 h-72 text-zinc-500"
              data={chatData}
              
              index="date"
              yAxisWidth={65}
              categories={['sent']}
              colors={['purple']}
              valueFormatter={valueFormatter}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-zinc-500 text-dark-tremor-content-strong">Data receive in past</h3>
            <LineChart
              className="mt-4 h-72 text-zinc-500"
              data={rec}

              index="date"
              yAxisWidth={65}
              categories={['receive']}
              colors={['green']}
              valueFormatter={valueFormatter}
            />
          </div>
        </div>
        <br />
        <div> 
          <h3 className="text-lg font-medium text-zinc-500 text-dark-tremor-content-strong">
            Number of times data accessed
          </h3>
          <BarChart 
            className="mt-6 text-zinc-500"
            data={chartdata2}
            index="name"
            categories={['times']}
            colors={['indigo']}
            valueFormatter={dataFormat}
            yAxisWidth={48}
          />
        </div>
        <br />
        <h2 className="text-4xl font-medium text-white text-dark-tremor-content-strong">
            File Guardian Statistics
          </h2>
          <br />
          <br />
          <div>
            <h3 className="text-lg font-medium text-dark-tremor-content-strong text-zinc-500">File uploads</h3>
            <LineChart
              className="mt-4 h-72 text-zinc-500"
              data={chatData}
              
              index="date"
              yAxisWidth={65}
              categories={['sent']}
              colors={['purple']}
              valueFormatter={valueFormatter}
            />
          </div>
      </div>
    </Section>
  );
};

export default Track;

