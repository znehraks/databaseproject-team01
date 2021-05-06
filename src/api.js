import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/",
});

//api 모아두기
export const Api = {
  getEmpInfo: () => api.get(`/api/emp`),
};
