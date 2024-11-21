import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Select, MenuItem, FormControl, InputLabel, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function App() {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    // Fetching employee data from the fake API (json-server)
    axios.get('http://localhost:8081/api/employees')
      .then(response => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch(error => console.log('Error fetching employee data:', error));
  }, []);

  /* useEffect(() => {
    // Fetching employee data from the fake API (json-server)
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch(error => console.log('Error fetching employee data:', error));
  }, []); */

  const addEmployee = (newEmployee) => {
    axios.post('http://localhost:5000/employees', newEmployee)
      .then(response => {
        setEmployees([...employees, response.data]);
      })
      .catch(error => console.log('Error adding employee:', error));
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch(error => console.log('Error deleting employee:', error));
  };

  const handleFilterChange = (event) => {
    const selectedPosition = event.target.value;
    setFilter(selectedPosition);

    if (selectedPosition) {
      const filtered = employees.filter(employee => employee.position === selectedPosition);
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees); // Reset to all employees if no filter
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');  // Placeholder for logout functionality
    alert('Logged out!');
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)', minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Employee Management
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" style={{ marginTop: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
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
              {/* Add more roles as necessary */}
            </Select>
          </FormControl>

          <AddEmployee addEmployee={addEmployee} />
          <EmployeeList employees={filteredEmployees} deleteEmployee={deleteEmployee} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
