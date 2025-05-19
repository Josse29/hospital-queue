import api from "./api";

const token = JSON.parse(localStorage.getItem("verifyToken"));
const getHospitalAPI = async () => {
  try {
    const response = api.get(`/hospital`);
    return response;
  } catch (error) {
    throw error;
  }
};
const updateHospitalAPI = async (req) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      HospitalName: req.HospitalName,
      HospitalAddress: req.HospitalAddress,
      HospitalPhone: req.HospitalPhone,
      HospitalEmail: req.HospitalEmail,
      HospitalLogo: req.HospitalLogo,
      HospitalInfo: req.HospitalInfo,
      HospitalMarquee: req.HospitalMarquee,
    };
    const response = api.put(`/hospital/${req.HospitalId}`, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};
const loginAPI = async (req) => {
  try {
    const data = {
      HospitalId: req.HospitalId,
      HospitalPassword: req.HospitalPassword,
    };
    const response = await api.post(`/hospital/login`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
const logoutAPI = async (id) => {
  try {
    const response = await api.post(`/hospital/logout/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export { getHospitalAPI, updateHospitalAPI, loginAPI, logoutAPI };
