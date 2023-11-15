import React from "react";
import {Form, Input, Button, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import "../styles/RegisterStyles.css";
import axios from "axios";

const Login = () => {
	const [form] = useForm();
	const navigate = useNavigate();
	// form submit handler
	const onfinishHandler = async (values) => {
		console.log(values);
		try {
			const response = await axios.post("/api/user/login", values);

			if (response.data.success) {
				message.success(response.data.message);
				localStorage.setItem("token", response.data.token);
				navigate("/");
			}
		} catch (error) {
			if (error) {
				message.error(error.response.data.message);
			}
		}
	};

	return (
		<div className="form-container">
			<Form
				form={form}
				className="register-form"
				layout=" vertical"
				onFinish={onfinishHandler}
			>
				<h3>Login Form</h3>

				<label htmlFor="email">Email</label>
				<Form.Item name="email">
					<Input type="email" required placeholder="Email" />
				</Form.Item>
				<label htmlFor="password">Password</label>
				<Form.Item name="password">
					<Input type="password" required placeholder="Password" />
				</Form.Item>
				<Link to="/register">Not a user Register here</Link>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Login;
