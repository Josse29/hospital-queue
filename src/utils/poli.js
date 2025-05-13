import { getPoliAPI } from "../services/poli";

const getPoli = async (params) => {
  const { setPoli, search = "" } = params;
  // setLoading(true);
  try {
    const response = await getPoliAPI(search);
    setPoli(response.data);
  } catch (error) {
    throw error;
  } finally {
    // setLoading(false);
  }
};
export { getPoli };
