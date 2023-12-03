import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import {Table} from "antd";
import axios from "axios";
import moment from "moment";
const Appointments = () => {
	const [appointments, setAppointments] = useState(null);
	// getting Appointments from database
	const getAppointments = async (cancelToken) => {
		try {
			const response = await axios.get("/api/appointment/user/get", {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
				cancelToken: cancelToken,
			});
			if (response.status === 200) {
				setAppointments(response.data.data);
			}
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();

		getAppointments(source.token);
		return () => source.cancel("Cancelling request");
	}, []);

	console.log(appointments && appointments);
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
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
			render:(text, record)=>{
			 return	<span>{record?.doctorInfo?.phone}</span>
			}
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
	];
	return (
		<Layout>
			<Table
				columns={colums}
				dataSource={appointments && appointments}
				rowKey={(record) => record._id}
			/>
		</Layout>
	);
};

export default Appointments;
