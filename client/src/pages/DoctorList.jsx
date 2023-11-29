import React from "react";
import {Card, Col, Row} from "antd";
import {useNavigate} from "react-router-dom";
const DoctorList = ({doctor}) => {
	const navigate = useNavigate();

	return (
		<Row gutter={16}>
			{doctor.map((doctor) => (
				<div
					onClick={() => navigate("/appointments")}
					style={{cursor: "pointer"}}
				>
					<Col key={doctor._id} span={4}>
						<Card
							title={`DR. ${doctor.firstName.toUpperCase()} `}
							extra={<p>BOOK APPOINTMENT</p>}
							style={{
								width: 300,
								fontSize: "17px",
							}}
						>
							<p>
								<strong>Specialization: </strong>
								{doctor.specialization}
							</p>
							<p>
								<strong>Experience: </strong>
								{doctor.experience}
							</p>
							<p>
								<strong>Fees Per Cunsultation : </strong>
								{doctor.feesPerSession}
							</p>
							<p>
								<strong>Timings: </strong>
								{`${doctor.timings[0]} - ${doctor.timings[1]}`}
							</p>
						</Card>
					</Col>
				</div>
			))}
		</Row>
	);
};

export default DoctorList;
