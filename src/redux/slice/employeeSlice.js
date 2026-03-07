import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// API BASE
const API = "http://localhost:5000/employees";


// FETCH EMPLOYEES
export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async () => {

        const response = await axios.get(API);

        return response.data;
    }
);


// ADD EMPLOYEE
export const addEmployee = createAsyncThunk(
    "employees/addEmployee",
    async (employee) => {

        const response = await axios.post(API, employee);

        return response.data;
    }
);


// DELETE EMPLOYEE
export const deleteEmployee = createAsyncThunk(
    "employees/deleteEmployee",
    async (id) => {

        await axios.delete(`${API}/${id}`);

        return id;
    }
);



const employeeSlice = createSlice({

    name: "employees",

    initialState: {
        employees: [],
        loading: false
    },

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchEmployees.fulfilled, (state, action) => {

                state.employees = action.payload;

            })

            .addCase(addEmployee.fulfilled, (state, action) => {

                state.employees.push(action.payload);

            })

            .addCase(deleteEmployee.fulfilled, (state, action) => {

                state.employees =
                    state.employees.filter(
                        emp => emp.id !== action.payload
                    );

            });
    }
});


export default employeeSlice.reducer;