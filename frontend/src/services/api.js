import axios from "axios";


const API_REGISTER = "http://localhost:3001/register";
const API_LOGIN = "http://localhost:3001/login";
const API_PROFILE = "http://localhost:3001/profile"; // Profil endpoint'i


export const registerUser = async (userData) => {
  return axios.post(API_REGISTER, userData);
};

export const loginUser = async (userData) => {
  return axios.post(API_LOGIN, userData);
};


export const getUserProfile = async () => {
  const token = localStorage.getItem('token'); // Token'ı yerel depolamadan al
  return axios.get(API_PROFILE, {
    headers: {
      Authorization: `Bearer ${token}` // Token'ı Authorization header olarak ekle
    }
  });
};