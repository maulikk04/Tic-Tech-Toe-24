import { Routes, Route } from "react-router-dom";
import Signup from "../pages/auth/auth.signup";
import Login from "../pages/auth/auth.login";
import ForgetPassword from "../pages/auth/auth.forget-password";
import Google from "../pages/auth/auth.google";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/signup" element={<Signup />}/>
      <Route path="/auth/login" element={<Login />}/>
      <Route path="/auth/login?error=Authentication%20Failed" element={<Login />}/>

      <Route path="/auth/forget-password" element={<ForgetPassword />}/>
      <Route path="/auth/google" element={<Google />}/>
    </Routes>
  )
}

export default App;