import "./Navbar.css";

import { useEffect, useState } from "react";

import { NavLink,useNavigate } from "react-router-dom";

export default function Navbar() {
	const [loggedIn, setLoggedIn] = useState(false);
	const nav = useNavigate();
	useEffect(() => {
		let uuid = localStorage.getItem("token");
		if (uuid) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}, [loggedIn]);

	const logoutHandler = () => {
		localStorage.removeItem("uuid");
		nav("/login", true);
	};
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					Invoice App
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							fill="currentColor"
							className="bi bi-list"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
							/>
						</svg>
					</span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link active" aria-current="page" to="/">
								Invoices
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/newInvoice">
								New Invoice
							</NavLink>
						</li>
					</ul>
					<form className="form-inline my-2 my-lg-0">
						{loggedIn ? (
							<button
								className="btn btn-outline-success btn-block my-2 my-sm-0"
								onClick={logoutHandler}
							>
								Logout
							</button>
						) : (
							<a
								className="btn btn-outline-success btn-block my-2 my-sm-0"
								href="/login"
							>
								LogIn
							</a>
						)}
					</form>
				</div>
			</div>
		</nav>
	);
}
