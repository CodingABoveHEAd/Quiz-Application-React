import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Home from "./Home";
import Login from "./Login";
import Nav from "./nav";
import PrivateRoute from "./privaeRoute";
import PublicRoute from "./publicRoute";
import Quiz from "./Quiz";
import Result from "./Result";
import Signup from "./signUp";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<PublicRoute element={<Login />} />}
            />
            <Route
              path="/signup"
              element={<PublicRoute element={<Signup />} />}
            />
            <Route
              path="/quiz/:id"
              element={<PrivateRoute element={<Quiz />} />}
            />
            <Route
              path="/result/:id"
              element={<PrivateRoute element={<Result />} />}
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
