import Layout from "../../components/Layout";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {Table, message} from "antd";
const Users = () => {
	const [users, setUsers] = useState([]);
	const [flag, setFlag] = useState(false);
	// block user function
	const blockUser = async (userId) => {
		try {
			const response = await axios.put(
				"/api/admin/block-user",
				{userId},
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			setFlag(!flag);
			const {data} = response;
			if (data.user.isBlocked) {
				message.success("User Blocked Successfully");
			} else {
				message.success("User Unblocked Successfully");
			}
			console.log(data);
		} catch (error) {
			console.log(error.message);
		}
	};

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
	}, [flag]);
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
			title: "Blocked",
			dataIndex: "isBlocked",
			key: "isBlocked",
			render: (text, record) => <span>{record.isBlocked ? "YES" : "NO"}</span>,
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
					{record.isBlocked ? (
						<button
							onClick={() => blockUser(record._id)}
							className="btn btn-success"
						>
							Unblock
						</button>
					) : (
						<button
							onClick={() => blockUser(record._id)}
							className="btn btn-dark"
						>
							Block
						</button>
					)}
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
