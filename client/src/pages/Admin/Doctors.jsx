import React, {useState, useEffect} from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import {Table} from "antd";
const Doctors = () => {
	const [doctors, setDoctors] = useState([]);

	// Function to get all doctors
	const getDoctors = async () => {
		try {
			const response = await axios.get("/api/admin/doctors", {
				headers: {Authorization: localStorage.getItem("token")},
			});
			console.log(response);
			if (response.status === 200) {
				setDoctors(response.data.doctors);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDoctors();
	}, []);
	console.log(doctors);

	// Data to be displayed in the table
	const columns = [
		{
			title: "First Name",
			dataIndex: "firstName",
			key: "firstName",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Actions",
			dataIndex: "actions",
			key: "actions",
			render: (text, record) => (
				<div className="d-flex">
					{record.status === "pending" ? (
						<button className="btn btn-success">Approve</button>
					) : (
						<button className="btn btn-danger">Reject</button>
					)}
				</div>
			),
		},
	];

	return (
		<Layout>
			<h1 className="text-center p-3">Admin Doctors</h1>
			<Table columns={columns} dataSource={doctors} />
		</Layout>
	);
};

export default Doctors;
