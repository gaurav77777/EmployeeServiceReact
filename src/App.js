import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Use 'Routes' instead of 'Switch'
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

 
 
 
  /* useEffect(() => {
    // Fetching employee data from the fake API (json-server)
    axios.get('http://localhost:8081/api/employees')
      .then(response => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch(error => console.log('Error fetching employee data:', error));
  }, []); */


  // Fetch employee data from the fake API (json-server)
  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch(error => console.log('Error fetching employee data:', error));
  }, []);

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

  

  const handleLogout = () => {
    console.log('Logging out...');
    alert('Logged out!');
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

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Employee Management
            </Typography>
            {/* Link to navigate to Add Employee Form */}
            <Link to="/add-employee" style={{ textDecoration: 'none' }}>
              <Button color="inherit">Register New Employee</Button>
            </Link>
            <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
              Logout
            </Button>
            
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Container maxWidth="md" style={{ marginTop: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <Routes>
            {/* Home page with Employee List */}
            <Route path="/" element={
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

                <EmployeeList employees={filteredEmployees} deleteEmployee={deleteEmployee}/>
              </Box>
            } />

            {/* Add Employee Page (same as Register) */}
            <Route path="/add-employee" element={
              <Box my={4} textAlign="center">
                <Typography variant="h4" gutterBottom>
                  Register New Employee
                </Typography>
                <AddEmployee addEmployee={(newEmployee) => {
                  axios.post('http://localhost:5000/employees', newEmployee)
                    .then(response => {
                      setEmployees([...employees, response.data]);
                    })
                    .catch(error => console.log('Error adding employee:', error));
                }} />
              </Box>
            } />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
