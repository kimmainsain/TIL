import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { BrowserRouter } from "react-router-dom";
import './tailwind.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Header />
		<App />
		<Footer />
	</BrowserRouter>,
);
