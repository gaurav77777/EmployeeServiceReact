import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Use 'Routes' instead of 'Switch'
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary';
import EmployeeNewList from './components/EmployeeNewList';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import AppBarCart from './components/AppBarCart';
import EmployeeMarketplace from './components/EmployeeMarketplace';
import CartPage from './components/CartPage';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';



import WorkflowQueue from './components/WorkflowQueue';
import WorkflowDetail from './components/WorkflowDetail';








import 'rsuite/dist/rsuite.min.css';
import Chatbot from './components/Chatbot';


axios.defaults.baseURL = 'http://localhost:8080';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});




function App() {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [admins, setAdmins] = useState([]);
  const [cartCount, setCartCount] = useState(0);




  // useEffect(() => {
  //   setTimeout(() => {
  //     printTree();
  //   }, 70);
  // }, []);


  /* useEffect(() => {
    // Fetching employee data from the fake API (json-server)
    axios.get('http://localhost:8081/api/employees')
      .then(response => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch(error => console.log('Error fetching employee data:', error));
  }, []); */


  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Fetch employee data from the fake API (json-server)
  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch(error => console.log('Error fetching employee data:', error));
  }, []);







  useEffect(() => {
    axios.get('http://localhost:5000/admins')
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => console.log('Error fetching admin data:', error));
  }, []);



  const deleteAdmin = (id) => {
    axios.delete(`http://localhost:5000/admins/${id}`)
      .then(() => {
        setAdmins(admins.filter(admin => admin.id !== id));
      })
      .catch(error => console.log('Error deleting admin:', error));
  };



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
    localStorage.removeItem('token'); // Remove token from storage
    setToken(null);                   // Clear token state
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
  // if (!token) {
  //   return (
  //     <ErrorBoundary>
  //   <Login onLogin={(t) => setToken(t)} />
  //     </ErrorBoundary>
  // );
  // }

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              Employee Management
            </Typography>

            {/* <Link to="/employees" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#fff' }}>Employees List</Button>
            </Link> */}
            {/* <Link to="/listOfData" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#fff' }}>New Employees List</Button>
            </Link> */}

            {/* Link to navigate to Add Employee Form */}
            {/* <Link to="/add-employee" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#fff' }}>Register New Employee</Button>
            </Link> */}



            {/* <Link to="/marketplace" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#fff' }}>Employee Marketplace</Button>
            </Link> */}

            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <AppBarCart /> {/* Cart badge clickable */}
            </Link>

            <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
              Logout
            </Button>


          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 260 }} role="presentation" onClick={toggleDrawer(false)}>

            {/* ADMIN SERVICE */}
            <List>
              <Typography sx={{ pl: 2, pt: 2 }} variant="subtitle1">
                Admin Service
              </Typography>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/employees">
                  <ListItemText primary="Employee List" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/listOfData">
                  <ListItemText primary="New Employee List" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/add-employee">
                  <ListItemText primary="Register Employee" />
                </ListItemButton>
              </ListItem>






              <ListItem disablePadding>
                <ListItemButton component={Link} to="/admin/workflows">
                  <ListItemText primary="Workflow Queue" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />

            {/* EMPLOYEE SERVICE */}
            <List>
              <Typography sx={{ pl: 2, pt: 2 }} variant="subtitle1">
                Employee Service
              </Typography>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/marketplace">
                  <ListItemText primary="Employee Marketplace" />
                </ListItemButton>
              </ListItem>
            </List>

          </Box>
        </Drawer>


        {/* Page Content */}
        {/* <Container maxWidth="md" style={{ marginTop: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}> */}
        <Container
          maxWidth={false}
          sx={{
            mt: 3,
            width: '100%',
            px: 3
          }}
        >
          <Routes>





            {/* Home page */}
            <Route path="/" element={<Home />} />
            {/* Home page with Employee List */}
            <Route path="/employees" element={

              <EmployeeList
                employees={filteredEmployees}
                deleteEmployee={deleteEmployee}
                filter={filter}
                handleFilterChange={handleFilterChange}
              />



              /*   <EmployeeList employees={filteredEmployees} deleteEmployee={deleteEmployee}/> */

            } />

            <Route path="/listOfData" element={

              <EmployeeNewList
                employees={filteredEmployees}
                admins={admins}
                deleteEmployee={deleteEmployee}
                deleteAdmin={deleteAdmin}
                filter={filter}
                handleFilterChange={handleFilterChange}
              />

            } />

            {/* Add Employee Page (same as Register) */}
            <Route path="/add-employee" element={

              <AddEmployee addEmployee={(newEmployee) => {
                axios.post('http://localhost:5000/employees', newEmployee)
                  .then(response => {
                    setEmployees([...employees, response.data]);
                  })
                  .catch(error => console.log('Error adding employee:', error));
              }} />

            } />


            <Route path="/marketplace" element={<EmployeeMarketplace />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin/workflows" element={<WorkflowQueue />} />
            <Route path="/admin/workflows/:id" element={<WorkflowDetail />} />
          </Routes>
        </Container>
      </div>
      <Chatbot />
    </Router>
  );
}

export default App;
