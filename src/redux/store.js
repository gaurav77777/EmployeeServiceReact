import { configureStore } from "@reduxjs/toolkit";

import { cartReducer } from "./reducer/cartReducer";
import employeeReducer from "./slice/employeeSlice";


export const store = configureStore({

    reducer: {

        cart: cartReducer,

        employeeState: employeeReducer

    }

});