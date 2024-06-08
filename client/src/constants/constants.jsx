import React, { useState, useEffect } from "react";
import Button from "./Button";
import Section from "./Section";
import { Dragendrop } from "./Dragendrop";

export const RightBox = () => {
  const [fileData, setFileData] = useState();
  const [data, setData] = useState(null);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [method, setMethod] = useState("doScramble");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [canv, setCanv] = useState(null);

  const promp = (msg, err) => {
    const seed = prompt(`${err ? msg + err : msg}`);
    const toNumber = (str) => {
      return str.split("").map((c) => c.charCodeAt(0)).join("") % 0xffffff;
    };

    if (!seed) {
      return promp(msg, "\nPassword is required!");
    } else if (seed.length < 6) {
      return promp(msg, "\nPassword must be at least 6 characters long!");
    } else if (Number.isNaN(Number(seed))) {
      return toNumber(seed);
    }

    return seed | 0;
  };

  const canvToBlob = () => {
    const bin = atob(canv.toDataURL().split(",")[1]);
    const arr = new Uint8Array(bin.length).map((v, i) => bin.charCodeAt(i));

    return new Blob([arr], {
      type: "image/png",
    });
  };

  const doDownload = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(canvToBlob());
    a.download = "canvas.png";
    a.click();
    URL.revokeObjectURL(a.href);
    a.removeAttribute("href");
  };

  const methods = {
    doScramble: (what) => {
      const seed = promp('Password for encoding:');
      console.log('scramble image', seed);
      for (let i = 0; i < what.length; i++) {
        // const pos = (seed % (i + 1) + i) % what.length;
        const pos = (i * i % seed + seed) % what.length;
        const temp = what[i];
  
        what[i] = what[pos];
        what[pos] = temp;
      }
    },
    doUnscramble: (what) => {
      const seed = promp('Password for decoding:');
      console.log('unscramble image', seed);
      for (let i = what.length - 1; i >= 0; i--) {
        // const pos = (seed % (i + 1) + i) % what.length;
        const pos = (i * i % seed + seed) % what.length;
        const temp = what[i];
  
        what[i] = what[pos];
        what[pos] = temp;
      }
    },
  };

  useEffect(() => {
    const canvas = document.querySelector(".canv");
    const context = canvas.getContext("2d");
    setCanv(canvas);
    setCtx(context);
  }, []);

  const onImageLoad = (img) => {
    setImgLoaded(true);
    ctx.clearRect(0, 0, canv.width, canv.height);
    canv.width = img.width;
    canv.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canv.width, canv.height);
    methods[method](imgData.data);
    ctx.putImageData(imgData, 0, 0);
  };

  const readFile = (file) => {
    console.log(file.name);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const img = new Image();
      img.onload = () => onImageLoad(img);
      img.src = e.target.result;
    };
    fileReader.readAsDataURL(file);
  };

  const updateMethod = () => {
    setMethod(method === "doScramble" ? "doUnscramble" : "doScramble");
    if (imgLoaded) {
      const imgData = ctx.getImageData(0, 0, canv.width, canv.height);
      methods[method](imgData.data);
      ctx.putImageData(imgData, 0, 0);
    }
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      readFile(files[0]);
    }
  };

  const checkUser = () => {

  };

  const handleFileData = () => {

  };

  const upload = () => {
    
  };

  return (
    <div className="w-1/2 h-[45rem] mb-5 bg-stone-900 p-2 rounded-md">
      <div className="flex gap-2">
        <input
          type="text"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          className="w-full p-3 font-code rounded-md"
          placeholder="Receiver Id"
        />
        <Button onClick={checkUser}>Check</Button>
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
      </Section>
      <div className="options">
        <button className="download" onClick={doDownload}>
          Download
        </button>
        <input
          type="file"
          className="file"
          name="image"
          accept="image/*"
          onChange={onFileChange}
        />
        <label htmlFor="action">
          <input
            type="checkbox"
            id="action"
            name="action"
            checked={method === "doScramble"}
            onChange={updateMethod}
          />
          Scramble / Unscramble
        </label>
      </div>
      <canvas className="canv"></canvas>
      <div className="w-full">
        <Button onClick={upload} className="w-full content-end flex">
          Send
        </Button>
      </div>
    </div>
  );
};


// import React, { useState } from "react";
// import Button from "./Button";
// import Section from "./Section";
// import { Dragendrop } from "./Dragendrop";
// import { isValidChecksumAddress } from "ethereumjs-util";
// import { useContract, useContractWrite, useAddress } from "@thirdweb-dev/react";
// import { Web3 } from "web3";
// import axios from "axios";

// const web3 = new Web3(window.ethereum);

// export const RightBox = () => {
//   const address = useAddress();
//   const { contract, loading } = useContract(
//     "0x386768EafD1dBa8Bee54998E60121DBd3A8B7B73"
//   );
//   const { mutateAsync: addFileToIPFS, isLoading } = useContractWrite(
//     contract,
//     "addFileToIPFS"
//   );
//   const [options, setOptions] = useState([
//     { cid: "Qmb5t2pzMj5fLdDQx9ybWYyn2ob3NkFb1Rty9eFpivxDHE" },
//     { cid: "QmRdXGSKqRXjPkNxDzHPqEe7fmYfzLKWKSimE3GnxQ3arx" },
//   ]);
//   const [selectedOption, setSelectedOption] = useState("");

//   const [fileData, setFileData] = React.useState(null);
//   const [recieverAddress, setReceiverAddress] = React.useState("");

//   const sender = useAddress();

  React.useEffect(() => {
    const fetchData = async () => {
      if (!loading) {
        const data = await contract.call("getFiles", [address]);
        setOptions(data);
        console.log(options.length);
      }
    };
    fetchData();
  }, [address]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileData = (data) => {
    setFileData(data);
    console.log(data);
  };

  // const upload = async (event) => {
  //   event.preventDefault();
  //   const balance = await web3.eth.getBalance(sender);

  //   if (balance === 0n) {
  //     return alert("Your Wallet has no funds!");
  //   }
  //   const isValid = localStorage.getItem("status");
  //   if (fileData === null) {
  //     return alert("Please upload a file");
  //   }
  //   if (!isValid) {
  //     return alert("Please enter a wallet address!");
  //   }

  //   if (fileData.length > 0) {
  //     localStorage.removeItem("status");
  //     console.log(fileData[0].name);
  //     const reader = new FileReader();
  //     reader.onload = function (fileEvent) {
  //       const f = fileEvent.target.result;
  //       setFileData(f);
  //       axios
  //         .post("http://localhost:3000/share", { fileData: f })
  //         .then(async (res) => {
  //           const cid = res.data.cid;
  //           console.log(cid);
  //           console.log(sender, recieverAddress);
  //           const data = await addFileToIPFS({
  //             args: [sender, recieverAddress, cid],
  //           });
  //           console.log(data);
  //           console.log(sender, recieverAddress);
  //           const sendData = await axios.post(
  //             "http://localhost:5002/sendData",
  //             {
  //               content: cid,
  //               sender,
  //               name: fileData[0].name,
  //               receiver: recieverAddress,
  //             }
  //           );
  //           console.log(sendData);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     };
  //     reader.readAsDataURL(fileData[0]);
  //   }
  // };

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
//       <label>
//         <input 
//         type="checkbox"
//         id="action"
//         name="action"
        
//         />
//         Scramble
//       </label>
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
//     </div>
//   );
// };
