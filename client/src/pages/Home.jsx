import React, {useEffect} from "react";
import axios from "axios";

const Home = () => {
	// Get Current User
	const getCurrentUser = async () => {
		try {
			const response = await axios.get("/api/user/auth", {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getCurrentUser();
	}, []);
	
	return <h1>Home Page World</h1>;
};

export default Home;
