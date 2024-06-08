import React from 'react'
import Button from './Button'
import { useContract, useAddress, useContractRead } from "@thirdweb-dev/react";


const cAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
export const SmallBox = () => {
  const address = useAddress();
  const { contract } = useContract(`0xBC7E42dB009FF1F6FEc7d81370a081fdfe47b978`);
  //const { mutateAsync : getFiles, isLoading } = useContractRead(contract,"getFiles");

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

  const handleClick = async () => {
    const data = await contract.call("getFiles",[address]);
    //handling only the first file
    const _cid = data[0].cid;
    const _receiver = data[0].receiver;
    const _timestamp = convertUTC(data[0].timestamp);

    alert(`CID: ${_cid}\nReceiver: ${_receiver}\nTimeStamp: ${_timestamp}`);
    //divideData(data);
  }

  return (
    // <div className="w-2/5 px-2 py-5 bg-neutral-800 rounded-md mx-4 my-2 flex justify-end">
    //     content

    // </div>
    <Button className="w-2/5 px-2 py-5 bg-neutral-800 rounded-md mx-4 my-2 flex justify-end" onClick={handleClick}>upload1</Button>
  )
}
