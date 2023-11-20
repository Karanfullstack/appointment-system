import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home, Login, Register} from "./pages";
import {useSelector} from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
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
				</Routes>
			)}
		</BrowserRouter>
	);
}

export default App;
