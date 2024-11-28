import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import RegisterUser from "./pages/Register";
import LoginUser from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import CategoryPage from "./pages/user/PersonalKategori";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/user/HomePage";
import DestinationDetail from "./pages/user/DetailDestinasi";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Routes untuk Landing Layout */}
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<LandingPage />} />
          </Route>
          {/* Routes untuk Home Layout */}
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path=":id" element={<DestinationDetail />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
