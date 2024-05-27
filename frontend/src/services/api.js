import axios from "axios";

const API_REGISTER = "http://localhost:3001/register";
const API_LOGIN = "http://localhost:3001/login";
const API_PROFILE = "http://localhost:3001/profile";
const API_NEW_REVIEW = "http://localhost:3001/new-review";
const API_USER_REVIEW_COUNT = "http://localhost:3001/review-count";
const API_LOGIN_USER_REVIEWS = "http://localhost:3001/login-user-review";
const API_ALL_REVIEWS = "http://localhost:3001/all-reviews";
const API_UPDATE_USER_INFO = "http://localhost:3001/update-user-info";
const API_DELETE_USER = "http://localhost:3001/delete-user-account";
const API_BRANDS_NAME = "http://localhost:3001/get-brands";
const API_PRODUCTS_NAME = "http://localhost:3001/get-products";
const API_ADD_COMMENT = "http://localhost:3001/add-comment";
const API_GET_REVIEW = `http://localhost:3001/review`; // Yeni ekleme
const API_GET_COMMENTS = `http://localhost:3001/comments`; // Yeni ekleme

export const registerUser = async (userData) => {
  return axios.post(API_REGISTER, userData);
};

export const loginUser = async (userData) => {
  return axios.post(API_LOGIN, userData);
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  return axios.get(API_PROFILE, {
    headers: {
      Authorization: `Bearer ${token}`
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

export const getBrands = async () => {
  return axios.get(API_BRANDS_NAME);
};

export const getProducts = async () => {
  return axios.get(API_PRODUCTS_NAME);
};

export const addComment = async (commentData) => {
  const token = localStorage.getItem('token');
  return axios.post(API_ADD_COMMENT, commentData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


export const getReview = async (reviewId) => {
  return axios.get(`${API_GET_REVIEW}/${reviewId}`);
};

export const getComments = async (reviewId) => {
  return axios.get(`${API_GET_COMMENTS}/${reviewId}`);
};
