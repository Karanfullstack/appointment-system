import React from "react";
import {Form, Input, Button, message} from "antd";
import {useForm} from "antd/es/form/Form";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/RegisterStyles.css";

const Register = () => {
	const navigatge = useNavigate();
	const [form] = useForm(); // to rest fields

	// handelSubmit
	const onSubmit = async (values) => {
		try {
			const response = await axios.post("/api/user/register", values);
			if (response.data.success) {
				message.success(response.data.message);
				form.resetFields();
				navigatge("/login");
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			console.log(error.message);
			message.error(error.response.data.message);
		}
	};

	return (
		<div className="form-container">
			<Form
				form={form}
				className="register-form"
				layout=" vertical"
				onFinish={onSubmit}
			>
				<h3>Register Form</h3>
				<label htmlFor="name">Name</label>
				<Form.Item name="name">
					<Input type="text" required placeholder="Name" />
				</Form.Item>
				<label htmlFor="email">Email</label>
				<Form.Item name="email">
					<Input type="email" required placeholder="Email" />
				</Form.Item>
				<label htmlFor="phone">Phone</label>
				<Form.Item name="phone">
					<Input type="text" required placeholder="Phone" />
				</Form.Item>
				<label htmlFor="password">Password</label>
				<Form.Item name="password">
					<Input type="password" required placeholder="Password" />
				</Form.Item>
				<Link to="/login">Already user login here</Link>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Register;
