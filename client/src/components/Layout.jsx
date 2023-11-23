import "../styles/LayoutStyles.css";
import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AdminMenu, UserMenu} from "../menu-data/MenuData";
import {useSelector, useDispatch} from "react-redux";
import {message} from "antd";
import {setUser} from "../redux/features/userSlice";
const Layout = ({children}) => {
	const {user} = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const sideMenu = user && user.isAdmin ? AdminMenu : UserMenu;

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
						<h5>Doc App</h5>
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
							<i className="fa-solid fa-bell"></i>
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
