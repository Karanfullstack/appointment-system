import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import DoctorList from "./DoctorList";
import axios from "axios";
const Home = () => {
	const [doctors, setDoctors] = useState([]);

	// Getting Approved Doctors List
	const getApprovedDoctors = async () => {
		try {
			const response = await axios.get("/api/doctor/get-approved-doctor-list", {
				headers: {Authorization: localStorage.getItem("token")},
			});
			if (response.status === 200) {
				console.log(response.data);
				setDoctors(response.data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getApprovedDoctors();
	}, []);

	return (
		<Layout>
			<div className="d-flex gap-3 p-4" style={{minHeight: "600px"}}>
				<DoctorList doctor={doctors} />
			</div>
		</Layout>
	);
};

export default Home;
