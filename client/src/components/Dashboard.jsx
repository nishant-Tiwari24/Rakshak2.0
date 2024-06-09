
import { benefits } from "../constants/index";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import ClipPath from "../assets/svg/ClipPath";
import { GradientLight } from "./design/Benefits";
import UploadButton from "./UploadButton";
import { useState, useEffect } from "react";
import {
  useContract,
  useContractWrite,
  useContractRead,
  useAddress,
} from "@thirdweb-dev/react";
import { MissingGasInnerError } from "web3";
import { benefitIcon2, benefitIcon3, benefitImage2 } from "../assets";
import { IoCloseSharp } from "react-icons/io5";
import { imgFile } from "../assets";
import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;
const cAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const Dashboard = () => {
  const { contract, isLoading } = useContract(
   `0xBC7E42dB009FF1F6FEc7d81370a081fdfe47b978`
  );
  const address = useAddress();
  console.log(address);
  const [msg, setMsg] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleBoxClick = async (item) => {
    try {
      console.log(item.cid);
      
      const url = `https://amaranth-added-parrotfish-511.mypinata.cloud/ipfs/${item.cid}?pinataGatewayToken=zPkBFUwZXAHKaaAPXuq5o5AEEqFgqV9eXkrqhnSiRfvNZnwmTuB-fDHfRvyVIdDv`;
      window.open(url,'_blank');
      console.log(done);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    window.location.reload();
    setSelectedImage(null);
  };

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
    const utcDateTime = decimalToUTC(decimal); 
    const utcDate = new Date(utcDateTime);
    const istDate = utcDate.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    }); // Convert to IST
    return istDate;
  };

  return (
    <Section id="features" className="min-h-screen">
      <UploadButton className="fixed bottom-4 right-4 z-100" />
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Your secured documents"
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {msg.map((item, index) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              key={index}
              onClick={() => handleBoxClick(item)}
            >
              <div className="relative z-2 flex flex-col min-h-[12rem] p-[2.4rem] cursor-pointer">
                <h5 className="text-lg mb-2 break-words">{item.cid}</h5>
                <p className="body-2 mb-6 text-n-3">
                  {convertUTC(item.timestamp)}
                </p>
                <div className="flex items-center mt-auto">
                  <img
                    src={benefitIcon3}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <p className="ml-auto font-code text-xs hover:underline font-bold text-n-1 uppercase tracking-wider">
                    Open document
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

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h5 className="text-xl font-medium text-gray-800">
                Image Preview
              </h5>
              <button
                onClick={handlePopupClose}
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <IoCloseSharp size={24} />
              </button>
            </div>
            <div className="p-4">
              {selectedImage && (
                <iframe src="https://amaranth-added-parrotfish-511.mypinata.cloud/ipfs/QmUtMaPZACmApkw9h9N1bLd6avr78kkgqyhAgfRa8ccdP3" height="100px" width="100px"></iframe>
              )}
              {!selectedImage && (
                <>
                                <iframe src="https://amaranth-added-parrotfish-511.mypinata.cloud/ipfs/QmUtMaPZACmApkw9h9N1bLd6avr78kkgqyhAgfRa8ccdP3" height="100px" width="100px"></iframe>
                <p className="text-gray-500 text-center">No image selected.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Dashboard;
