import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import InvoiceItems from "./components/InvoiceItems/InvoiceItems";
import InvoiceList from "./components/InvoiceList/InvoiceList";
import ItemForm from "./components/ItemForm/ItemForm";
import Login from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRouting/ProtectedRoute";
import Register from "./components/Register/Register";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<ProtectedRoute component={InvoiceList} />}
					></Route>
					<Route path="newInvoice" element={<InvoiceForm />}></Route>
					<Route
						path="/:id"
						element={<ProtectedRoute component={InvoiceItems} />}
					></Route>
					<Route
						path="/:id/newItem"
						element={<ProtectedRoute component={ItemForm} />}
					></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
