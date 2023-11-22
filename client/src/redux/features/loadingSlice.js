import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	loading: false,
};

const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		showLoading: (state) => {
			state.loading = true;
		},
		hideLoading: (state) => {
			state.loading = false;
		},
	},
});

export const {showLoading, hideLoading} = loadingSlice.actions;
export default loadingSlice.reducer;
