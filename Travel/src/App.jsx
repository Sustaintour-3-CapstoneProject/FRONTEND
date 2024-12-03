import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import RegisterUser from "./pages/Register";
import LoginUser from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import CategoryPage from "./pages/user/PersonalKategori";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/user/HomePage";
import DestinationDetail from "./pages/user/DetailDestinasi";
import ProtectedRoute from "./routes/ProtectedRoute";
import Destination from "./pages/user/Destination";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path=":id" element={<DestinationDetail />} />
            <Route path="destinasi" element={<Destination />} />
          </Route>
        </Route>

        {/* Global fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
