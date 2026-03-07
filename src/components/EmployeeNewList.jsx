import React, { useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Tabs,
    Tab
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import MUIDataTable from "mui-datatables";

import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee, deleteAdmin } from "../redux/slice/employeeSlice";

function EmployeeNewList() {

    const dispatch = useDispatch();

    const employees = useSelector((state) => state.employee.employees);
    const admins = useSelector((state) => state.employee.admins);

    const [filter, setFilter] = useState('');
    const [activeTab, setActiveTab] = useState(0);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredEmployees =
        filter === ""
            ? employees
            : employees.filter((emp) => emp.position === filter);

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
                    const employee = filteredEmployees[dataIndex];

                    return (
                        <IconButton
                            color="error"
                            onClick={() => dispatch(deleteEmployee(employee.id))}
                        >
                            <DeleteIcon />
                        </IconButton>
                    );
                }
            }
        }
    ];

    // Admin Table Columns
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
                            onClick={() => dispatch(deleteAdmin(admin.id))}
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
        rowsPerPageOptions: [5, 10, 20]
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

                    <MUIDataTable
                        title={"Employee List"}
                        data={filteredEmployees}
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