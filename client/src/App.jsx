import { Outlet } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Share from "./components/Share";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">

        <Header />

        <Outlet />
        
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
