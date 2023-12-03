import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import DoctorList from "./DoctorList";
import axios from "axios";
import {useDispatch} from "react-redux";
import {showLoading, hideLoading} from "../redux/features/loadingSlice";
const Home = () => {
	const [doctors, setDoctors] = useState([]);
	const dispatch = useDispatch();

	// Getting Approved Doctors List
	const getApprovedDoctors = async () => {
		try {
			dispatch(showLoading());
			const response = await axios.get("/api/doctor/get-approved-doctor-list", {
				headers: {Authorization: localStorage.getItem("token")},
			});

			if (response.status === 200) {
				console.log(response.data);
				dispatch(hideLoading());
				setDoctors(response.data.data);
			}
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
		}
	};
	useEffect(() => {
		getApprovedDoctors();
		dispatch(hideLoading());
	}, []);

	return (
		<Layout>
			<div className="">
				{doctors.length !== 0 ? (
					<div className="doctors-list" style={{minHeight: "600px"}}>
						<DoctorList doctor={doctors} />
					</div>
				) : (
					<div className="d-flex gap-3  p-4">
						<h1 className="text-center border">No Doctors Available</h1>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Home;
