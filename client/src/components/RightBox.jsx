
// import React, { useState } from "react";
// import Button from "./Button";
// import Section from "./Section";
// import { Dragendrop } from "./Dragendrop";
// import { isValidChecksumAddress } from "ethereumjs-util";
// import { useContract, useContractWrite, useAddress } from "@thirdweb-dev/react";
// import { Web3 } from "web3";
// import axios from "axios";
// import {smb} from "./smb.jsx";
// import { ankle } from "../assets/index.js";

// const web3 = new Web3(window.ethereum);

// export const RightBox = () => {
// const [dip, setDip] = useState(false);
//   const address = useAddress();
//   const { contract, loading } = useContract("0x4F6E7C39E54DA42feBA978D7441335a36802A15c");
//   const { mutateAsync: addFileToIPFS, isLoading } = useContractWrite(
//     contract,
//     "addFileToIPFS"
//   );
//   const [options, setOptions] = useState([
//     { cid: "QmP1iJNWv9zgrWBDJ9fcMszywxiQEHgnQpqAWknF8UvpuG" },
//     { cid: "QmepBVgf1faE3d1MMivdnjanhhuwheFTtxgkdJAzyBzBYP" },
//   ]);
//   const [selectedOption, setSelectedOption] = useState("");

//   const [fileData, setFileData] = React.useState(null);
//   const [recieverAddress, setReceiverAddress] = React.useState("");

//   const sender = useAddress();

// React.useEffect(() => {
//   const fetchData = async () => {
//     if (!loading) {
//       const data = await contract.call("getFiles", [address]);
//       setOptions(data);
//       console.log(options.length);
//     }
//   };
//   fetchData();
// }, [address,contract]);

// const handleChange = (event) => {
//   setSelectedOption(event.target.value);
// };

// const handleFileData = (data) => {
//   setFileData(data);
//   console.log(data);
// };

//   const upload = async (event) => {
//     event.preventDefault();
//     const balance = await web3.eth.getBalance(sender);

//     if (balance === 0n) {
//       return alert("Your Wallet has no funds!");
//     }
//     const isValid = localStorage.getItem("status");
//     if (fileData === null) {
//       return alert("Please upload a file");
//     }
//     if (!isValid) {
//       return alert("Please enter a wallet address!");
//     }

//     if (fileData.length > 0) {
//       // localStorage.removeItem("status");
//       console.log(fileData[0].name);
//       const reader = new FileReader();
//       reader.onload = function (fileEvent) {
//         const f = fileEvent.target.result;
//         setFileData(f);
//         axios
//           .post("http://localhost:3000/share", { fileData: f })
//           .then(async (res) => {
//             const cid = res.data.cid;
//             console.log(cid);
//             console.log(sender, recieverAddress);
//             const data = await addFileToIPFS({
//               args: [sender, recieverAddress, cid],
//             });
//             console.log(data);
//             console.log(sender, recieverAddress);
//             const sendData = await axios.post(
//               "http://localhost:5002/sendData",
//               {
//                 content: cid,
//                 sender,
//                 name: fileData[0].name,
//                 receiver: recieverAddress,
//               }
//             );
//             console.log(sendData);
//             console.log("check2");
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       };
//       reader.readAsDataURL(fileData[0]);
//     }

//     setDip(false);
//   };

//   const checkValidAddress = () => {
//     try {
//       const isValid = isValidChecksumAddress(recieverAddress);
//       if (isValid) {
//         //disable the button
//         localStorage.setItem("status", true);
//         alert("Address verified!!");
//       } else {
//         alert("Please verify receiver address!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

// const promp = () =>{
//   const s = prompt("Enter the seed value.");
//   console.log(s);
//   setDip(true);
// }

//   return (
//     <div className="w-1/2 h-[45rem] mb-5 bg-stone-900 p-2 rounded-md">
//       <div className="flex gap-2">
//         <input
//           type="text"
//           onChange={(e) => {
//             setReceiverAddress(e.target.value);
//           }}
//           className="w-full p-3 font-code rounded-md"
//           placeholder="Reciever Id"
//         />
//         <Button onClick={checkValidAddress}>Verify</Button>
//       </div>
//       <Section
//         className="w-full h-[580px] -mx-2 my-3"
//         crosses
//         customPaddings
//         id="data"
//       >
//         <div className="container">
//           <Dragendrop onFileData={handleFileData} />
//         </div>
//       </Section>
// <label>
//   <input 
//   type="checkbox"
//   id="action"
//   name="action"
//     onClick={promp}
//   />
//   Scramble
// </label>

//       <div className="w-full">
//         <Button onClick={upload} className="w-full content-end flex">
//           Send
//         </Button>
//         <div>
//           <select value={selectedOption} onChange={handleChange}>
//             <option value="">Upload from Guardian</option>
//             {options.map((option, index) => (
//               <option key={index} value={option.cid} className="text-white">
//                 {option.cid}
//               </option>
//               // <option key={option.id} value={option.cid}>{option.cid}</option>
//               // <option key={option.id} value={option.cid}>{option.cid}</option>
//             ))}
//           </select>
//           {selectedOption && <p>You selected: {selectedOption}</p>}
//         </div>
//       </div>
// {dip && (
//   <div className="w-80 h-80">
//     <img src={ankle} alt="" />
//     </div>
// )}
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react'
import Button from './Button'
import Section from './Section'
import { Dragendrop } from './Dragendrop'
import { Address, isValidChecksumAddress } from 'ethereumjs-util';
import { useContract, useContractWrite, useContractRead, useAddress } from '@thirdweb-dev/react';
import { Web3 } from 'web3';
import axios from "axios";
import { ankle } from "../assets/index.js";

const web3 = new Web3(window.ethereum);

const cAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
export const RightBox = () => {
  const [dip, setDip] = useState(false);
  // xdc - 0xBC7E42dB009FF1F6FEc7d81370a081fdfe47b978 - File guardian -wrong
  // xdc - 0x6ad330dd68BeAF54cf4ACd311d91991F8Faa94E9 - File exchange -wrong
  // xdc - 0x4F6E7C39E54DA42feBA978D7441335a36802A15c - file exchange 
  const { contract } = useContract("0x4F6E7C39E54DA42feBA978D7441335a36802A15c");
  const { mutateAsync: addFileToIPFS, isLoading } = useContractWrite(contract, 'addFileToIPFS');

  const [fileData, setFileData] = React.useState(null);
  const [data, setData] = React.useState("");
  const [recieverAddress, setReceiverAddress] = React.useState('');

  const sender = useAddress();

  const handleFileData = (data) => {
    setFileData(data);
  }

  const promp = () => {
    const s = prompt("Enter the seed value.");
    console.log(s);
    setDip(true);
  }

  const upload = async (event) => {
    console.log("upload event")
    event.preventDefault();
    const balance = await web3.eth.getBalance(sender);

    if (balance === 0n) {
      return alert("Your Wallet has no funds!");
    }
    const isValid = localStorage.getItem("status");
    if (fileData === null) {
      return alert("Please upload a file");
    }
    if (!isValid) {
      return alert("Please enter a wallet address!");
    }

    if (fileData.length > 0) {
      localStorage.removeItem("status");
      const reader = new FileReader();

      reader.onload = function (fileEvent) {
        const f = fileEvent.target.result;
        setFileData(f);

        axios.post("http://localhost:3000/share", { fileData: f })
          .then(async (res) => {
            console.log(res);
            const cid = res.data.IpfsHash;
            // Extract the last value after the last slash
            const lastValue = cid.substring(cid.lastIndexOf("/") + 1);
            console.log(cid);
            console.log("Last value:", lastValue);
            console.log(sender, recieverAddress);
            const data = await addFileToIPFS({ args: [sender, recieverAddress, lastValue] });
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          })
      };
      reader.readAsDataURL(fileData[0]);
    }
  }

  const checkValidAddress = () => {
    try {
      const isValid = isValidChecksumAddress(recieverAddress);
      if (isValid) {
        localStorage.setItem("status", true);
        alert("Address verified!!");
      }
      else {
        alert("Please verify receiver address!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [options, setOptions] = useState([
    { "cid": "QmepBVgf1faE3d1MMivdnjanhhuwheFTtxgkdJAzyBzBYP" },
    { "cid": "QmP1iJNWv9zgrWBDJ9fcMszywxiQEHgnQpqAWknF8UvpuG" },
    { "cid": "QmP1iJNWv9zgrWBDJ9fcMszywxiQEHgnQpqAWknF8UvpuG" },
  ]);
  const [selectedOption, setSelectedOption] = useState('');

  // useEffect(() => {
  //     // Fetch data from API
  //     fetch('https://api.example.com/data')
  //         .then(response => response.json())
  //         .then(data => {
  //             // Assuming the API returns an array of objects with 'id' and 'name' properties
  //             setOptions(data);
  //         })
  //         .catch(error => console.error('Error fetching data:', error));
  // }, []); // Runs once on component mount

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-1/2 h-[45rem] mb-5 bg-stone-900 p-2 rounded-md">
      <div className="flex gap-2">
        <input type="text" onChange={(e) => { setReceiverAddress(e.target.value) }} className="w-full p-3 font-code rounded-md" placeholder="Reciever Id" />
        <Button onClick={checkValidAddress}>Verify</Button>
      </div>
      <Section
        className="w-full h-[580px] -mx-2 my-3"
        crosses
        customPaddings
        id="data"
      >
        <div className="container">
          <Dragendrop onFileData={handleFileData} />
        </div>
        <label>
          <input
            type="checkbox"
            id="action"
            name="action"
            onClick={promp}
          />
          Scramble
        </label>
      </Section>
      <div className="w-full flex flex-col gap-4">
        <Button onClick={upload} className="w-full content-end flex">Send</Button>
        <div>
          <select value={selectedOption} onChange={handleChange}>
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option className="text-white" key={index} value={option.id}>{option.cid}</option>
            ))}
          </select>
          {selectedOption && <p>You selected: {selectedOption}</p>}
        </div>
      </div>
      {dip && (
        <div className="w-80 h-80">
          <img src={ankle} alt="" />
        </div>
      )}
    </div>
  )
}