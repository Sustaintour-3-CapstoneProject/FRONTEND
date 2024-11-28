import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import RegisterUser from "./pages/Register";
import LoginUser from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import CategoryPage from "./pages/PersonalKategori";
import HomePage from "./pages/HomePage";
import HomeLayout from "./layouts/HomeLayout";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          {/* Routes untuk Landing Layout */}
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<LandingPage />} />
          </Route>
          {/* Routes untuk Home Layout */}
          <Route>
            <Route path="/home" element={<HomeLayout/>} >
              <Route index element={<HomePage />} /> 
              <Route path="category" element={<CategoryPage />} />
              </Route >
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
