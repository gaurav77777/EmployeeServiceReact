import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function AddEmployee({ addEmployee }) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      name,
      position,
      salary
    };

    addEmployee(newEmployee);

    setName('');
    setPosition('');
    setSalary('');
  };

  return (
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
        <Button type="submit" variant="contained" color="primary">
          Add Employee
        </Button>
      </form>
    </Box>
  );
}

export default AddEmployee;
