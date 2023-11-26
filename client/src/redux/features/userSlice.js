import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	user: null,
};

const userSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		refetchUser: (state) => {
			state.user = null;
		},
	},
});

export const {setUser, refetchUser} = userSlice.actions;
export default userSlice.reducer;
