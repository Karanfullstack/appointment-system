import React from "react";
import Layout from "../components/Layout";
import {Tabs, message} from "antd";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {showLoading, hideLoading} from "../redux/features/loadingSlice";
import {refetchUser} from "../redux/features/userSlice";

const Notification = () => {
	const {user} = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	// notification push to seennotification
	const notification = async () => {
		try {
			dispatch(showLoading());
			const response = await axios.put(
				"/api/notification/read",
				{},
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			dispatch(refetchUser());
			dispatch(hideLoading());
			console.log(response);
			message.success("Notification Marked");
		} catch (error) {
			console.log(error);
		}
	};

	// Tabs data for notification
	const tabs = [
		{
			key: 0,
			label: "NOTIFICATION",
			children: (
				<div>
					<div className="d-flex justify-content-end">
						<h5 className="" style={{cursor: "pointer"}} onClick={notification}>
							MARK NOTIFICATION
						</h5>
					</div>
					{user &&
						user.notification.map((item, index) => (
							<div key={index}>
								<h6>{item.message}</h6>
							</div>
						))}
				</div>
			),
		},
		{
			key: 1,
			label: "SEEN NOTIFICATION",
			children: (
				<div>
					<div className="d-flex justify-content-end">
						<h5 className="">CLEAR NOTIFICATION</h5>
					</div>
					{user &&
						user.seennotification.map((item, index) => (
							<div key={index}>
								<h6>{item.message}</h6>
							</div>
						))}
				</div>
			),
		},
	];

	return (
		<Layout>
			<h4 className="text-center p-2">Notification Page</h4>
			<Tabs
				className="p-2"
				defaultActiveKey={"1"}
				animated={true}
				size="large"
				items={tabs}
			></Tabs>
		</Layout>
	);
};

export default Notification;
