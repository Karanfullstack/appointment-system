import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home, Login, Register} from "./pages";
import {useSelector} from "react-redux";
import Spinner from "./components/Spinner";
function App() {
	const {loading} = useSelector((state) => state.loading);
	return (
		<BrowserRouter>
			{loading ? (
				<Spinner />
			) : (
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			)}
		</BrowserRouter>
	);
}

export default App;
