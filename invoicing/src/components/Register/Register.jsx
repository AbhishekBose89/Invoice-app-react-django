import * as Yup from "yup";

import { NavLink } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
	const [responseData, setResponseData] = useState({
		responseText: "",
		responseClass: "",
	});

	const nav = useNavigate();

	const initialValues = {
		name: "",
		email: "",
		password: "",
	};
	const onSubmit = (values) => {
		axios
			.post("http://127.0.0.1:8000/api/users/register/", values)
			.then(
				(response) => {
					console.log(response);
					setResponseData({
						responseText: response.request.responseText,
						responseClass: "alert alert-success",
					});
					setTimeout(() => nav("/login"), 1000);
				},
				(error) => {
					console.log(error);
					setResponseData({
						responseText: error.response.data,
						responseClass: "alert alert-danger",
					});
				}
			)
			.catch((error) => console.log(error));
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		email: Yup.string()
			.required("Email is required")
			.email("Please enter a valid email"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "password should have at least 6 character")
			.max(20, "password should not more than 20 character"),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
	});
	return (
		<div className="container-fluid">
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
						<h2 className="text-center">Register</h2>
						<hr />
						<form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
							<div className="mb-3 form-group">
								<label htmlFor="name" className="text-left">
									Name
								</label>
								<input
									type="text"
									className={
										formik.touched.name && formik.errors.name
											? "form-control is-invalid"
											: "form-control"
									}
									id="name"
									name="name"
									placeholder="Enter Your Name"
									value={formik.values.name}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.name && formik.errors.name ? (
									<small className="text-danger">{formik.errors.name}</small>
								) : null}
							</div>
							<div className="mb-3 form-group">
								<label htmlFor="email">Email</label>
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
								<label htmlFor="password">Password</label>
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
								className="btn btn-primary btn-block text-center"
								value="Register"
								disabled={!formik.isValid}
							/>
						</form>
						<br />
						<p className="text-center">
							Already have an account ?<NavLink to="/login">Login Here</NavLink>
						</p>
					</div>
				</div>
				<div className="col-md-3"></div>
			</div>
		</div>
	);
};

export default Register;
