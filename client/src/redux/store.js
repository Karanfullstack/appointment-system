import {configureStore} from "@reduxjs/toolkit";
import {loadingSlice} from "./features/loadingSlice";

export const store = configureStore({
	reducer: {loading: loadingSlice.reducer},
});
