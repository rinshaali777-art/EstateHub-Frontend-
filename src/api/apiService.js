import axiosinstance from "./axiosinstance";

const ApiService = async (httpMethod, url, reqBody) => {

  const reqConfig = {
    method: httpMethod,
    url: url,
    data: reqBody
  };

  try {
    const response = await axiosinstance(reqConfig);
    return response;
  } catch (err) {
    console.log("API Error:", err);
    throw err;
  }
};

export default ApiService;