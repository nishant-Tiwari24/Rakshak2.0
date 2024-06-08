// import React, { useState } from 'react';

// const UploadButton = ({ onClick }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);

//   // Replace with your actual file upload logic
//   const handleUpload = (e) => {
//     const files = e.target.files;
//     if (files) {
//       // Process uploaded files here
//       console.log('Uploaded files:', files);
//       handleClose();
//     }
//   };

//   return (
//     <>
//       <button
//         className="fixed bottom-24 right-20 rounded-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold focus:outline-none shadow-md hover:bg-orange-500 z-50" // Added z-index: 50
//         onClick={handleOpen}
//       >
//         Upload
//       </button>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-gray-500/50 dark:bg-black/50 backdrop-blur-sm flex justify-center items-center z-50" // Added z-index: 60
//         >
//           <div className="bg-zinc-800 w-[38rem]  rounded-lg shadow-md px-10 py-8">
//             <h3 className="text-xl font-medium mb-4 z-50 text-center">Upload Files</h3>
//             <div className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 dark:border-white rounded-lg p-4">
//               <svg
//                 className="w-12 h-12 text-gray-400 dark:text-white"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5zM8 14v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V14a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z"
//                   clipRule="evenodd"
//                   fillRule="evenodd"
//                 />
//               </svg>
//               <p className="mt-2 text-zinc-700 dark:text-white">Drag & Drop files here</p>
//               <br />
//               <p className="text-sm text-gray-500 dark:text-gray-300">or</p>
//               <button
//                 className="mt-4 bg-transparent hover:bg-white text-orange-500 font-bold py-2 px-4 rounded focus:outline-none"
//                 onClick={() => document.getElementById('fileInput').click()}
//               >
//                 Browse Files
//               </button>
//               <input
//                 type="file"
//                 id="fileInput"
//                 multiple
//                 onChange={handleUpload}
//                 className="hidden"
//               />
//             </div>
//             <button
//               className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
//               onClick={handleClose}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UploadButton;
import { useAddress } from '@thirdweb-dev/react';
import React, { useState,useRef } from 'react';
import { FiFile } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useContract, useContractWrite, useContractRead } from '@thirdweb-dev/react';
import { Web3 } from 'web3';
import axios from 'axios';

const web3 = new Web3(window.ethereum);

const UploadButton = () => {
  const sender = useAddress();
  const { contract } = useContract("0xBC7E42dB009FF1F6FEc7d81370a081fdfe47b978");
  const { mutateAsync : addFileToIPFS, isLoading } = useContractWrite(contract,'addFileToIPFS');

  const [files, setFiles] = useState([]);
    const [drop, setDrop] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [fileData,setfileData] = useState(null);
    const inputRef = useRef();

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        setFiles([...files, ...droppedFiles]);
        // onFileData([...files, ...droppedFiles]);
    }

    const handleFileChange = (event) => {
      const selectedFiles = event.target.files;
      setFiles([...files, ...selectedFiles]);
      // onFileData([...files, ...selectedFiles]);
    }

    const removeFile = (index) => {
      const updatedFiles = [...files];
      updatedFiles.splice(index, 1);
      setFiles(updatedFiles);
      // onFileData(updatedFiles);
  }

  //   const handleDrop = (event) => {
  //     event.preventDefault();
  //     const droppedFiles = event.dataTransfer.files;
  //     setFiles([...files, ...droppedFiles]);
  //     onFileData([...files, ...droppedFiles]);
  // }

  // const handleFileChange = (event) => {
  //     const selectedFiles = event.target.files;
  //     setFiles([...files, ...selectedFiles]);
  //     onFileData([...files, ...selectedFiles]);

  // const file = event.target.files;
  // if (file.length > 0) {
  //     const reader = new FileReader();
  //     reader.onload = function (fileEvent) {
  //         const fileData = fileEvent.target.result;
  //         console.log(fileData);
  //     };
  //     reader.readAsText(file[0]);
  // }
  // }
  // const handleFileUpload = async (event) => {
  //   event.preventDefault();
  //   const balance = await web3.eth.getBalance(address);

  //   if (balance === 0n) {
  //     return alert("Your Wallet has no funds!");
  //   }
  //   if (files.length === 0) {
  //     return alert("Please upload a file");
  //   }
  //   if (files.length > 0) {
  //     const reader = new FileReader();
  //     reader.onload = function (fileEvent) {
  //       const f = fileEvent.target.result;
  //       setFileData(f);
  //       console.log(fileData);
  //       //   axios.post("http://localhost:5000/share", { fileData : f})
  //       //   .then(async (res) => {
  //       //     const cid = res.data.cid;
  //       //     console.log(cid);
  //       //     console.log(sender,recieverAddress);
  //       //     const data = await addFileToIPFS({ args: [sender,recieverAddress,cid] });
  //       //     console.log(data);
  //       //   })
  //       //   .catch(err => {
  //       //     console.log(err);
  //       //   })
  //     };
  //     reader.readAsDataURL(fileData[0]);

  //   }
  // }

  const handleOpen = () =>{
    setIsOpen(true);
  }

  const uploads = (event) =>{
    event.preventDefault();
    console.log(files.length);

    if (files.length > 0) {
      console.log("I am in")
          const reader = new FileReader();

          reader.onload = function (fileEvent) {
            const f = fileEvent.target.result;
            setfileData(f);
            console.log(fileData);

            // https://bd-one-omega.vercel.app/
            // axios.post("http://localhost:3000/share", { fileData : f})

            axios.post("http://localhost:3000/share", { fileData : f})
            .then(async (res) => {
              const cid = res.data.IpfsHash;
              console.log(cid);
              console.log(sender);
              const data = await addFileToIPFS({ args: [sender,cid] });
              console.log(data);
            })
            .catch(err => {
              console.log(err);
            })
          };
          reader.readAsDataURL(files[0]);
        }
  }

const handleClose = () => {
  setIsOpen(false);
}
  return (
    <>
      <button
        className="fixed bottom-4 right-20 rounded-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold focus:outline-none shadow-md hover:bg-orange-500 z-50" // Added z-index: 50
        onClick={handleOpen}
      >
        Upload
      </button>
      {isOpen && (
        <div
          className="fixed flex flex-col inset-0 bg-black/50 backdrop-blur-sm gap-4 justify-center items-center z-50" 
        >
           {!drop && (
                <div className="flex z-5 flex-col h-[400px] justify-center items-center font-code  border-neutral-400 border-2 border-dashed p-3"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <h4 className="text-white button text-xl">Drag and drop to upload</h4>
                    <h6 className='text-xl button'>or</h6>
                    <br />
                    <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleFileChange}
                        ref={inputRef}
                    />
                    <button onClick={() => inputRef.current.click()} className="bg-gray-700 w-24 h- px-2 rounded-md border-gray-400 border-2">upload</button>
                </div>
            )}
          {!drop && (
                <div className="overflow-x-auto Whitespace-nowrap">
                    <div className="flex overflow-x-auto" >
                        {files.map((file, index) => (
                            <div key={index} className="file-item border-[1px] border-zinc-500 bg-zinc-700 text-white p-2 rounded-md m-1 flex items-center justify-between">
                            <div className="file-info flex items-center gap-2">
                                <FiFile className="text-zinc-200" /> {/* File icon */}
                                <span className="file-name text-xs text-zinc-200">{file.name}</span>
                            </div>
                            <button className="remove-button" onClick={() => removeFile(index)}>
                                <RxCross2 className="text-zinc-200 hover:text-red-500" />
                            </button>
                        </div>
                        ))}
                    </div>
                </div>
            )}
            <div className='flex justify-between w-[18rem]'>
            <button onClick={uploads} className="rounded-md bg-orange-700 hover:bg-orange-500 hover:border-[1px] p-3"> submit
            </button>
            <button onClick={handleClose} className="rounded-md bg-orange-700 hover:bg-orange-500 hover:border-[1px] text-white p-3">Close</button> 
            </div>
          
        </div>
      )}
    </>
  );
};

export default UploadButton;