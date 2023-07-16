import BoardList from "./pages/Board/BoardList";
import BoardDetail from "./pages/Board/BoardDetail";
import BoardWrite from "./components/Board/BoardWrite";
import BoardUpdate from "./components/Board/BoardUpdate";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<BoardList />} />
      <Route path="/board/:idx" element={<BoardDetail />} />
      <Route path="/write" element={<BoardWrite />} />
      <Route path="/update/:idx" element={<BoardUpdate />} />
    </Routes>
  );
}

export default App;
