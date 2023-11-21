import React, {useEffect} from "react";
import axios from "axios";
import Layout from "../components/Layout";

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

	return (
		<Layout>
			<h1>Hello World</h1>
		</Layout>
	);
};

export default Home;
