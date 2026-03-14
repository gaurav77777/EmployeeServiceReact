import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Button,
  Box
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { addEmployee } from '../redux/slice/employeeSlice';

function AddEmployee() {

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      id: Date.now(),
      name,
      position,
      salary
    };

    dispatch(addEmployee(newEmployee));

    setName('');
    setPosition('');
    setSalary('');
  };

  return (
    <Box my={4} textAlign="center">

      <Typography variant="h4" gutterBottom>
        Register New Employee
      </Typography>

      <Box mb={3}>

        <form onSubmit={handleSubmit}>

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Position"
            variant="outlined"
            fullWidth
            margin="normal"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          <TextField
            label="Salary"
            variant="outlined"
            fullWidth
            margin="normal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Employee
          </Button>

        </form>

      </Box>

    </Box>
  );
}

export default AddEmployee;