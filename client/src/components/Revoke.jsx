import { benefits } from "../constants/index";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import ClipPath from "../assets/svg/ClipPath";
import { GradientLight } from "./design/Benefits";
import { useState, useEffect } from "react";
import {
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import { benefitIcon4, benefitIcon2, benefitImage2 } from "../assets";
import { IoCloseSharp } from 'react-icons/io5';
import axios from "axios";
import CryptoJS from 'crypto-js'; // Import CryptoJS library

const cAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const Revoke = () => {
  const { contract, isLoading } = useContract(
    `0xBC7E42dB009FF1F6FEc7d81370a081fdfe47b978`
  );
  const address = useAddress();
  const [msg, setMsg] = useState([]);
  const [setCid, GrantedCid] = useState("Qmc5dAkjELhjdvnWHcsS3d8MVtABeauNHqQSTaAuXJLZBC");
  const [grantaccess, setgrantaccess] = useState(false)
  const [selectDate, onDate] = useState(new Date());
  const [pass, setpass] = useState(null);
  const [email, setemail] = useState(null);
  const [popup, setIsPopupOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading) {
        const data = await contract.call("getFiles", [address]);
        setMsg(data);
        console.log(msg.length);
      }
    };
    fetchData();
  }, [address, contract]);

//   const a = (b) =>{
//     setIsPopupOpen(true) ; 
//     GrantedCid(b); 
//     console.log(setCid);
//   }

  const bytes32ToDecimal = (bytes32Hex) => {
    if (bytes32Hex.startsWith("0x")) {
      bytes32Hex = bytes32Hex.slice(2);
    }
    let result = BigInt("0x" + bytes32Hex);
    return result.toString();
  };

  const decimalToUTC = (decimalTimestamp) => {
    const timestampMilliseconds = decimalTimestamp * 1000;
    const date = new Date(timestampMilliseconds);
    const utcString = date.toUTCString();
    return utcString;
  };

  const convertUTC = (bytes32) => {
    const decimal = bytes32ToDecimal(bytes32);
    const utcDateTime = decimalToUTC(decimal); // Get the UTC date and time string
    const utcDate = new Date(utcDateTime); // Convert UTC string to a Date object
    const istDate = utcDate.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    }); // Convert to IST
    return istDate;
  };

  const handleGrantAccess = () => {
    const data = {
        selectDate,
        setCid,
    };
    const jsonData = JSON.stringify(data);
      const encryptedDate = CryptoJS.AES.encrypt(jsonData, 'secret key').toString();
      console.log(encryptedDate);

    //   call function to node

      sendOTP();
      setgrantaccess(true);
    //   decript();
  }

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

const decript = () =>{
    const decryptedData = decryptData("U2FsdGVkX1/uuETks+2enQEMrvv3NZEDLeYf4+OJdBM1jfwr97fpuSE7OXjcvzdm0gF1gL0UHVU1030rLD8g9w==", 'secret key');
    console.log('Decrypted Data:', decryptedData);
}

  const sendOTP = () => {
    setOtpSent(true);
  }

  return (
    <Section id="features" className="min-h-screen">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Grant access to Known one"
        />
        <div className="flex flex-wrap gap-10 mb-10">
          {msg.map((item, index) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              key={index}
            >
              <div className="relative z-2 flex flex-col min-h-[12rem] p-[2.4rem] cursor-pointer">
                <h5 className="text-lg mb-2 break-words">{item.cid}</h5>
                <p className="body-2 mb-6 text-n-3">
                  {convertUTC(item.timestamp)}
                </p>
                
                <div  className="flex items-center mt-auto">
                <div className="flex align-middle justify-end mb-6">
                <button
                    onClick={()=> {GrantedCid(item.cid); console.log(setCid) }}
                  className="text-sm text-gray-800 hover:text-white p-2 rounded-lg bg-yellow-200 focus:outline-none"
                >
                  Get Cid
                </button>
              </div>
                  <p onClick={()=>{setIsPopupOpen(true)}} className="ml-auto font-code text-xs hover:underline font-bold text-n-1 uppercase tracking-wider">
                    Grant Access
                  </p>
                  <Arrow />
                </div>
              </div>

              <GradientLight />

              <div
                className="absolute inset-0.5 bg-zinc-800"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-90">
                  <img
                    src={benefitImage2}
                    width={380}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ClipPath />
            </div>
          ))}
        </div>
      </div>
      {popup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">

          <div className="popup-content bg-white rounded-lg shadow-md p-6 w-96">
            <h3 className="text-lg font-medium text-black mb-4">Grant Access</h3>
            <div className="relative mb-6">
              <label htmlFor="date" className="text-sm text-gray-700 mb-2 block">Access Expiration Date (Required)</label>
              <input
                type="date"
                min={new Date().toLocaleDateString}
                value={selectDate}
                onChange={(e) => onDate(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="text-sm text-gray-700 mb-2 block">Email (Required)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              />
            </div>
            {!otpSent ? (
              <div className="flex justify-end mb-6">
                <button
                    
                  className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  Get Cid
                </button>
              </div>
            ) : (
              <></>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleGrantAccess}
                className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                Grant Access
              </button>
            </div>
          </div>

        </div>
      )}
    </Section>
  );
};

export default Revoke;
