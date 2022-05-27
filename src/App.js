import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import "antd/dist/antd.css";
import './App.css'
import ProtectedRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/Auth";
import Register from "./components/Register";


const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes >
    </AuthProvider>
  )
}

export default App;