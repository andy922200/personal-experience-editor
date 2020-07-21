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
  putUser: objectData => {
    return LocalDbRequest.put(
      `/profile/edit/${objectData.userId}`,
      objectData.data,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
  },
  getCurrentUser: () => {
    return LocalDbRequest.get(`/get_current_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }
};

export const jobRecordsAPI = {
  getJobRecords: currentUserId => {
    return LocalDbRequest.get(`/jobRecords/browse/by/user${currentUserId}`);
  },
  getOneJobRecord: jobRecordId => {
    return LocalDbRequest.get(`/jobRecords/browse/record${jobRecordId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  postOneJobRecord: objectData => {
    return LocalDbRequest.post(
      `/jobRecords/create/by${objectData.userId}`,
      objectData.data,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
  },
  putOneJobRecord: objectData => {
    return LocalDbRequest.put(
      `/jobRecords/edit/${objectData.recordId}`,
      objectData.data,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
  },
  deleteOneJobRecord: objectData => {
    return LocalDbRequest.delete(`/jobRecords/delete/${objectData.recordId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }
};
