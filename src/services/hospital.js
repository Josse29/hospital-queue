import api from "./api";

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
    const data = {
      HospitalName: req.HospitalName,
      HospitalAddress: req.HospitalAddress,
      HospitalPhone: req.HospitalPhone,
      HospitalEmail: req.HospitalEmail,
      HospitalLogo: req.HospitalLogo,
      HospitalInfo: req.HospitalInfo,
      HospitalMarquee: req.HospitalMarquee,
    };
    const response = api.put(`/hospital/${req.HospitalId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export { getHospitalAPI, updateHospitalAPI };
