import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	user: null,
};

const currentUserSlice = createSlice({
	name: "currentUser",
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const {login} = currentUserSlice.actions;
export default currentUserSlice.reducer;
