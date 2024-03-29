import { useEffect, useState } from "react";

import Navbar from "../NavBar/Navbar";

export default function InvoiceList() {
	const [invoices, setInvoices] = useState([]);
	useEffect(() => {
		let token = localStorage.getItem("token");
		fetch("http://127.0.0.1:8000/api/invoices/", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((results) => {
				console.log(results);
				setInvoices(results);
				results?.forEach((element) => {
					element.totalAmount = element.items.reduce(
						(total, item) =>
							Number(total) + Number(item.rate) * Number(item.quantity),
						0
					);
				});
				
				console.log(invoices);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container">
			<Navbar />
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Invoice No</th>
						<th scope="col">Client</th>
						<th scope="col">Date</th>
						<th scope="col">Total Amount</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{invoices?.map((i, index) => (
						<tr key={index}>
							<th>{i.invoice_id}</th>
							<td>{i.client_name}</td>
							<td>{new Date(i.date).toDateString()}</td>
							<td>{i.totalAmount}</td>
							<td>
								<a
									href={i.invoice_id}
									className="btn btn-warning text-center btn-block"
								>
									Items
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
