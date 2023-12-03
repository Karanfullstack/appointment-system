import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import {useParams} from "react-router-dom";
import {Row, Col, Card, DatePicker, TimePicker, Button, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {showLoading, hideLoading} from "../redux/features/loadingSlice";
import {PoweroffOutlined} from "@ant-design/icons";
import axios from "axios";
const BookingPage = () => {
	const [loading, setLoading] = useState(false);
	const [isAvilable, setIsAvilable] = useState(false);
	const {user} = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [doctor, setDoctor] = useState(null);
	const [dates, setDates] = useState(null || []);
	const [time, setTime] = useState(null);
	const {doctorId} = useParams();

	// Get Doctor Details By ID
	const getDoctorDetails = async (cancelToken) => {
		try {
			const response = await axios.get(
				`/api/doctor/get-doctor/${doctorId}`,

				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
					cancelToken: cancelToken,
				}
			);

			if (response.status === 200) setDoctor(response.data.data);
		} catch (error) {
			if (axios.isCancel(error)) {
				console.log("Request canceled", error.message);
			} else {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();

		getDoctorDetails(source.token);
		return () => {
			source.cancel("Operation canceled");
		};
	}, [doctorId]);

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
				message.success("Appointment Booked Successfully");
			}
		} catch (error) {
			console.log(error);
			dispatch(hideLoading());
		}
	};

	// checking Availibility
	const checkAvailibility = async () => {
		try {
			setLoading(true);
			const response = await axios.post(
				"/api/appointment/check",
				{
					date: dates,
					time: time,
				},
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);

			setTimeout(() => {
				setLoading(false);

				if (response.data.data.isAvailable) {
					setIsAvilable(response.data.data.isAvailable);
					message.success("Slot is Available");
				} else {
					message.error("Slot is not Available");
				}
			}, 3000);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	// function for dates and time not to be empty or null
	const isEmpty = (dates, time) => {
		if (dates === null || time === null) {
			return true;
		}
		return false;
	};

	console.log(isEmpty(dates, time));

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
									onChange={(value) => {
										setDates(value && value.format("DD-MM-YYYY"));
										setIsAvilable(false);
									}}
								/>
								<TimePicker
									onChange={(values) => {
										setTime(values && values.format("HH:mm"));
										setIsAvilable(false);
									}}
								/>
							</div>
							<div className="d-flex gap-3">
								{loading ? (
									<Button disabled icon={<PoweroffOutlined />} loading>
										Checking...
									</Button>
								) : (
									<Button
										disabled={isEmpty(dates, time)}
										onClick={checkAvailibility}
									>
										Check Availibility
									</Button>
								)}

								<Button disabled={!isAvilable} onClick={bookAppointment}>
									Book Now
								</Button>
							</div>
						</Col>
					</Row>
				</div>
			)}
		</Layout>
	);
};

export default BookingPage;
