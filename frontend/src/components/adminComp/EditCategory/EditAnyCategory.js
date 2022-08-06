import React from "react";
import { useState } from "react";
import axios from "axios";
import NavbarAdminHead from "../../layout/navbarAdminHead";
import NavbarAdminFooter from "../../layout/navbarAdminFooter";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate} from "react-router-dom";
import { initEditCate } from "../cateEditSlice";
import ToggleCategory from "./ToggleCategory";

function EditAnyCategory() {
  const [category_name, setCategory] = useState("");
  let location = useLocation();
  const { pageCat } = useParams();
  const state = useSelector((state) => state.anycate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // event.preventDefault();
    
    const formData = new FormData();
    formData.append("category_name", category_name);
    // console.log("formData",formData);
    // console.log("category name" + category_name);
    await axios.put(`/admins/category/edit/${pageCat}`, formData);
    console.log("formData", formData);
      navigate("/admin/editCategory");
 
  };

  useEffect(() => {
    console.log("pageCat", pageCat);

    const initFunc = async () => {
      // console.log("state",);
      let result = await axios.get(`/admins/category/edit/${pageCat}`);
      // console.log("result", result.data[0].category_name);
      if (result.status === 200) {
        dispatch(initEditCate(result.data));
        
      }
    };
    initFunc();
    

  }, [pageCat]);

  // console.log('cate_name',state.anycate);

  return (
    <div>
      <NavbarAdminHead />
      <div className="flex justify-center mt-24">
        <div className="mt-2 sm:mt-0 w-full px-2.5 pt-7 ">
          <div className="md:grid md:grid-cols-1 md:gap-1">
            <div className="mt-2 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit} className="mt-2 md:mt-0">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 rounded-lg opacity-90 bg-home space-y-2 sm:p-6">
                    <div className="col-span-6 sm:col-span-3 uppercase">
                      {state.anycate &&
                        state.anycate.map((x, index) => (
                          <div class="text-white font-medium">                            
                              {x.category_name}
                          </div>
                        ))}

                      <input
                        onChange={(e) => setCategory(e.target.value)}
                        type="text"
                        name="category_name"
                        id="category_name"
                        autocomplete="given-name"
                        class="mt-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="flex item-center justify-center pt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <NavbarAdminFooter />
    </div>
  );
}

export default EditAnyCategory;
