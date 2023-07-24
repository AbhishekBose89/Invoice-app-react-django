import * as Yup from "yup";

import { NavLink } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
	const [responseData, setResponseData] = useState({
		responseText: "",
		responseClass: "",
	});

	const nav = useNavigate();

	const initialValues = {
		email: "",
		password: "",
	};
	const onSubmit = (values) => {
		axios
			.post("http://127.0.0.1:8000/api/users/login/", values)
			.then(
				(response) => {
					localStorage.setItem("token", response.data.token);
					console.log("response", response);
					setResponseData({
						responseText: "Login Successful",
						responseClass: "alert alert-success",
					});
					setTimeout(() => nav("/"), 1000);
				},
				(error) => {
					console.log("error", error);
					setResponseData({
						responseText: "Login Failed, Please provide valid credentials",
						responseClass: "alert alert-danger",
					});
				}
			)
			.catch((error) => console.log(error));
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.required("Email is required")
			.email("please enter a valid email"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "password should have at least 6 character")
			.max(20, "password should not more than 20 character"),
	});
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
		validateOnMount: true,
	});
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<div
						style={{
							padding: "30px 40px",
							marginTop: "80px",
							borderRadius: "10px",
							boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
						}}
					>
						<div className={responseData.responseClass}>
							{responseData.responseText}
						</div>
						<h2>LogIn</h2>
						<hr />
						<form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
							<div className="mb-3 form-group">
								<label htmlFor="email">Email </label>
								<input
									type="text"
									className={
										formik.touched.email && formik.errors.email
											? "form-control is-invalid"
											: "form-control"
									}
									id="email"
									name="email"
									placeholder="Enter Your Email"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.email && formik.errors.email ? (
									<small className="text-danger">{formik.errors.email}</small>
								) : null}
							</div>
							<div className="mb-3 form-group">
								<label htmlFor="password">Password </label>
								<input
									type="password"
									className={
										formik.touched.password && formik.errors.password
											? "form-control is-invalid"
											: "form-control"
									}
									id="password"
									name="password"
									placeholder="Enter Your Password"
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.password && formik.errors.password ? (
									<small className="text-danger">
										{formik.errors.password}
									</small>
								) : null}
							</div>
							<input
								type="submit"
								className="btn btn-success btn-block text-center"
								value="Login"
								disabled={!formik.isValid}
							/>
						</form>
						<br />
						<p className="text-center">
							New User ? <NavLink to="/register">Click Here</NavLink>
						</p>
					</div>
				</div>
				<div className="col-md-3"></div>
			</div>
		</div>
	);
};

export default Login;
