import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import LayoutComp from "./components/userComp/layout/LayoutComp";//line
// import LayoutComp from "./components/layout/LayoutComp";//not line
import HomeDetail from "./components/userComp/homeDetail/HomeDetail";
import BartenderDetail from "./components/batenderComp/homeDetail/BartenderDetail";
import axios from "axios";
import SuccessDetail from "./components/batenderComp/successDetail/SuccessDetail";
import AddProduct from "./components/adminComp/Product/AddProduct";
import AddCategory from "./components/adminComp/category/AddCategory";
import HomeAdminDetail from "./components/adminComp/HomeAdminDetail/HomeAdminDetail"
import Start from "./components/login/Start";
import CartDetail from "./components/userComp/cartDetail/CartDetail";
import EditProduct from "./components/adminComp/EditProduct/EditProduct";
import EditCategory from "./components/adminComp/EditCategory/EditCategory";
import EditAnyCategory from "./components/adminComp/EditCategory/EditAnyCategory";
import UserProfile from "./components/userComp/profile/UserProfile";
import EditUserCart from "./components/userComp/cartDetail/EditUserCart";
import ConfirmAPI from "./components/userComp/cartDetail/ConfirmAPI";
// import Navbar from "./components/userComp/layout/Navbar1";
import AdminDetail from "./components/adminComp/AdminDetail";

function App() {
  // axios.defaults.baseURL = "http://13.212.60.193:3000";
  axios.defaults.baseURL = "http://localhost:3000";

  const userStatus = useSelector((state) => state.authen.statusRight);

  //LIFF PART
  const liff = window.liff;
  const liffid = "1657254572-91OYpANd";
  const [authenRight, setAuthenRight] = useState("");
  const [data, setData] = useState(null);
  return (
    <div>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<LayoutComp />}>
        <Route index element={<Start />} />

        <Route path="/confirm" element={<ConfirmAPI />} />

{/* ------------------------------------Customer----------------------------------- */}
          <Route path="/:pageCat" element={<HomeDetail />} />
          <Route path="/cart" element={<CartDetail />} />
          <Route path="/editUserCart" element={<EditUserCart />} />
          <Route path="/userprofile" element={<UserProfile/>} />
{/* ------------------------------------Bartender----------------------------------- */}
          <Route path="/bartender" element={<BartenderDetail />} />
          <Route path="/bartender/success" element={<SuccessDetail />} />
{/* ------------------------------------Admin----------------------------------- */}
          <Route path="/admin" element={<AdminDetail />} />
          <Route path="/admin/:pageCat" element={<HomeAdminDetail />} />
          <Route path="/admin/addProduct" element={<AddProduct />} />
          <Route path="/admin/editProduct/:ProductId" element={<EditProduct/>} />
          {/* <Route path="/editProduct" element={<EditProduct/>} /> */}
          <Route path="/admin/addCategory" element={<AddCategory />} />
          <Route path="/admin/editCategory" element={<EditCategory />} />
          <Route path="/admin/editAnyCategory/:pageCat" element={<EditAnyCategory/>} />
{/* ------------------------------------NoMatch----------------------------------- */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <hr />
    </div>
  );
}

function NoMatch() {
  return (
    <>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </>
  );
}

export default App;
