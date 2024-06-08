// import React, { useState } from 'react';
// import CryptoJS from 'crypto-js'; // Import CryptoJS library
// import {  imgFile } from "../assets";
// import axios from "axios";

// const Grantaccess = () => {
//     const [pass, setpass] = useState(null);
//     const [seed, setseed] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [cid, setCid] = useState();
//     const decryptData = (encryptedData, secretKey) => {
//         try {
//             const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//             const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
//             return JSON.parse(decryptedData);
//         } catch (error) {
//             console.error('Decryption error:', error);
//             return null;
//         }
//     }

//     const handleBoxClick = async (item) => {
//         try {
//         //   console.log(item.cid);
//           const res = await axios.get(`http://localhost:3000/img/${item}`);
//           console.log(res);
//           console.log(done);
//           setSelectedImage(imgFile);
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       React.useEffect(()=>{
//         // setSelectedImage(imgFile);
//       }, [selectedImage])
    
//     const decript = () =>{
//         const decryptedData = decryptData("U2FsdGVkX1/6fCq2Rf950REGfGMyChxSB7DO/KqqyS0qP5BiWHgGzBIfhS6P3QC3uCjEMW+/SAVjw1Hw72OEEg==", 'secret key');
//         console.log('Decrypted Data:', decryptedData);
//         setCid(decryptedData.setCid);
//         handleBoxClick("QmRdXGSKqRXjPkNxDzHPqEe7fmYfzLKWKSimE3GnxQ3arx");
//         // setSelectedImage(imgFile);
//         revokeAccess(decryptData.selectedDate);
//     }

//     const revokeAccess = (date) => {
//         if(date >= new Date().toLocaleDateString()) alert("Access denied time over !!");
//         alert("You can access data");
//     }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
//       <label htmlFor="password" className="text-white mb-2">Encrypted Password</label>
//       <input id="password" value={pass} onChange={(e) => {setpass(e.target.value)}} type="password" className="bg-gray-800 text-white rounded-lg px-4 py-2 w-64 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
//       <label htmlFor="seed" className="text-white mb-2">Seed Value</label>
//       <input id="seed" value={seed} onChange={(e) => setseed(e.target.value)} type="text" className="bg-gray-800 text-white rounded-lg px-4 py-2 w-64 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
//       <button onClick={decript} className="bg-orange-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-orange-600 transition duration-300">Grant Access</button>
//       <div className="p-4">
//               {selectedImage && (
//                 <img src={selectedImage} alt="Selected Image Preview" className="w-full h-auto object-contain rounded-lg" />
//               )}
//               {!selectedImage && (
//                 <p className="text-gray-500 text-center">No image selected.</p>
//               )}
//             </div>
//     </div>
//   );
// };
  
// export default Grantaccess;


import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from "axios";
import { imgFile } from "../assets";

const Grantaccess = () => {
    const [pass, setpass] = useState('');
    const [seed, setseed] = useState('');
    const [selectedImage, setSelectedImage] = useState(imgFile);
    const [id, setid] = useState(null);

    const decryptData = (encryptedData, secretKey) => {
        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
            const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedData);
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }

    const handleBoxClick = async (item) => {
        try {
            const res = await axios.get(`http://localhost:3000/img/${item}`);
            setSelectedImage(imgFile); // Assuming res.data is the URL of the image
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        // You can perform any side effects related to selectedImage here
        setSelectedImage(imgFile);
    }, [selectedImage]);


    const decript = () => {
        
        const decryptedData = decryptData(pass, seed);
        console.log('Decrypted Data:', decryptedData);
        // setid(decryptedData.setCid);
        revokeAccess(decryptData.selectDate);
        console.log(id);
        handleBoxClick(id);
        // do the reload
    }

    const revokeAccess = (date) => {
        if (date <= new Date().toLocaleDateString()) alert("Access denied time over !!");
        alert("Access denied time over !!");
        console.log(new Date().toLocaleDateString())
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-zinc-900">
            <label htmlFor="password" className="text-white mb-2">Encrypted Password</label>
            <input id="password" value={pass} onChange={(e) => { setpass(e.target.value) }} type="password" className="bg-gray-800 text-white rounded-lg px-4 py-2 w-64 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <label htmlFor="seed" className="text-white mb-2">Seed Value</label>
            <input id="seed" value={seed} onChange={(e) => setseed(e.target.value)} type="text" className="bg-gray-800 text-white rounded-lg px-4 py-2 w-64 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <button onClick={decript} className="bg-orange-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-orange-600 transition duration-300">Grant Access</button>
            <div className="p-4">
                {selectedImage ? (
                    <img src={selectedImage} alt="Selected Image Preview" className="w-full h-auto object-contain rounded-lg" />
                ) : (
                    <p className="text-gray-500 text-center">No image selected.</p>
                )}
            </div>
        </div>
    );
};

export default Grantaccess;
