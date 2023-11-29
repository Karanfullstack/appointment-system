import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import axios from "axios";
import {Button, Col, Form, Input, Row, TimePicker, message} from "antd";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {showLoading, hideLoading} from "../redux/features/loadingSlice";
import moment from "moment";

const DoctorProfile = () => {
	const [doctor, setDoctor] = useState(null);
	const [flag, setFlag] = useState(0);

	// Get doctor's info from database
	const getDoctorInfo = async () => {
		try {
			const response = await axios.get("/api/doctor/get-doctor", {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});

			if (response.status === 200) {
				setDoctor(response.data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getDoctorInfo();
	}, [flag]);

	// Update doctor's info
	const updateDoctorInfo = async (values) => {
		try {
			const response = await axios.put(
				"/api/doctor/update-doctor",
				{
					...values,
					timings: [
						values.timings[0].format("HH:mm"),
						values.timings[1].format("HH:mm"),
					],
				},
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			if (response.status === 200) {
				setFlag((prev) => prev + 1);
				message.success("Doctor Updated");
				console.log(response);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Layout>
			<div className="doctor-form-container">
				<h1>PROFILE MANAGEMENT {doctor && doctor.lastName}</h1>
				{doctor && (
					<Form
						onFinish={updateDoctorInfo}
						layout="vertical"
						initialValues={{
							...doctor,
							timings: [
								moment(doctor.timings[0], "HH:mm"),
								moment(doctor.timings[1], "HH:mm"),
							],
						}}
					>
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

							<Col xs={24} md={24} lg={8}>
								<Button
									className="mt-4"
									type="primary"
									danger
									htmlType="submit"
								>
									UPDATE
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</div>
		</Layout>
	);
};

export default DoctorProfile;
