import React from "react";
import { useSelector } from "react-redux";
import NavbarFooter from "../../layout/navbarFooter";
import NavbarHeader from "../../layout/navbarHead";

const UserProfile = () => {
  const inf = useSelector((state) => state.authen);
  console.log(inf);

  return (<>
  <NavbarHeader/>
    <div className="px-2.5 pt-32 pb-16">
      <div className="grid justify-items-center ... rounded-lg bg-home mt-2 md:mt-0 md:col-span-2">
        <div className="m-4">
          <img
            src={`${inf.data.line_pic}`}
            style={{ width: 300, height: 300, borderRadius: 400 / 2 }}
          />
          <h1 className="text-white pt-5">USERNAME : {inf.data.line_name} </h1>
          {/* <h1>ROLE : {inf.role}</h1> */}
        </div>
      </div>
    </div>
    <NavbarFooter />
    </>);
};

export default UserProfile;
