import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../layout/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import classNames from 'classnames';
import {
  initAllCategory,
  setCurrentCategory,
  toggleShow,
} from "../../userComp/categorySlice";
import axios from "axios";
import NavbarAdminHead from "../../layout/navbarAdminHead";
import NavbarAdminFooter from "../../layout/navbarAdminFooter";

const EditCategory = () => {
  let dispatch = useDispatch();
  let state = useSelector((state) => state.category.categoryAll);
  let navigate = useNavigate();

  const [delAction, setDel] = useState();

  const handelDel = (e)=>{
    axios.delete(`/admins/category/del/${e}`);
    try{
      setDel(e);
      console.log("del successfully");
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchAllCategory = async () => {
      let result = await axios.get("users/allCategory");
      // console.log(result);
      if (result.status === 200) {
        dispatch(initAllCategory(result.data));
      }
    };
    fetchAllCategory();
  }, [delAction]);
  

  const toggleCategory = (id_category,isToggle)=>{
    console.log("click");
    axios.put(`admins/category/toggle_category/${id_category}`,{isShow:isToggle})
    .then (res =>{
      console.log(res.data);
      if(res.status == 200){
        dispatch(toggleShow(id_category));
      }
    })
  }

  return (
    <div>
      <NavbarAdminHead />
      <div className="pt-32 pb-16">
        <div className="mt-2 sm:mt-5">
          <div className="md:grid md:grid-cols-1 md:gap-10">
            <div className="mt-2 md:mt-0 md:col-span-2">
              <div className="px-2.5 shadow overflow-hidden">
                <div className=" rounded-lg px-4 py-3 bg-home space-y-2 sm:p-6">
                  <div className="contents text-base text-white uppercase">
                    <p className="text-center mt-3 mb-4">EDIT CATEGORY</p>

                  <div className="overflow-auto">
                    <table className=" text-center mt-3 mb-5">
                      {state &&
                        state.map((x) => (
                          <tr className="w-full justify-center">
                            <td>
                              <p className="text-white text-left mt-2">
                                {x.category_name}
                              </p>
                            </td>

                            <td>
                              <button
                                className="inline-flex justify-center mt-2 py-.5 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                role="button"
                                onClick={() => {
                                  dispatch(setCurrentCategory(x.category_name));
                                  navigate(`/admin/editAnyCategory/${x.id_category}`, {
                                    state: x.category_name,
                                  });
                                }}
                              >
                                EDIT
                              </button>
                            </td>
                              {/* -----------Toggle button------------------ */}
                            <td>
                            <div onClick={()=>toggleCategory(x.id_category,x.isShow == 1 ? 0 : 1)} 
                                className={classNames(
                                  "flex w-20 h-10 bg-gray-600 m-10 rounded-full transition-all duration-500"
                                  ,{
                                'bg-green-500' : x.isShow == 1 ? true : false,
                            })}>
                              <span className={classNames(
                                'h-10 w-10 bg-white rounded-full transition-all duration-500'
                                ,{
                                'ml-10' : x.isShow == 1 ? true : false,
                              })}/>
                            </div>
                            </td>
                              {/* ---------------End Toggle------------- */}
                            <td>
                              <button
                                className="inline-flex justify-center mt-2 py-.5 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={(e)=>{handelDel(x.id_category);
                            }}
                              >
                                DELETE
                              </button>
                            </td>
                          </tr>
                        ))}
                    </table>
                    </div>  
                  </div>

                  <div className="px-2 py-3 bg-home text-center sm:px-6">
                    
                    <Link to={"/admin/addCategory"}>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      ADD NEW CATEGORY
                    </button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarAdminFooter />
    </div>
  );
};

export default EditCategory;
