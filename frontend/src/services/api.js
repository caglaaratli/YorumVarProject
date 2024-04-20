import axios from "axios";

const API_REGISTER = "http://localhost:3001/register";
const API_LOGIN = "http://localhost:3001/login";

export const registerUser = async (userData) => {
  return axios.post(API_REGISTER, userData);
};

export const loginUser = async (userData) => {
  return axios.post(API_LOGIN, userData);
};