import React, {useState, useEffect} from 'react'
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { curve, heroBackground, imgFile } from "../assets";
import { useAddress, useContract } from '@thirdweb-dev/react';


const url = process.env.REACT_APP_BACKEND_URL;
const curl = process.env.REACT_APP_CHAT_URL;
const DataReceived = () => {
  const [msg, setMsg] = React.useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [selectedImage, setSelectedImage] = useState(null);
  const address = useAddress();
  const { contract,isLoading } = useContract(`0x4F6E7C39E54DA42feBA978D7441335a36802A15c`);

useEffect(() => {
    const fetchData = async () => {
      const receiver = address;
      try {
        const resp = await axios.get(`https://chat-phi-kohl.vercel.app/getreceiveData/${receiver}`);
        setMsg(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleBoxClick = async (item) => {
    try {
      console.log(item.content);
      const res = await axios.get(`${url}/img/${item.content}`);
      console.log(res);
      setSelectedImage(imgFile); 
      console.log(done);
    } catch (error) {
      console.log(error);
    }

  setIsPopupOpen(true); 
  };

  // Function to close the popup
  const handlePopupClose = () => {
    setIsPopupOpen(false); 
    // window.location.reload();
    setSelectedImage(null); 
  };


  const formatTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleString(); 
  };
  

  

  return (
    <div className="flex flex-col gap-2 p-4">
    {msg.length !== 0 ? (
        msg.map((item, index) => (
          <div key={index} className="box bg-zinc-700 rounded-lg shadow-lg border-transparent p-4 cursor-pointer hover:bg-zinc-800" onClick={() => handleBoxClick(item)}>
            {/* <div className="text-yellow-3100">Filename : <span className='text-white'>{item.filename}</span></div> */}
            <div className="text-emerald-300">Receiver : <span className='text-white text-sm'>{item.receiver}</span></div>
            <p className="text-yellow-300 truncate text-lg">cid : <span className="text-white text-sm">{item.content}</span></p>
            <div className="text-yellow-300 text-lg">TimeStamp : <span className='text-white text-sm'>{formatTimestamp(item.createdAt)}</span></div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 bg-zinc-700 rounded-lg shadow-lg border-transparent">No Uploads!!</p>
      )}
            {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h5 className="text-xl font-medium text-gray-800">Image Preview</h5>
              <button onClick={handlePopupClose} type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <IoCloseSharp size={24}/>
              </button>
            </div>
            <div className="p-4">
              {selectedImage && (
                <img src={selectedImage} alt="Selected Image Preview" className="w-full h-auto object-contain rounded-lg" />
              )}
              {!selectedImage && (
                <p className="text-gray-500 text-center">No image selected.</p>
              )}
            </div>
          </div>
        </div>
      )}
  </div>
  )
}

export default DataReceived;
