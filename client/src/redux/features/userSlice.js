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
	},
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
