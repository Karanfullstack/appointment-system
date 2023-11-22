import {configureStore} from "@reduxjs/toolkit";
import loadingSlice from "./features/loadingSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
	reducer: {loading: loadingSlice, auth: userSlice},
});


