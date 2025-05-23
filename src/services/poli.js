import api from "./api";

const token = JSON.parse(localStorage.getItem("verifyToken"));

const getPoliAPI = async (req = "") => {
  try {
    const response = await api.get(`/poli?search=${req}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const getPoliQueueAPI = async (req) => {
  try {
    const response = await api.get(`/poli/queue?search=${req}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const createPoliAPI = async (req) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      PoliName: req.PoliName,
      PoliCode: req.PoliCode,
      PoliColor: req.PoliColor,
    };
    const response = await api.post("/poli", data, config);
    return response;
  } catch (error) {
    throw error;
  }
};
const deletePoliAPI = async (id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await api.delete(`/poli/${id}`, config);
    return response;
  } catch (error) {
    throw error;
  }
};
const updatePoliAPI = async (req) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      PoliName: req.PoliName,
      PoliCode: req.PoliCode,
      PoliColor: req.PoliColor,
    };
    const response = await api.put(`/poli/${req.PoliId}`, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};
const printPoliQueueAPI = async (id) => {
  try {
    const response = await api.put(`/poli/print-queue/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const ringPoliQueue = async (req) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      No: req.No,
      Date: req.Date,
      Time: req.Time,
    };
    const response = await api.put(`/poli/ring-queue/${req.Id}`, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};
const getPoliQueueIdAPI = async (id) => {
  try {
    const poliQueueId = await api.get(`/poli/${id}`);
    return poliQueueId;
  } catch (error) {
    throw error;
  }
};
export {
  getPoliAPI,
  getPoliQueueAPI,
  getPoliQueueIdAPI,
  createPoliAPI,
  deletePoliAPI,
  updatePoliAPI,
  printPoliQueueAPI,
  ringPoliQueue,
};
