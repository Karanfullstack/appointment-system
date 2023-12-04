import React from "react";
import "../styles/User.css";
import Layout from "../components/Layout";
import {useSelector, useDispatch} from "react-redux";
import {Form, Input, Button} from "antd";

const UserProfile = () => {
	const user = useSelector((state) => state.auth);
	console.log(user);
	return (
		<Layout>
			<div className="user-profile">
				<h2 className="text-center mt-2 mb-4">PROFILE UPDATE </h2>
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					autoComplete="off"
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
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password disabled />
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
			</div>
		</Layout>
	);
};

export default UserProfile;
