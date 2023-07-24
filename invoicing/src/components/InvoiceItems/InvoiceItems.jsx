import "./InvoiceItems.css";

import { useEffect, useState } from "react";

import ItemList from "../ItemList/ItemList";
import Navbar from "../NavBar/Navbar";
import { useParams } from "react-router-dom";

export default function InvoiceForm() {
	const [invoice, setInvoice] = useState({});
	const [totalAmount, setTotalAmount] = useState(0);
	const params = useParams();

	useEffect(() => {
		let token = localStorage.getItem("token");
		fetch("http://127.0.0.1:8000/api/invoices/" + params.id, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((parsedRes) => {
				setInvoice(parsedRes);
				if (parsedRes && parsedRes.items) {
					const totalPrice = parsedRes.items.reduce(
						(accumulator, currentItem) => {
							return (
								accumulator +
								currentItem.quantity * parseFloat(currentItem.rate)
							);
						},
						0
					);
					console.log(totalPrice);
					setTotalAmount(totalPrice);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container">
			<Navbar />
			<form>
				<div className="mb-3 form-group">
					<label htmlFor="name">Client Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={invoice.client_name}
						disabled
					></input>
				</div>
				<div className="mb-3 form-group">
					<label htmlFor="date">Date</label>
					<input
						type="text"
						className="form-control"
						id="date"
						value={new Date(invoice.date).toDateString()}
						disabled
					></input>
				</div>
				<br />
				<label className="float-start">Total Amount: {totalAmount}</label>
				<br />
				<br />
				<a
					href={invoice.invoice_id + "/newItem"}
					className="float-start btn btn-warning btn-block mb-3 text-center"
				>
					New Item
				</a>
			</form>
			<ItemList invoice={invoice} items={invoice.items} />
		</div>
	);
}
