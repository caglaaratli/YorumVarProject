import axios from "axios";


const API_REGISTER = "http://localhost:3001/register";
const API_LOGIN = "http://localhost:3001/login";
const API_PROFILE = "http://localhost:3001/profile"; // Profil endpoint'i
const API_NEW_REVIEW = "http://localhost:3001/new-review"


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


export const postReview = async (reviewData) => {
  const token = localStorage.getItem('token');
  return axios.post(API_NEW_REVIEW, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};