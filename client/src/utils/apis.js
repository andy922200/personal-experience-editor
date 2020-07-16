import axios from "axios";

const baseLocalDbURL = "http://localhost:3000/api";
// const baseLocalDbURL = "https://cocktails-collections-sml.herokuapp.com/api";
const getToken = () => localStorage.getItem("token");

const LocalDbRequest = axios.create({
  baseURL: baseLocalDbURL
});

export const usersAPI = {
  signIn: data => {
    return LocalDbRequest.post(`/signin`, data);
  },
  signUp: data => {
    return LocalDbRequest.post(`/signUp`, data);
  },
  getCurrentUser: () => {
    return LocalDbRequest.get(`/get_current_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }
};
