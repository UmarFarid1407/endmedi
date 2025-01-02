import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/user/sign-in/SignIn";
import SignUp from "./components/user/sign-up/SignUp";
import Profile from "./components/user/Dashboards/User/profile/profile";
import GetAllProducts from "./components/user/Dashboards/User/Products/getAllProducts";
import PastPurchasing from "./components/user/Dashboards/User/Products/pastPurchasing";
import ThrowUser from "./components/user/Dashboards/throwUser";
import {
  AdminNavbar,
  SellerNavbar,
  PharmacistNavbar,
  UserDashboard,
} from "./sharedimports/share";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/admin" element={<AdminNavbar />} />
        <Route path="/seller" element={<SellerNavbar />} />
        <Route path="/pharmacist" element={<PharmacistNavbar />} />

        <Route path="/throwuser" element={<ThrowUser />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<GetAllProducts />} />
        <Route path="/pastpurchasing" element={<PastPurchasing />} />
      </Routes>
    </Router>
  );
}

export default App;
