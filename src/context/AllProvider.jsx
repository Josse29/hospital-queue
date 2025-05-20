import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getPoliQueueAPI } from "../services/poli";
import { getHospitalAPI } from "../services/hospital";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  const navigate = useNavigate();
  // socket
  const socket = io("https://hospital-queue-be-production.up.railway.app");
  // auth
  const [loginId, setLoginId] = useState(null);
  const token = JSON.parse(localStorage.getItem("verifyToken"));
  const [logout, setLogout] = useState(false);
  // protected routes
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      const decoded = jwtDecode(token);
      setLoginId(decoded.id);
    }
  }, [navigate]);
  // hospital
  const [hospital, setHospital] = useState({
    HospitalName: "",
    HospitalLogo: "",
    HospitalAddress: "",
    HospitalEmail: "",
    HospitalPhone: "",
    HospitalMarquee: "",
  });
  const getHospital1 = async () => {
    try {
      const { data } = await getHospitalAPI();
      setHospital({
        HospitalName: data.HospitalName,
        HospitalLogo: data.HospitalLogo,
        HospitalAddress: data.HospitalAddress,
        HospitalEmail: data.HospitalEmail,
        HospitalPhone: data.HospitalPhone,
        HospitalMarquee: data.HospitalMarquee,
      });
    } catch (error) {
      throw error;
    }
  };
  // poliqueue
  const [poliQueue, setPoliQueue] = useState([]);
  const getPoliQueue = async (search = "") => {
    try {
      const response = await getPoliQueueAPI(search);
      setPoliQueue(response.data);
    } catch (error) {
      throw error;
    }
  };
  const [loadingRing, setLoadingRing] = useState(false);
  return (
    <AllContext.Provider
      value={{
        logout,
        setLogout,
        socket,
        poliQueue,
        setPoliQueue,
        getPoliQueue,
        loadingRing,
        setLoadingRing,
        hospital,
        getHospital1,
        loginId,
        setLoginId,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
