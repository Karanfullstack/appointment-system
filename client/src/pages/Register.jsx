import React from "react";
import {Form, Input, Button} from "antd";
import {Link} from "react-router-dom";
import "../styles/RegisterStyles.css";
const Register = () => {
	// form handler
	const onfinishHandler = (values) => {
		console.log(values);
	};

	return (
		<div className="form-container">
			<Form
				className="register-form"
				layout=" vertical"
				onFinish={onfinishHandler}
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
				<label htmlFor="password">Password</label>
				<Form.Item name="password">
					<Input type="password" required placeholder="Password" />
				</Form.Item>
				<Link>Already user login here</Link>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Register;
