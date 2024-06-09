import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import "./index.css";
import Share from "./components/Share";
import Hero from "./components/Hero";
import { Polygon } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Digilocker from "./components/Digilocker";
import Dashboard from "./components/Dashboard"
import ShareService from "./components/ShareService";
import Track from "./components/Track";
import Revoke from "./components/Revoke";
import Grantaccess from "./components/Grantaccess";
import VideoCallInput from "./components/Health";
import VideoConfrence from "./components/VideoConfrence";
import PatientRecord from "./components/PatientRecord";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import PatientDashboard from "./components/patientDashboard";
import MainDashboard from "./components/MainDash";
import SOSRequest from "./components/SOSRequest";
import SOSRequestList from "./components/SOSRequestList";
import MicListener from "./components/MicListener";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Hero/>}/>
      <Route path='/shareService' element={<ShareService/>}/>
      <Route path='/shareService/share' element={<Share/>}/>
      <Route path='/digilocker' element={<Digilocker/>}/>
      <Route path='/digilocker/dashboard' element={<Dashboard/>}/>
      <Route path='/track' element={<Track/>}/>
      <Route path='/revoke' element={<Revoke/>}/>
      <Route path='/revoke/grant' element={<Grantaccess/>}/>
      <Route path='/meet' element={''}/>
      <Route path='room/:id' element={<VideoConfrence/>}/>
      <Route path='record' element={<PatientRecord/>}/>
      <Route path='recordlist' element={<PatientList/>}/>
      <Route path="/patient/:id" element={<PatientDetails/>} />
      <Route path="/patientdash" element={<PatientDashboard/>} />
      <Route path="/maindash" element={<MainDashboard/>} />
      <Route path="/sosreq" element={<SOSRequest/>} />
      <Route path="/sosreqlist" element={<SOSRequestList/>} />
      <Route path="/miclistener" element={<MicListener/>} />
    </Route>
  )
)

//XDC
const customChain = {
  chainId: 51, 
  rpc: ["https://rpc.apothem.network"], 

  nativeCurrency: {
    decimals: 18,
    name: "XDC",
    symbol: "XDC",
  },
  shortName: "xdc-testnet", // Display value shown in the wallet UI
  slug: "xinfin-testnet", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "XinFin", // Name of the network
  name: "XinFin Apothem Testnet", // Name of the network
};


root.render(
      <ThirdwebProvider
        clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
        activeChain = {customChain}
      >
        <RouterProvider router={router}/>
      </ThirdwebProvider>

);
