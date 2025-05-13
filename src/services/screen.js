import api from "./api";

const getScreenAPI = async (req = "") => {
  try {
    const response = await api.get(`/screen?search=${req}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const createScreenAPI = async (req) => {
  try {
    const data = {
      ScreenName: req.ScreenName,
      ScreenPoli: req.ScreenPoli,
      ScreenInfo: req.ScreenInfo,
    };
  } catch (error) {}
};
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer "token"`,
  },
};
export { getScreenAPI };
