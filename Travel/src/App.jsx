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
import ChatBot from "./pages/user/ChatBot";
import NotFoundPageUser from "./pages/user/NotFoundUser";
import NotFoundPage from "./pages/NotFound";
import Rutes from "./pages/user/Rute";
import VideoTable from "./pages/user/VideoTable";
import ProfileLayout from "./layouts/ProfileLayout";
import InsertUserDetail from "./pages/user/InsertUserDetail";
import SavedRoute from "./pages/user/SavedRoute";
// import ChatAISection from "./pages/user/ChatBot";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Routes untuk Landing Layout */}
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/video" element={<VideoTable />} />
          <Route path="/" element={<LandingLayout />}>
            <Route path="/category" element={<CategoryPage />} />
            <Route index element={<LandingPage />} />
          </Route>
          {/* Routes untuk Home Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<HomeLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/:id" element={<DestinationDetail />} />
              <Route path="/destinasi" element={<Destination />} />
              <Route path="/chatbot" element={<ChatBot />} />
              <Route path="*" element={<NotFoundPageUser />} />
              <Route path="/rute" element={<Rutes />} />
            </Route>
            <Route element={<ProfileLayout />}>
              <Route path="/profile" element={<InsertUserDetail />} />
              <Route path="/profile/Route" element={<SavedRoute />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
