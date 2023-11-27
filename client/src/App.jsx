import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home, Login, Register, ApplyDoctor, Users, Doctors} from "./pages";
import {useSelector} from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Notification from "./pages/Notification";

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
						path="admin/doctors"
						element={
							<ProtectedRoutes>
								<Doctors />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			)}
		</BrowserRouter>
	);
}

export default App;
