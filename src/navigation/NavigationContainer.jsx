import React, { useContext } from "react";
import { FaBars, FaBell, FaHospitalUser, FaTv } from "react-icons/fa6";
import { Logo } from "../assets";
import { FaSignOutAlt } from "react-icons/fa";
import { ModalLogout } from "../features/Hospital";
import { AllContext } from "../context/AllProvider";
import { Link, useLocation } from "react-router";

const Top = () => {
  const { setLogout } = useContext(AllContext);
  return (
    <div className="fixed top-0 w-full h-[80px] flex bg-cyan-600">
      {/* first section */}
      <div className="w-[210px] flex">
        <FaBars className="m-auto text-white text-2xl" />
      </div>
      {/* second section */}
      <div className="w-full flex justify-between items-center px-7">
        {/* first */}
        <div className="flex gap-5">
          <img src={Logo} alt="" className="h-[35px] m-auto" />
          <div>
            <div className="text-white text-2xl">
              Queue Ring - Hospital Name
            </div>
            <div className="text-white text-xl">Address</div>
          </div>
        </div>
        {/* second */}
        <div>
          <FaSignOutAlt
            className="text-white text-2xl cursor-pointer"
            onClick={() => setLogout(true)}
          />
        </div>
      </div>
    </div>
  );
};
const SideItem = (props) => {
  const { to, icon, page } = props;
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to}>
      <div
        className={`flex items-center gap-2 text-white px-3 py-2 mb-3 ${
          isActive ? "bg-slate-400 rounded-md" : ""
        }`}
      >
        {icon}
        <div className={`text-lg ${isActive ? "font-bold" : ""}`}>{page}</div>
      </div>
    </Link>
  );
};
const Side = () => {
  return (
    <div className="w-[210px] fixed top-[80px] bottom-0 bg-slate-600">
      <div className=" h-screen flex flex-col justify-start p-3">
        <SideItem to="/queue-ring" icon={<FaBell />} page="Queue Ring" />
        <SideItem to="/setting-screen" icon={<FaTv />} page="Setting Screen" />
        <SideItem to="/about-us" icon={<FaHospitalUser />} page="About Us" />
      </div>
    </div>
  );
};

const NavigationContainer = ({ children }) => {
  return (
    <>
      <Top />
      <Side />
      <div className="ms-[210px] mt-[80px] py-6 px-8">{children}</div>
      <ModalLogout />
    </>
  );
};

export default NavigationContainer;
