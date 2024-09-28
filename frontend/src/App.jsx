import { Routes, Route } from "react-router-dom";
import Signup from "../pages/auth/auth.signup";
import Login from "../pages/auth/auth.login";
import ForgetPassword from "../pages/auth/auth.forget-password";
import Google from "../pages/auth/auth.google";
import Dashboard from "../pages/Dashboard/dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/auth/signup" element={<Signup />}/>
      <Route path="/auth/login" element={<Login />}/>
      <Route path="/auth/forget-password" element={<ForgetPassword />}/>
      <Route path="/auth/google" element={<Google />}/>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App;