/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

function uuidExist() {
	let token = localStorage.getItem("token");
	if (token) {
		return true;
	} else {
		return false;
	}
}
export const ProtectedRoute = (props) => {
	const Component = props.component;
	const authorize = uuidExist();

	return authorize ? <Component /> : <Navigate to="/login" />;
};
