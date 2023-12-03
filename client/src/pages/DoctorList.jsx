import React from "react";
import {Button, Card, Col, Row} from "antd";
import {useNavigate} from "react-router-dom";

const DoctorList = ({doctor}) => {
	const navigate = useNavigate();

	return (
		<div>
			<h2 className="mb-4 text-center">Physicians List</h2>

			<Row gutter={[24, 24]}>
				{doctor.map((doctor) => (
					<Col key={doctor._id} span={12}>
						<Card
							title={`DR. ${doctor.firstName.toUpperCase()} `}
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
							<Button
								type="primary"
								style={{
									display: "flex",
									justifyContent: "center",
									marginTop: "3px",
								}}
								onClick={() =>
									navigate(`doctor/book-appointment/${doctor._id}`)
								}
							>
								Book Appointment
							</Button>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default DoctorList;
