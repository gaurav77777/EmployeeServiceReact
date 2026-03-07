import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URLs
const EMPLOYEE_API = "http://localhost:5000/employees";
const ADMIN_API = "http://localhost:5000/admins";

/* =========================
   FETCH EMPLOYEES
========================= */
export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async () => {
        const response = await axios.get(EMPLOYEE_API);
        return response.data;
    }
);

/* =========================
   ADD EMPLOYEE
========================= */
export const addEmployee = createAsyncThunk(
    "employees/addEmployee",
    async (employee) => {
        const response = await axios.post(EMPLOYEE_API, employee);
        return response.data;
    }
);

/* =========================
   DELETE EMPLOYEE
========================= */
export const deleteEmployee = createAsyncThunk(
    "employees/deleteEmployee",
    async (id) => {
        await axios.delete(`${EMPLOYEE_API}/${id}`);
        return id;
    }
);

/* =========================
   FETCH ADMINS
========================= */
export const fetchAdmins = createAsyncThunk(
    "employees/fetchAdmins",
    async () => {
        const response = await axios.get(ADMIN_API);
        return response.data;
    }
);

/* =========================
   DELETE ADMIN
========================= */
export const deleteAdmin = createAsyncThunk(
    "employees/deleteAdmin",
    async (id) => {
        await axios.delete(`${ADMIN_API}/${id}`);
        return id;
    }
);

/* =========================
   SLICE
========================= */
const employeeSlice = createSlice({
    name: "employees",

    initialState: {
        employees: [],
        admins: [],
        loading: false,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            /* Employees */
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.employees = action.payload;
            })

            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })

            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(
                    (emp) => emp.id !== action.payload
                );
            })

            /* Admins */
            .addCase(fetchAdmins.fulfilled, (state, action) => {
                state.admins = action.payload;
            })

            .addCase(deleteAdmin.fulfilled, (state, action) => {
                state.admins = state.admins.filter(
                    (admin) => admin.id !== action.payload
                );
            });
    },
});

export default employeeSlice.reducer;