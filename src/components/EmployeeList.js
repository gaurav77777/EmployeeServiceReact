import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';





function EmployeeList({ employees, deleteEmployee, filter, handleFilterChange }) {







  // Print the tree after this component mounts
  // useEffect(() => {
  //   printTree(); // Prints the tree including this component
  // }, []); // empty dependency → runs once on mount


  // useEffect(() => {
  //   printTree();
  // }, []);























  // console.log(JSON.stringify(getTree(), null, 2));
  // printTree(getTree());


  const [quote, SetQuote] = useState('');










  return (
    <Box my={4} textAlign="center">
      <FormControl fullWidth margin="normal">
        <InputLabel>Filter by Position</InputLabel>
        <Select
          value={filter}
          label="Filter by Position"
          onChange={handleFilterChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="Designer">Designer</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table aria-label="employee list">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(employee => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
}

export default EmployeeList;
