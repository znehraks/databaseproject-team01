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
    hr_score_history_no,
    emp_manager_no,
    salary
  ) =>
    api.post(`api/req00/emp/insert`, {
      emp_name,
      emp_rrn,
      emp_final_edu,
      emp_rank_no,
      dept_no,
      hr_score_history_no,
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
  //Project -update
  //Project -delete

  //Department -read
  //위의 getDepartments와 동일하므로 생략
  //Department -insert
  //Department -update
  //Department -delete

  //Client -read
  //Client -insert
  //Client -update
  //Client -delete

  //ProjectPosition -read
  //ProjectPosition -insert
  //ProjectPosition -update
  //ProjectPosition -delete

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
  addEmpInProject: (
    project_no,
    emp_no,
    enter_date,
    finish_date,
    finish_reason
  ) =>
    api.post(`api/req00/employee_in_project/insert`, {
      project_no,
      emp_no,
      enter_date,
      finish_date,
      finish_reason,
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
