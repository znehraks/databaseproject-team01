import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    paddingLeft: "0.75em"
  },
  container: {
    maxHeight: "600px",
    height: "400px"
  }
});


export default function DepartmentEmployeeTable({departmentEmployee, selectedRow}) {
  const classes = useStyles()
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    if (departmentEmployee && departmentEmployee.length != 0) {
      console.log(departmentEmployee)
      setHeaders(Object.keys(departmentEmployee[0]))
    } else {
      setHeaders([])
    }
  }, [departmentEmployee])

  return (
    <>
      {headers &&
        <TableContainer className={classes.container} component={Paper}>
          <Typography variant="h6" className={classes.title}>{selectedRow} {departmentEmployee.length}명</Typography>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentEmployee.map((row) => (
                <TableRow key={row.dept_name}>
                  {headers.map((header) => (
                    <TableCell>{row[header]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
}