import Layout from "../../components/Layout";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {Table} from "antd";
const Users = () => {
	const [users, setUsers] = useState([]);

	// Function to get all users
	const getUsers = async () => {
		try {
			const response = await axios.get("/api/admin/users", {
				headers: {Authorization: localStorage.getItem("token")},
			});

			if (response.status === 200) {
				const userWithKeys = response.data.users.map((user) => {
					return {...user, key: user._id};
				});
				setUsers(userWithKeys);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);
	console.log(users);

	// Data to be displayed in the table
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text, record) => {
				return <span>{record.name.toUpperCase()}</span>;
			},
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			render: (text, record) => {
				return <span>{record.email.toUpperCase()}</span>;
			},
		},

		{
			title: "Doctor",
			dataIndex: "isDoctor",
			key: "isDoctor",
			render: (text, record) => <span>{record.isDoctor ? "YES" : "NO"}</span>,
		},
		{
			title: "Actions",
			dataIndex: "actions",
			key: "actions",
			render: (text, record) => (
				<div className="d-flex">
					<button className="btn btn-danger">Block</button>
				</div>
			),
		},
	];

	return (
		<Layout>
			<h1 className="text-center p-3">Admin Users</h1>
			<Table className="p-3" columns={columns} dataSource={users} />
		</Layout>
	);
};

export default Users;
