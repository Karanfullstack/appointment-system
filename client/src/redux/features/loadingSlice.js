import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	loading: false,
};

export const loadingSlice = createSlice({
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
