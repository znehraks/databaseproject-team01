import axios from "axios";
const api = axios.create({
  // baseURL: "http://localhost:3002/",
  baseURL: "https://dbp2021-team1.herokuapp.com/",
});

//api 모아두기
export const Api = {
  Login: (emp_auth_id, emp_auth_pwd) =>
    api.post(`api/sign/signin`, {
      emp_auth_id,
      emp_auth_pwd,
    }),
  Signup: (emp_auth_id, emp_auth_pwd) =>
    api.post(`api/sign/signup`, {
      emp_auth_id,
      emp_auth_pwd,
    }),
  getEmpInfo: () => api.get(`api/emp`),
  getEmpDetailInfo: (emp_no) => api.get(`api/emp/${emp_no}`),
  getProjectInfo: () => api.get(`api/project`),
  getEmployeeInProjectInfo: (project_no) =>
    api.get(`api/employee_in_project/${project_no}`),
  getDepartments: () => api.get("api/req01/by_salary"),
  getDepartmentEmployee: (department) =>
    api.get(`api/req02/by_dept_name/${department}`),

  //req03
  getReq03: () => api.get(`api/req03`),
  updateReq03: () => api.get(`api/req03/update`),

  //req04
  getReq04: () => api.get(`api/req04`),
  updateReq04: (role_no, emp_no, project_no) =>
    api.post(`api/req04/update`, {
      role_no,
      emp_no,
      project_no,
    }),
  //req05
  getReq05: (emp_no) => api.get(`api/req05/${emp_no}`),

  //req06
  getReq06: () => api.get(`api/req06`),

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

  //req09
  getProjectPMPL: (emp_no) => api.get(`api/req09/${emp_no}`),

  //req10
  updateSalaryByPER: () => api.get(`api/req10`),

  //req00
  //emp -read
  //위의 getEmpInfo와 동일하므로 생략

  //emp -insert
  addEmp: (
    emp_name,
    emp_rrn,
    emp_final_edu,
    emp_rank_no,
    dept_no,
    emp_manager_no,
    salary
  ) =>
    api.post(`api/req00/emp/insert`, {
      emp_name,
      emp_rrn,
      emp_final_edu,
      emp_rank_no,
      dept_no,
      emp_manager_no,
      salary,
    }),

  //emp -update
  updateEmp: (
    emp_name,
    emp_final_edu,
    emp_rank_no,
    dept_no,
    hr_score_history_no,
    emp_manager_no,
    salary,
    emp_no
  ) =>
    api.post(`api/req00/emp/update`, {
      emp_name,
      emp_final_edu,
      emp_rank_no,
      dept_no,
      hr_score_history_no,
      emp_manager_no,
      salary,
      emp_no,
    }),

  //emp -delete
  deleteEmp: (emp_no) => api.post(`api/req00/emp/delete`, { emp_no }),

  //Project -read
  //위의 getProjectInfo와 동일하므로 생략

  //Project -insert
  addProject: (project_name, client_no) =>
    api.post(`api/req01/project/add`, {
      project_name,
      client_no,
    }),

  //Project -update
  updateProject: (
    project_no,
    project_name,
    project_startdate,
    project_enddate,
    client_no,
    storage_period
  ) =>
    api.post(`api/req01/project/edit/`, {
      project_no,
      project_name,
      project_startdate,
      project_enddate,
      client_no,
      storage_period,
    }),

  //Project -delete
  deleteProject: (project_no) =>
    api.get(`api/req01/project/delete/${project_no}`),

  //Department -read
  getDepartments_: () => api.get(`api/req01/department`),

  //Department -insert
  addDepartment: (name) => api.post(`api/req01/department/add`, { name }),

  //Department -update
  updateDepartment: (name, dept_no) =>
    api.post(`api/req01/department/edit`, { name, dept_no }),

  //Department -delete
  deleteDepartment: (dept_no) =>
    api.get(`api/req01/department/delete/${dept_no}`),

  //Client -read
  getClients: () => api.get(`api/req01/client`),

  //Client -insert
  addClient: (client_name) => api.post(`api/req01/client/add`, { client_name }),

  //Client -update
  updateClient: (client_name, client_no) =>
    api.post(`api/req01/client/edit`, { client_name, client_no }),

  //Client -delete
  deleteClient: (client_no) => api.get(`api/req01/client/delete/${client_no}`),

  //Task -read
  getTasks: () => api.get(`api/req01/task`),

  //Task -insert
  addTask: (name) => api.post(`api/req01/task/add`, { name }),

  //Task -update
  updateTask: (role_no, name) =>
    api.post(`api/req01/task/edit`, { name, role_no }),

  //Task -delete
  deleteTask: (role_no) => api.get(`api/req01/task/delete/${role_no}`),

  //EmployeeGrade -read
  getEmployeeGrade: () => api.get(`api/req01/employee_grade`),

  //EmployeeGrade -insert
  addEmployeeGrade: (emp_rank_name, modify_access, read_access) =>
    api.post(`api/req01/employee_grade/add`, {
      emp_rank_name,
      modify_access,
      read_access,
    }),

  //EmployeeGrade -update
  updateEmployeeGrade: (
    emp_rank_name,
    modify_access,
    read_access,
    emp_rank_no
  ) =>
    api.post(`api/req01/employee_grade/edit`, {
      emp_rank_name,
      modify_access,
      read_access,
      emp_rank_no,
    }),

  //EmployeeGrade -delete
  deleteEmployeeGrade: (emp_rank_no) =>
    api.get(`api/req01/employee_grade/delete/${emp_rank_no}`),

  //EmpOnlineAccount -read
  getEmpOnlineAccounts: () => api.get(`api/req00/emp_online_account`),
  //EmpOnlineAccount -update
  updateEmpOnlineAccount: (emp_auth_pwd, emp_auth_id) =>
    api.post(`api/req00/emp_online_account/update`, {
      emp_auth_pwd,
      emp_auth_id,
    }),
  //EmpOnlineAccount -delete
  deleteEmpOnlineAccount: (emp_auth_id) =>
    api.post(`api/req00/emp_online_account/delete`, { emp_auth_id }),

  //EmployeeInProject -read
  getEmployeeInProjects: () => api.get(`api/req00/employee_in_project`),

  //EmployeeInProject -insert
  addEmpInProject: (project_no, emp_no) =>
    api.post(`api/req00/employee_in_project/insert`, {
      project_no,
      emp_no,
    }),

  //EmployeeInProject -update
  updateEmpInProject: (finish_date, finish_reason, emp_no, project_no) =>
    api.post(`api/req00/employee_in_project/update`, {
      finish_date,
      finish_reason,
      emp_no,
      project_no,
    }),

  //EmployeeInProject -delete
  deleteEmpInProject: (emp_no, project_no) =>
    api.post(`api/req00/employee_in_project/delete`, {
      emp_no,
      project_no,
    }),

  //PerformanceEvaluationResume -read
  getPerformanceEvaluationResumes: () =>
    api.get(`api/req00/performance_evaluation_resume`),

  //PerformanceEvaluationResume -insert
  addPerformanceEvaluationResume: (emp_no, hr_score, hr_change) =>
    api.post(`api/req00/performance_evaluation_resume/insert`, {
      emp_no,
      hr_score,
      hr_change,
    }),

  //PerformanceEvaluationResume -update
  updatePerformanceEvaluationResume: (
    hr_score,
    hr_change,
    hr_score_history_no
  ) =>
    api.post(`api/req00/performance_evaluation_resume/update`, {
      hr_score,
      hr_change,
      hr_score_history_no,
    }),

  //PerformanceEvaluationResume -delete
  deletePerformanceEvaluationResume: (hr_score_history_no) =>
    api.post(`api/req00/performance_evaluation_resume/delete`, {
      hr_score_history_no,
    }),
};
