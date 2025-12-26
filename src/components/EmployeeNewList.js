import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MUIDataTable from "mui-datatables";

function EmployeeNewList({ employees, deleteEmployee, filter, handleFilterChange }) {

    const [quote, SetQuote] = useState('');

    const columns = [
        {
            name: "name",
            label: "Name"
        },
        {
            name: "position",
            label: "Position"
        },
        {
            name: "salary",
            label: "Salary"
        },
        {
            name: "actions",
            label: "Actions",
            options: {
                sort: false,
                filter: false,
                customBodyRenderLite: (dataIndex) => {
                    const employee = employees[dataIndex];
                    return (
                        <IconButton
                            color="error"
                            onClick={() => deleteEmployee(employee.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    );
                }
            }
        }
    ];

    const options = {
        selectableRows: "none",
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20],
    };

    return (
        <Box my={4} textAlign="center">

            {/* Filter Dropdown */}
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

            {/* MUI Data Table */}
            <MUIDataTable
                title={"Employee List"}
                data={employees}
                columns={columns}
                options={options}
            />
        </Box>
    );
}

export default EmployeeNewList;
