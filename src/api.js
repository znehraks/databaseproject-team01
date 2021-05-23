import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3002/",
});

//api 모아두기
export const Api = {
  getEmpInfo: () => api.get(`api/emp`),
  getEmpDetailInfo: (emp_no) => api.get(`api/emp/${emp_no}`),
  getProjectInfo: () => api.get(`api/project`),
  getEmployeeInProjectInfo: (project_no) =>
    api.get(`api/employee_in_project/${project_no}`),
  getDepartments: () => api.get("api/req01/by_salary"),
  getDepartmentEmployee: (department) =>
    api.get(`api/req02/by_dept_name/${department}`),

  //req07
  getProceedingProjectWithCount: () =>
    api.get(`api/req07/proceeding_project/count`),
  getProceedingProjectByProjectNo: (project_no) =>
    api.get(`api/req07/proceeding_project/${project_no}`),

  //req08
  getReq08: () => api.get(`api/req08`),
  getProjectOrderRecent: (emp_no) =>
    api.get(`api/req08/recent_project/${emp_no}`),
  getProjectOrderAgo: (emp_no) => api.get(`api/req08/ago_project/${emp_no}`),
  getProjectImminent: (emp_no) =>
    api.get(`api/req08/imminent_project/${emp_no}`),
  getProjectLongtime: (emp_no) =>
    api.get(`api/req08/longtime_project/${emp_no}`),
};
