import "../styles/LayoutStyles.css";
import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AdminMenu, UserMenu, DoctorMenu} from "../menu-data/MenuData";
import {useSelector, useDispatch} from "react-redux";
import {message, Badge} from "antd";
import {setUser} from "../redux/features/userSlice";

const Layout = ({children}) => {
	const {user} = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	// DoctorMenu
	const DoctorMenu = [
		{
			name: "Home",
			path: "/",
			icon: "fa-solid fa-house",
		},

		{
			name: "Appointments",
			path: "/appointments",
			icon: "fa-solid fa-list",
		},

		{
			name: "Profile",
			path: `/profile/${user && user._id}`,
			icon: "fa-solid fa-user",
		},
	];

	const sideMenu =
		user && user.isAdmin ? AdminMenu : user?.isDoctor ? DoctorMenu : UserMenu;

	// logout function
	const logout = () => {
		dispatch(setUser(null));
		localStorage.clear();
		message.success("Logout Successfully");
		navigate("/login");
	};

	return (
		<div className="main">
			<div className="layout">
				{/* Side Bar Section */}
				<div className="sidebar">
					<div className="logo">
						<h5>MEDIC APP</h5>
						<hr />
					</div>
					<div className="menu">
						{sideMenu.map((menu) => {
							const isActive = location.pathname === menu.path;
							return (
								<div
									key={menu.name}
									className={`menu-item ${isActive && "active"}`}
								>
									<i className={menu.icon}></i>
									<Link to={menu.path}>{menu.name}</Link>
								</div>
							);
						})}
						<div className="menu-item" onClick={logout}>
							<i className="fa-solid fa-right-from-bracket"></i>
							<Link>Logout</Link>
						</div>
					</div>
				</div>

				{/* Header and Body Section */}
				<div className="content">
					<div className="header">
						<div className="header-content">
							<Badge
								count={user && user.notification.length}
								onClick={() => navigate("/notification")}
							>
								<i
									className="fa-solid fa-bell mt-2"
									style={{cursor: "pointer"}}
								></i>
							</Badge>

							<Link to="/profile">{user && user.email}</Link>
						</div>
					</div>
					<div className="body">{children}</div>
				</div>
			</div>
		</div>
	);
};
// layout structured
export default Layout;
