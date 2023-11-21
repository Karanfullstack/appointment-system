import "../styles/LayoutStyles.css";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import {MenuData} from "../menu-data/MenuData";

const Layout = ({children}) => {
	const location = useLocation();

	return (
		<div className="main">
			<div className="layout">
				<div className="sidebar">
					<div className="logo">
						<h5>Doc App</h5>
						<hr />
					</div>
					<div className="menu">
						{MenuData.map((menu) => {
							const isActive = location.pathname === menu.path;
							return (
								<div
									key={menu.name}
									className={`menu-item ${isActive && "active"}`}
								>
									<li className={menu.icon}></li>
									<Link to={menu.path}>{menu.name}</Link>
								</div>
							);
						})}
					</div>
				</div>
				<div className="content">
					<div className="header">Header</div>
					<div className="body">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
