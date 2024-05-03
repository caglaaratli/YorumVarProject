import axios from "axios";


const API_REGISTER = "http://localhost:3001/register";
const API_LOGIN = "http://localhost:3001/login";
const API_PROFILE = "http://localhost:3001/profile"; // Profil endpoint'i
const API_NEW_REVIEW = "http://localhost:3001/new-review";
const API_USER_REVIEW_COUNT = "http://localhost:3001/review-count";
const API_LOGIN_USER_REVIEWS ="http://localhost:3001/login-user-review";
const API_ALL_REVIEWS ="http://localhost:3001/all-reviews";
const API_UPDATE_USER_INFO= "http://localhost:3001/update-user-info";
const API_DELETE_USER = "http://localhost:3001/delete-user-account";


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


export const getUserReviewCount = async () => {
  const token = localStorage.getItem('token');
  return axios.get(API_USER_REVIEW_COUNT, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getLoginUserReviews = async () => {
  const token = localStorage.getItem('token');
  return axios.get(API_LOGIN_USER_REVIEWS, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getAllReviews = async () => {
  
  return axios.get(API_ALL_REVIEWS);
};

export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem('token');
  return axios.put(API_UPDATE_USER_INFO, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteUserAccount = async () => {
  const token = localStorage.getItem('token');
  return axios.delete(API_DELETE_USER, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};