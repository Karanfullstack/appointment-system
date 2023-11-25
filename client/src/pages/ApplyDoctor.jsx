import React from "react";
import Layout from "../components/Layout";
import {Button, Col, Form, Input, Row, TimePicker} from "antd";
import "../styles/DoctorApplyForm.css";

const ApplyDoctor = () => {
	// handel submit
	const handelSubmit = (values) => {
		console.log(values);
	};
	
	return (
		<Layout>
			<div className="doctor-form-container">
				<h1>DOCTOR APPLY</h1>
				<Form onFinish={handelSubmit} layout="vertical">
					<h5 className="mb-4">Personal Details</h5>
					<Row gutter={10}>
						<Col xs={24} md={24} lg={8}>
							<Form.Item
								name="firstName"
								label="First Name"
								required
								rules={[{required: true}]}
							>
								<Input placeholder="First Name" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item
								name="lastName"
								label="Last Name"
								required
								rules={[{required: true}]}
							>
								<Input placeholder="Last Name" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item
								name="phone"
								label="Phone Number"
								required
								rules={[{required: true}]}
							>
								<Input placeholder="Phone Number" />
							</Form.Item>
						</Col>

						<Col xs={24} md={24} lg={8}>
							<Form.Item
								name="website"
								label="Website"
								required
								rules={[{required: true}]}
							>
								<Input placeholder="Website" />
							</Form.Item>
						</Col>

						<Col xs={24} md={24} lg={8}>
							<Form.Item
								name="email"
								label="Email"
								required
								rules={[{required: true}]}
							>
								<Input placeholder="Email" />
							</Form.Item>
						</Col>

						<Col xs={24} md={24} lg={8}>
							<Form.Item
								name="address"
								label="Address"
								required
								rules={[{required: true}]}
							>
								<Input placeholder="Address" />
							</Form.Item>
						</Col>
					</Row>

					<h5 className="mb-3 mt-3">Professional Details:</h5>
					<Row gutter={10}>
						<Col xs={24} md={24} lg={8}>
							<Form.Item
								name="specialization"
								label="Specialization"
								required
								rules={[{required: true}]}
							>
								<Input placeholder="Specialization" />
							</Form.Item>
						</Col>

						<Col xs={24} md={24} lg={8}>
							<Form.Item
								name="experience"
								label="Experience"
								required
								rules={[{required: true}]}
							>
								<Input placeholder="Experience" />
							</Form.Item>
						</Col>

						<Col xs={24} md={24} lg={8}>
							<Form.Item
								name="feesPerSession"
								label="Fee Per Session"
								required
								rules={[{required: true}]}
							>
								<Input placeholder="Fee Per Session" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item
								name="timings"
								label="Timings"
								required
								rules={[{required: true}]}
							>
								<TimePicker.RangePicker format="HH:mm" />
							</Form.Item>
						</Col>
					</Row>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form>
			</div>
		</Layout>
	);
};

export default ApplyDoctor;
