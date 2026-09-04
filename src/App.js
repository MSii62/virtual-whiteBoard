import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CanvasPage from "./pages/CanvasPage";
import "./pages/full.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
        path="/load/:id"
         element={
          <ProtectedRoute>
          <CanvasPage />
          </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;