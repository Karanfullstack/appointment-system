import React from "react";
import Layout from "../components/Layout";
import {Tabs, message, List} from "antd";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {refetchUser} from "../redux/features/userSlice";

const Notification = () => {
	const {user} = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	// notification push to seennotification Function
	const notification = async () => {
		try {
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

			console.log(response);
			message.success("Notification Marked");
		} catch (error) {
			console.log(error);
		}
	};

	// clear notification Function
	const clearNotification = async () => {
		try {
			const respnose = await axios.put(
				"/api/notification/clear",
				{},
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);

			dispatch(refetchUser());
			dispatch(hideLoading());
			message.success("Notification Cleared");
			console.log(respnose);
		} catch (error) {
			console.log(error.message);
			dispatch(hideLoading());
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
							{user && user.notification.length > 0 && "MARK AS READ"}
						</h5>
					</div>
					{user &&
						user.notification.map((item, index) => (
							<div key={index} className="pd-3">
								<List itemLayout="horizontal">
									<List.Item>
										<List.Item.Meta
											title={<a href="https://ant.design">{item.message}</a>}
											description={item.type}
										/>
									</List.Item>
								</List>
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
						<h5
							className=""
							style={{cursor: "pointer"}}
							onClick={clearNotification}
						>
							{user && user.seennotification.length > 0 && "CLEAR NOTIFICATION"}
						</h5>
					</div>
					{user &&
						user.seennotification.map((item, index) => (
							<div key={index} className="pd-3">
								<List itemLayout="horizontal">
									<List.Item>
										<List.Item.Meta
											title={<a href="https://ant.design">{item.message}</a>}
											description={item.type}
										/>
									</List.Item>
								</List>
							</div>
						))}
				</div>
			),
		},
	];

	return (
		<Layout>
			<h4 className="text-center p-4">Notification Page</h4>
			<Tabs
				className="p-4"
				defaultActiveKey={"1"}
				animated={true}
				size="large"
				items={tabs}
			></Tabs>
		</Layout>
	);
};

export default Notification;
