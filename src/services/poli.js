import api from "./api";

const getPoliAPI = async (req) => {
  try {
    const response = await api.get("/poli", req);
    return response;
  } catch (error) {
    throw error;
  }
};
const createPoliAPI = async (req) => {
  try {
    const data = {
      PoliName: req.PoliName,
      PoliCode: req.PoliCode,
      PoliColor: req.PoliColor,
    };
    const response = await api.post("/poli", data);
    return response;
  } catch (error) {
    throw error;
  }
};
const deletePoliAPI = async (id) => {
  try {
    const response = await api.delete(`/poli/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const updatePoliAPI = async (req) => {
  try {
    const data = {
      PoliName: req.PoliName,
      PoliCode: req.PoliCode,
      PoliColor: req.PoliColor,
    };
    const response = await api.put(`/poli/${req.PoliId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export { getPoliAPI, createPoliAPI, deletePoliAPI, updatePoliAPI };
