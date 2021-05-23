import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import DepartmentTable from "./DepartmentTable";
import DepartmentEmployeeTable from "./DepartmentEmployeeTable";
import { makeStyles } from "@material-ui/core/styles";
import { Api } from "../../api";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
});

function DepartmentAdmin() {
  const classes = useStyles();
  const [departments, setDepartments] = useState(null);
  const [departmentEmployee, setDepartmentEmployee] = useState(null);
  const [selectedRow, setSelectedRow] = useState("개발");

  useEffect(() => {
    Api.getDepartments().then((response) => {
      setDepartments(response.data);
    });
  }, []);

  useEffect(() => {
    Api.getDepartmentEmployee(selectedRow).then((response) => {
      setDepartmentEmployee(response.data);
      console.log(response.data);
    });
  }, [selectedRow]);

  function handleRowClick(e, name) {
    setSelectedRow(name);
  }
  return (
    <Container maxwidth="md" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={5}>
          {departments && (
            <DepartmentTable
              departments={departments}
              selectedRow={selectedRow}
              handleRowClick={handleRowClick}
            />
          )}
        </Grid>
        <Grid item md={7}>
          {departmentEmployee && (
            <DepartmentEmployeeTable
              departmentEmployee={departmentEmployee}
              selectedRow={selectedRow}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default DepartmentAdmin;
