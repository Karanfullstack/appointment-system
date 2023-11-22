import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
const PublicRoutes = ({children}) => {
	const {user} = useSelector((state) => state.auth);

	if (localStorage.getItem("token")) {
		return <Navigate to="/" />;
	} else {
		return children;
	}
};

export default PublicRoutes;
