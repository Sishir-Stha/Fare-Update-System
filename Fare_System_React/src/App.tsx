import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";  // ✅ Ensure correct import
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/landingpage" element={<LandingPage />} /> {/* ✅ Ensure this is here */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
