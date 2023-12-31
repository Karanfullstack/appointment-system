import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home, Login, Register, ApplyDoctor, Users, Doctors} from "./pages";
import {useSelector} from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Notification from "./pages/Notification";
import DoctorProfile from "./pages/DoctorProfile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointment from "./pages/DoctorAppointment";
import UserProfile from "./pages/UserProfile";

function App() {
	const {loading} = useSelector((state) => state.loading);
	return (
		<BrowserRouter>
			{loading ? (
				<Spinner />
			) : (
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoutes>
								<Home />
							</ProtectedRoutes>
						}
					/>
					<Route
						path="/login"
						element={
							<PublicRoutes>
								<Login />
							</PublicRoutes>
						}
					/>
					<Route
						path="/register"
						element={
							<PublicRoutes>
								<Register />
							</PublicRoutes>
						}
					/>

					<Route
						path="/apply-doctor"
						element={
							<ProtectedRoutes>
								<ApplyDoctor />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="/notification"
						element={
							<ProtectedRoutes>
								<Notification />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="admin/users"
						element={
							<ProtectedRoutes>
								<Users />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="profile/doctor/:id"
						element={
							<ProtectedRoutes>
								<DoctorProfile />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="admin/physician"
						element={
							<ProtectedRoutes>
								<Doctors />
							</ProtectedRoutes>
						}
					/>

					<Route
						path="/doctor/book-appointment/:doctorId"
						element={
							<ProtectedRoutes>
								<BookingPage />
							</ProtectedRoutes>
						}
					/>
					<Route
						path="/user/appointments"
						element={
							<ProtectedRoutes>
								<Appointments />
							</ProtectedRoutes>
						}
					/>
					<Route
						path="/doctor/appointments"
						element={
							<ProtectedRoutes>
								<DoctorAppointment />
							</ProtectedRoutes>
						}
					/>
					<Route
						path="/profile/user"
						element={
							<ProtectedRoutes>
								<UserProfile />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			)}
		</BrowserRouter>
	);
}

export default App;
