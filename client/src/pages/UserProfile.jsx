import React from "react";
import "../styles/User.css";
import Layout from "../components/Layout";
import {useSelector, useDispatch} from "react-redux";
import {Form, Input, Button, message} from "antd";
import axios from "axios";
import {showLoading, hideLoading} from "../redux/features/loadingSlice";
import {refetchUser} from "../redux/features/userSlice";

const UserProfile = () => {
	const {user} = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	// function for updating user info
	const updateUser = async (values) => {
		try {
			dispatch(showLoading());
			const response = await axios.put(
				"/api/user/update",
				{...values},
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);

			if (response.status === 201) {
				message.success("Profile Updated");
				dispatch(refetchUser());
				dispatch(hideLoading());
			}
		} catch (error) {
			console.log(error);
			dispatch(hideLoading());
		}
	};
	console.log(user);
	return (
		<Layout>
			<div className="user-profile">
				<h2 className="text-center mt-2 mb-4">PROFILE UPDATE </h2>
				{user && (
					<Form
						onFinish={updateUser}
						name="basic"
						labelCol={{
							span: 8,
						}}
						initialValues={{...user}}
					>
						<Form.Item
							label="Name"
							name="name"
							rules={[
								{
									required: true,
									message: "Please input your username!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item label="Email" name="email">
							<Input disabled />
						</Form.Item>
						<Form.Item
							label="Phone"
							name="phone"
							rules={[
								{
									required: true,
									message: "Please input your username!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item label="Password" name="password">
							<Input.Password disabled placeholder="************" />
						</Form.Item>

						<Form.Item label="Admin" name="isAdmin">
							<Input disabled />
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 8,
							}}
						>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				)}
			</div>
		</Layout>
	);
};

export default UserProfile;
