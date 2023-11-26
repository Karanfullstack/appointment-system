import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {showLoading, hideLoading} from "../redux/features/loadingSlice";
import {setUser, refetchUser} from "../redux/features/userSlice";
import axios from "axios";

const ProtectedRoutes = ({children}) => {
	const dispatch = useDispatch();
	const {user} = useSelector((state) => state.auth);
	console.log(user);
	const currentUser = async () => {
		try {
			dispatch(showLoading());
			const response = await axios.get("/api/user/auth", {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});
			dispatch(hideLoading());

			if (response.data.success) {
				dispatch(setUser(response.data.data.result));
			} else {
				localStorage.clear();
				<Navigate to="/login" />;
			}
		} catch (error) {
			console.log(error);
			localStorage.clear();
			dispatch(hideLoading());
		}
	};

	useEffect(() => {
		if (!user) {
			currentUser();
		}
	}, [user, refetchUser]);

	if (localStorage.getItem("token")) {
		return children;
	} else {
		return <Navigate to="/login" />;
	}
};

export default ProtectedRoutes;
