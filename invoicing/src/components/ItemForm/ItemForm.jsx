import "./ItemForm.css";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../NavBar/Navbar";
import { useState } from "react";

export default function ItemForm() {
	const [newItem, setNewItem] = useState({});
	const navigate = useNavigate();
	const { id } = useParams();
	function handleSubmit() {
		let token = localStorage.getItem("token");
		fetch("http://127.0.0.1:8000/api/invoices/" + id.toString() + "/items/", {
			method: "POST",
			body: JSON.stringify(newItem),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => navigate("/" + id));
	}

	return (
		<div className="container">
			<Navbar />
			<form>
				<div className="mb-3 form-group">
					<label htmlFor="desc">Description</label>
					<input
						type="text"
						className="form-control"
						id="desc"
						onInput={(e) => {
							setNewItem({ ...newItem, desc: e.target.value });
						}}
					></input>
				</div>
				<div className="mb-3 form-group">
					<label htmlFor="rate">Rate</label>
					<input
						type="number"
						className="form-control"
						id="rate"
						onInput={(e) => {
							setNewItem({ ...newItem, rate: e.target.value });
						}}
					></input>
				</div>

				<div className="mb-3 form-group">
					<label htmlFor="quantity">Quantity</label>
					<input
						type="number"
						className="form-control"
						id="quantity"
						onInput={(e) => {
							setNewItem({ ...newItem, quantity: e.target.value });
						}}
					></input>
				</div>

				<button
					className="btn btn-primary btn-block text-center"
					type="button"
					onClick={handleSubmit}
				>
					Add Item
				</button>
			</form>
		</div>
	);
}
