import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";

function App() {
  return (
    <Router> {/* Ensure Router wraps everything */}
      <AuthProvider> {/* AuthProvider inside Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
