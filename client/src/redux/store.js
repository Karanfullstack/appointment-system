import {configureStore} from "@reduxjs/toolkit";
import {loadingSlice} from "./features/loadingSlice";
import currentUserSlice from "./features/currentUserSlice";
export const store = configureStore({
	reducer: {loading: loadingSlice.reducer, user: currentUserSlice},
});
