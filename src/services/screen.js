import api from "./api";

const getScreenAPI = async (req = "") => {
  try {
    const response = await api.get(`/screen?search=${req}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const getScreenIdAPI = async (id) => {
  try {
    const response = await api.get(`/screen/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const getScreenId1API = async (id) => {
  try {
    const response = await api.get(`/screen/queue/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const createScreenAPI = async (req) => {
  try {
    const data = {
      ScreenName: req.ScreenName,
      ScreenPoliSelected: req.ScreenPoliSelectedId,
      ScreenInfo: req.ScreenInfo,
    };
    const response = await api.post("/screen", data);
    return response;
  } catch (error) {
    throw error;
  }
};
const deleteScreenAPI = async (id) => {
  try {
    const response = await api.delete(`/screen/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const updateScreenAPI = async (req) => {
  try {
    const data = {
      ScreenName: req.ScreenName,
      ScreenPoliSelected: req.ScreenPoliSelectedId,
      ScreenInfo: req.ScreenInfo,
    };
    const response = await api.put(`/screen/${req.ScreenId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
export {
  createScreenAPI,
  deleteScreenAPI,
  getScreenAPI,
  getScreenIdAPI,
  getScreenId1API,
  updateScreenAPI,
};
