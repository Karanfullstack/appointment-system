import {configureStore} from "@reduxjs/toolkit";
import loadingSlice from "./features/loadingSlice";
import userSlice from "./features/userSlice";
import themeSlice from "./features/themeSlice";

export const store = configureStore({
	reducer: {loading: loadingSlice, auth: userSlice, theme: themeSlice},
});
