import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
// import Navbar from "./Navbar1";
import authenSlice, {
  initData,
  setIdAccount,
  setRole,
} from "../../login/authenSlice";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import logo1 from "../../image/logop2.gif";
import logo2 from "../../image/eazycafe.gif";
import NavbarHead from "../../layout/navbarHead";

const LayoutComp = () => {
  // const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.authen.data);
  const role = useSelector((state) => state.authen.role);

  // const [param] = useSearchParams(); // query string ?code=dfdsfsdf&start...
  const liff = window.liff;
  const liffid = "1657206783-A8xw5LxB";

  //เปิดครั้งแรก-ต่อLIFF/เก็บค่า profileใน redux(data)
  useEffect(() => {
    const initLIFF = async () => {
      let resLine = await liff.init({ liffId: `${liffid}` }).catch((err) => {
        throw err;
      });
      if (liff.isLoggedIn()) {
        let getProfile = await liff.getProfile();
        // console.log(getProfile);
        if (getProfile) {
          let result = await axios.delete("/users/startDeleteCart", {
            data: { line_id: getProfile.userId },
          });
          // console.log(result);
          dispatch(
            initData({
              line_name: getProfile.displayName,
              line_id: getProfile.userId,
              line_pic: getProfile.pictureUrl,
            })
          );
        } else {
          console.log("cannot get profile");
        }
      } else {
        liff.login();
      }
    };
    initLIFF();
  }, []);

  //เช็คสิิทธิใน DB
  useEffect(() => {
    const login = async () => {
      if (data) {
        let result = await axios.post("/authen/login", data);
        if (result) {
          // console.log(result.data);
          dispatch(setRole(result.data.role));
          dispatch(setIdAccount(result.data.id_account));
          // console.log(result.data.line_id);
          // console.log(result.data.role);
          // dispatch(setRole(result.data.role));
        }
      }
    };
    login();
  }, [data]);

  //เช็คสิทธิเสร็จ -> ไปหน้าต่างๆตามสิทธิ
  useEffect(() => {
    if (role === "user") {
      console.log("The role is USER");
      // navigate("/coffee");
    } else if (role === "admin") {
      console.log("The role is ADMIN");
      navigate("/admin");
    } else if (role === "bartender") {
      console.log("The role is bartender");
      navigate("/bartender");
    }
  }, [role]);
  //Method
  // 1. Trigger by liff.login(); path: /login/user
  // 2. Authen by line login -> redirect url
  // 3. Callback URL

  // useEffect(() => {
  //   if (window) {
  //     liff.current = window.liff;
  //   }
  // }, []);

  // const initLine = async () => {
  //   try {
  //     await liff.init({ liffId: `${liffid}` });
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // //เริ่ม Comp
  // useEffect(() => {
  //   let queryCode = {
  //     code: "",
  //     liffClientId: "",
  //   };

  //   if (window) {
  //     liff.current = window.liff;
  //   }

  //   for (const entry of param.entries()) {
  //     console.log("entry", entry);
  //     if (entry[0] === "code") {
  //       queryCode.code = entry[1];
  //     }

  //     if (entry[0] === "liffClientId") {
  //       queryCode.liffClientId = entry[1];
  //     }
  //   }

  //   if (queryCode.code !== "" && queryCode.liffClientId !== "") {
  //     initLine()
  //       .then(async () => {
  //         if (liff.isLoggedIn()) {
  //           // console.log("Location : ", location);
  //           if (location.pathname === "/") {
  //             let getProfile = await liff.getProfile();
  //             // dispatch(initData())
  //             console.log("getProfile", getProfile);
  //             // if (data) {
  //             //   let res = await axios
  //             //     .post("/authen/login", { ...data })
  //             //     .then((res) => {
  //             //       // console.log(res.data);
  //             //       dispatch(initLineId(res.data.line_id));
  //             //       dispatch(setStatus(res.data.status));
  //             //       if (res.data.status === "admin") {
  //             //         navigate("/admin");
  //             //       }

  //             //       if (res.data.status === "user") {
  //             //         console.log("to user page");
  //             //         navigate("/coffee");
  //             //       }

  //             //       if (res.data.status === "bartender") {
  //             //         navigate("/bartender");
  //             //       }
  //             //     })
  //             //     .catch((err) => console.log(err));
  //             // }

  //             // TODO
  //             // - api getRoleByLineID fetch axios
  //             //   req : lineID
  //             //   res : {role: 'user'}
  //             // - redirect user -> navigate("/coffee"); | admin -> navigate("/admin");
  //           }
  //           console.log("Login...");
  //           // navigate("/coffee");
  //         } else {
  //           console.log("not login...");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, []);

  return (
    <div>
      {/* <NavbarHead /> */}
      {/* {console.log(location)} */}
      <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          zIndex: 100,
          margin: "0% auto",
          width: "100%",
          opacity: 1,
        }}
      >
        <div className="flex-container-head">

          <li type="none" style={{ textAlign: "center", paddingTop: "0px" }}>
            <div
              style={{
                backgroundColor: "#252525",
                width: "100px",
                height: "100px",
              }}
            >
                <img src={logo1} width="80px" />
            </div>
          </li>

          <li type="none" style={{ textAlign: "left", paddingTop: "0px" }}>
            <div
              style={{
                backgroundColor: "#252525",
                width: "328px",
                height: "70px",
              }}
            >
              <img src={logo2} width="250px" />
            </div>
          </li>
        </div> 
      </div>
      {/* {location.pathname == "/" ? <img src={logo}></img> : <Outlet />} */}
      <Outlet />
    </div>
  );
};

export default LayoutComp;
