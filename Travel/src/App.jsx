import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import RegisterUser from "./pages/Register";
import LoginUser from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import CategoryPage from "./pages/PersonalKategori";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Routes untuk Landing Layout */}
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginUser />} />
          </Route>
          {/* Routes untuk Home Layout */}
          <Route>
            <Route path="/category" element={<CategoryPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
