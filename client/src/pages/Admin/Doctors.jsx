import React, {useState, useEffect} from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import {Table, message} from "antd";
const Doctors = () => {
	const [doctors, setDoctors] = useState([]);
	const [flag, setFlag] = useState(0);

	// Function to get all doctors
	const getDoctors = async () => {
		try {
			const response = await axios.get("/api/admin/doctors", {
				headers: {Authorization: localStorage.getItem("token")},
			});

			if (response.status === 200) {
				const doctorWithKeys = response.data.doctors.map((doctor) => {
					return {...doctor, key: doctor._id};
				});
				setDoctors(doctorWithKeys);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDoctors();
	}, [flag]);

	// Function to approve or reject doctor
	const handelStatus = async (doctorId, status) => {
		try {
			const response = await axios.put(
				"/api/admin/approved-doctor",
				{doctorId, status},
				{
					headers: {Authorization: localStorage.getItem("token")},
				}
			);
			if (response.status === 200) {
				setFlag((prev) => prev + 1);
				message.success("Doctor status updated successfully");
				console.log(response);
			}
		} catch (error) {
			console.log(error);
		}
	};

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
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (text, record) => (
				<div className="d-flex">
					{record.status === "pending" ? (
						<button className="btn btn-warning">PENDING</button>
					) : record.status === "rejected" ? (
						<button className="btn btn-dark">REJECTED</button>
					) : record.status === "approved" ? (
						<button className="btn btn-success">Approved</button>
					) : null}
				</div>
			),
		},
		{
			title: "Actions",
			dataIndex: "actions",
			key: "actions",
			render: (text, record) => (
				<div className="d-flex">
					{record.status === "pending" ? (
						<button
							className="btn btn-success"
							onClick={() => handelStatus(record._id, "approved")}
						>
							Approve
						</button>
					) : record.status === "approved" ? (
						<button
							className="btn btn-danger"
							onClick={() => handelStatus(record._id, "rejected")}
						>
							Reject
						</button>
					) : record.status === "rejected" ? (
						<button
							className="btn btn-warning"
							onClick={() => handelStatus(record._id, "approved")}
						>
							Approve
						</button>
					) : null}
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
