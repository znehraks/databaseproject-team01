import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3002/",
});

//api 모아두기
export const Api = {
  getEmpInfo: () => api.get(`/api/emp`),
  getEmpDetailInfo: (emp_no) => api.get(`/api/emp/${emp_no}`),
  getProjectInfo: () => api.get(`/api/project`),
  getEmployeeInProjectInfo: (project_no) =>
    api.get(`/api/employee_in_project/${project_no}`),
};
