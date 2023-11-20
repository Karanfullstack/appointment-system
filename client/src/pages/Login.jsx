import React from "react";
import {Form, Input, Button, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import "../styles/RegisterStyles.css";
import axios from "axios";
import {useDispatch} from "react-redux";
import {hideLoading, showLoading} from "../redux/features/loadingSlice";

const Login = () => {
	const [form] = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// form submit handler
	const onfinishHandler = async (values) => {
		dispatch(showLoading());
		try {
			const response = await axios.post("/api/user/login", values);
			if (response.data.success) {
				dispatch(hideLoading());
				message.success(response.data.message);
				localStorage.setItem("token", response.data.token);
			f}
		} catch (error) {
			dispatch(hideLoading());
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
