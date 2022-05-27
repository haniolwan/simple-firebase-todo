import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "antd/dist/antd.css";
import './App.css'
import ProtectedRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/Auth";
import SignForm from "./components/SignForm";


const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<SignForm type="login"/>} />
        <Route path="register" element={<SignForm type="register"/>} />

        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes >
    </AuthProvider>
  )
}

export default App;