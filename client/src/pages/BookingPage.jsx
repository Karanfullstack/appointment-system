import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import {useParams} from "react-router-dom";
import {Row, Col, Card, DatePicker, TimePicker, Button, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {showLoading, hideLoading} from "../redux/features/loadingSlice";
import axios from "axios";

const BookingPage = () => {
	const {user} = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	console.log(user);
	const [doctor, setDoctor] = useState(null);
	const [dates, setDates] = useState(null || []);
	const [time, setTime] = useState(null);
	const {doctorId} = useParams();
	console.log(dates && dates);
	console.log(time && time);
	// Get Doctor Details By ID
	const getDoctorDetails = async () => {
		try {
			const response = await axios.get(`/api/doctor/get-doctor/${doctorId}`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});
			console.log(response.data);
			if (response.status === 200) setDoctor(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getDoctorDetails();
	}, []);

	// Book Appointment Function
	const bookAppointment = async () => {
		dispatch(showLoading());
		try {
			const response = await axios.post(
				"/api/appointment/create",
				{
					doctorId: doctor._id,
					userId: user?._id,
					userInfo: user,
					doctorInfo: doctor,
					status: "pending",
					date: dates,
					time: time,
				},
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			if (response.status === 200) {
				dispatch(hideLoading());
				console.log(response.data);
				message.success("Appointment Booked Successfully");
			}
		} catch (error) {
			console.log(error);
			dispatch(hideLoading());
		}
	};
	return (
		<Layout>
			{doctor && (
				<div className="p-3">
					<h2 className="text-center pb-5">
						Book Appointmnet With DR.{doctor.firstName.toUpperCase()}
					</h2>
					<Row gutter={[24, 25]}>
						<Col span={8}>
							<Card title="DOCTOR NAME" bordered={false}>
								<p>{doctor.firstName.toUpperCase()}</p>
							</Card>
						</Col>
						<Col span={8}>
							<Card title="EMAIL" bordered={false}>
								<p>{doctor.email.toUpperCase()}</p>
							</Card>
						</Col>
						<Col span={8}>
							<Card title="FEES PER SESSION" bordered={false}>
								<p>FEES: ${doctor.feesPerSession}</p>
							</Card>
						</Col>
						<Col span={8}>
							<Card title="PHONE" bordered={false}>
								<p>{doctor.phone.toUpperCase()}</p>
							</Card>
						</Col>

						<Col span={8}>
							<Card title="SPECIALIZATION" bordered={false}>
								<p>{doctor.specialization.toUpperCase()}</p>
							</Card>
						</Col>

						<Col span={8}>
							<Card title="TIMINGS" bordered={false}>
								<p>{`${doctor.timings[0]} - ${doctor.timings[1]}`} </p>
							</Card>
						</Col>

						<Col span={8}>
							<Card title="EXPERIENCE" bordered={false}>
								<p>{doctor.experience.toUpperCase()}</p>
							</Card>
						</Col>

						<Col span={8}>
							<p>SELECT DATE AND TIME</p>
							<div className="d-flex gap-3 mb-3">
								<DatePicker
									format="DD-MM-YYYY"
									onChange={(value) =>
										setDates(value && value.format("DD-MM-YYYY"))
									}
								/>
								<TimePicker
									onChange={(values) =>
										setTime(values && values.format("HH:mm"))
									}
								/>
							</div>
							<div className="d-flex gap-3">
								<Button>Check Availibility</Button>
								<Button onClick={bookAppointment}>Book Now</Button>
							</div>
						</Col>
					</Row>
				</div>
			)}
		</Layout>
	);
};

export default BookingPage;
