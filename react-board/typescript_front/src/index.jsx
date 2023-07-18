import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { BrowserRouter } from "react-router-dom";
import "./tailwind.css";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Header />
      <App />
      <Footer />
    </BrowserRouter>
  </RecoilRoot>,
);
