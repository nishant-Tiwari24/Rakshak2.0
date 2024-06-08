// import React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useContract, useAddress, useContractRead } from "@thirdweb-dev/react";
// import { IoCloseSharp } from "react-icons/io5";
// import { curve, heroBackground, imgFile } from "../assets";

// const DataSent = () => {
//   const address = useAddress();
//   console.log(address);
//   const [msg, setMsg] = useState([]);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const send = address;
//       try {
//         const resp = await axios.get(
//           `http://localhost:5002/getsendData/${send}`
//         );
//         setMsg(resp.data);
//         console.log;
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [address]);

//   const handleBoxClick = async (item) => {
//     try {
//       console.log(item.content);
//       const res = await axios.get(`http://localhost:3000/img/${item.content}`);
//       console.log(res);
//       setSelectedImage(imgFile);
//       console.log(done);
//     } catch (error) {
//       console.log(error);
//     }

//     setIsPopupOpen(true);
//   };
//   // Function to close the popup
//   const handlePopupClose = () => {
//     setIsPopupOpen(false);
//     window.location.reload();
//     setSelectedImage(null);
//   };

//   const bytes32ToDecimal = (bytes32Hex) => {
//     if (bytes32Hex.startsWith("0x")) {
//       bytes32Hex = bytes32Hex.slice(2);
//     }
//     let result = BigInt("0x" + bytes32Hex);
//     return result.toString();
//   };

//   const formatTimestamp = (timestamp) => {
//     const dateObj = new Date(timestamp);
//     return dateObj.toLocaleString();
//   };

//   const decimalToUTC = (decimalTimestamp) => {
//     const timestampMilliseconds = decimalTimestamp * 1000;
//     const date = new Date(timestampMilliseconds);
//     const utcString = date.toUTCString();
//     return utcString;
//   };

//   const convertUTC = (bytes32) => {
//     const decimal = bytes32ToDecimal(bytes32);
//     const utcDateTime = decimalToUTC(decimal);
//     const utcDate = new Date(utcDateTime);
//     const istDate = utcDate.toLocaleString("en-US", {
//       timeZone: "Asia/Kolkata",
//     });
//     return istDate;
//   };

//   return (
//     <div className="flex flex-col gap-2 p-4">
//       {msg.length > 0 ? (
//         msg.map((item, index) => (
//           <div
//             key={index}
//             className="box bg-zinc-700 rounded-lg shadow-lg border-transparent p-4 cursor-pointer hover:bg-zinc-800"
//             onClick={() => handleBoxClick(item)}
//           >
//             <div className="text-yellow-3100">
//               Filename : <span className="text-white">{item.filename}</span>
//             </div>
//             <div className="text-yellow-3100">
//               Receiver : <span className="text-white">{item.receiver}</span>
//             </div>
//             <p className="text-yellow-3100">
//               cid : <span className="text-white">{item.content}</span>
//             </p>
//             <div className="text-yellow-3100">
//               TimeStamp :{" "}
//               <span className="text-white">
//                 {formatTimestamp(item.createdAt)}
//               </span>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-400 bg-zinc-700 rounded-lg">
//           No messages to display.
//         </p>
//       )}
//       {isPopupOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <h5 className="text-xl font-medium text-gray-800">
//                 Image Preview
//               </h5>
//               <button
//                 onClick={handlePopupClose}
//                 type="button"
//                 className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <IoCloseSharp size={24} />
//               </button>
//             </div>
//             <div className="p-4">
//               {selectedImage && (
//                 <img
//                   src={selectedImage}
//                   alt="Selected Image Preview"
//                   className="w-full h-auto object-contain rounded-lg"
//                 />
//               )}
//               {!selectedImage && (
//                 <p className="text-gray-500 text-center">No image selected.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default DataSent;

// // useEffect(() => {
// //   const fetchData = async () => {
// //     if(!isLoading){
// //       const data = await contract.call("getFiles",[address]);
// //       setMsg(data);
// //       console.log(msg.length);
// //       // const _cid = msg[0].cid;
// //       // const _receiver = msg[0].receiver;
// //       // const _timestamp = convertUTC(msg[0].timestamp);
// //       // return console.log(`CID: ${_cid}\nReceiver: ${_receiver}\nTimeStamp: ${_timestamp}`);
// //     }
// //   };
// //   fetchData();
// // }, [address,contract]);

import React from 'react'
import axios from "axios";
import { useEffect,useState } from "react";
import { useContract, useAddress, useContractRead } from "@thirdweb-dev/react";


const DataSent = () => {
  const cAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  console.log(cAddress);
  // 0x4F6E7C39E54DA42feBA978D7441335a36802A15c
  const { contract,isLoading } = useContract("0x4F6E7C39E54DA42feBA978D7441335a36802A15c"); //contract address
  const address = useAddress();
  console.log(address);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if(!isLoading){
        const data = await contract.call("getFiles",[address]);
        // data = data.filter(()=>{});
        setMsg(data);
        console.log(data);
        console.log(msg.length);
        // const _cid = msg[0].cid;
        // const _receiver = msg[0].receiver;
        // const _timestamp = convertUTC(msg[0].timestamp);
        // return console.log(`CID: ${_cid}\nReceiver: ${_receiver}\nTimeStamp: ${_timestamp}`);
      }
    };
    fetchData();
  }, [address,contract]);

  const bytes32ToDecimal = (bytes32Hex) => {
    if (bytes32Hex.startsWith('0x')) {
        bytes32Hex = bytes32Hex.slice(2);
    }
    let result = BigInt('0x' + bytes32Hex);
    return result.toString();
  }
  
  const decimalToUTC = (decimalTimestamp) => {
    const timestampMilliseconds = decimalTimestamp * 1000;
    const date = new Date(timestampMilliseconds);
    const utcString = date.toUTCString();
    return utcString;
  }
  
  const convertUTC = (bytes32) => {
    const decimal = bytes32ToDecimal(bytes32);
    const utcDateTime = decimalToUTC(decimal); // Get the UTC date and time string
    const utcDate = new Date(utcDateTime); // Convert UTC string to a Date object
    const istDate = utcDate.toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}); // Convert to IST
    return istDate;
  }


  return (
    <div className='flex flex-col gap-2 p-4'>
    { !(msg.length === 0) ?
      msg.map((item, index) => (
        <div className="border-transparent rounded-lg bg-zinc-600 border-white p-2" key={index}>
          <div className="text-emerald-300 text-lg">Receiver : <span className="text-white text-sm">{item.receiver}</span></div>
          <p className="text-yellow-300 text-lg truncate">cid : <span className=" text-sm text-white">{item.cid}</span></p>
          <div className="text-yellow-300">TimeStamp : <span className="text-sm text-white">{convertUTC(item.timestamp)}</span></div>
        </div>
      )) : isLoading ? (
        <p>Loading..</p>
      ) : (address ? (
        <p>No Uploads!!</p>
      ) : (
        <p>Connect Wallet!!</p>
      ))
    }
  </div>
  )
}

export default DataSent;