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
    maxHeight: "400px",
    height: "400px"
  }
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DepartmentTable({ departments, selectedRow, handleRowClick }) {
  const classes = useStyles()
  const [headers, setHeaders] = useState(Object.keys(departments[0]));

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Typography variant="h6" className={classes.title}>Department</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((row) => (
            <TableRow selected={row.dept_name === selectedRow ? true : false} key={row.dept_name} onClick={(e) => handleRowClick(e, row.dept_name)}>
              {headers.map((header) => (
                <TableCell>{row[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}