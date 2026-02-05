import React, { useState } from 'react';
import {
    Box, FormControl, InputLabel, Select, MenuItem, IconButton, Tabs,
    Tab
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MUIDataTable from "mui-datatables";

function EmployeeNewList({ employees, admins, deleteEmployee, deleteAdmin, filter, handleFilterChange }) {

    const [quote, SetQuote] = useState('');
    const [activeTab, setActiveTab] = useState(0);

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











    // Admin Columns
    const adminColumns = [
        { name: "name", label: "Name" },
        { name: "role", label: "Role" },
        { name: "salary", label: "Salary" },
        {
            name: "actions",
            label: "Actions",
            options: {
                sort: false,
                filter: false,
                customBodyRenderLite: (dataIndex) => {
                    const admin = admins[dataIndex];
                    return (
                        <IconButton
                            color="error"
                            onClick={() => deleteAdmin(admin.id)}
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





            <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                centered
            >
                <Tab label="Employees" />
                <Tab label="Admins" />
            </Tabs>


            {/* Employee Tab */}
            {activeTab === 0 && (
                <>
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
                </>
            )}



            {/* Admin Tab */}
            {activeTab === 1 && (
                <MUIDataTable
                    title="Admin List"
                    data={admins}
                    columns={adminColumns}
                    options={options}
                />
            )}
        </Box>
    );
}

export default EmployeeNewList;
