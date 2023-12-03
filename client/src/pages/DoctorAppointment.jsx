import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import {Table, Button} from "antd";
import axios from "axios";
import moment from "moment";
const DoctorAppointment = () => {
	const [appointment, setAppointments] = useState(null);

	// function for getting appointment for doctor
	const getDoctorAppointment = async () => {
		try {
			const response = await axios.get("/api/appointment/doctor/get", {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});
			if (response.status === 200) setAppointments(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getDoctorAppointment();
	}, []);

	console.log(appointment);

	const colums = [
		{
			title: "Count",
			key: "count",
			render: (text, record, index) => {
				return <span>{index + 1}</span>;
			},
		},
		{
			title: "ID",
			dataIndex: "_id",
			key: "_id",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text, record) => {
				return <span>{record.userInfo.name}</span>;
			},
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
			render: (text, record) => {
				return <span>{record.userInfo.phone}</span>;
			},
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (text) => {
				return moment(text).format("DD-MM-YYYY");
			},
		},

		{
			title: "Time",
			dataIndex: "time",
			key: "time",
			render: (text) => {
				return <span>{moment(text).format("HH:MM")}</span>;
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text, record) => {
				return <button className="btn btn-danger">Approved</button>;
			},
		},
	];
	return (
		<Layout>
			<h1 className="text-center p-2">Doctor Appointment</h1>
			<Table
				columns={colums}
				dataSource={appointment && appointment}
				rowKey={(record) => record._id}
			/>
		</Layout>
	);
};

export default DoctorAppointment;
