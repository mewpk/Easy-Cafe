import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavbarAdminHead from "../../layout/navbarAdminHead";
import NavbarAdminFooter from "../../layout/navbarAdminFooter";

function AddCategory() {
  const [category_name, setCategory] = useState("");
  let Navigate = useNavigate();

  const handleSubmit = async (event) => {
    // event.preventDefault();

    const formData = new FormData();
    formData.append("category_name", category_name);
    console.log("formData1", formData);
    console.log("category name" + category_name);

    let result = await axios.post("admins/category/add", formData);
    console.log("result", result.data);
    // if (result.status === 200) {
    // Navigate("/editCategory");
    // }
  };

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
                      <label
                        for="category_name"
                        class="block text-sm font-medium text-gray-300"
                      >
                        Category Name
                      </label>

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
                      {/* <Link to={'/editCategory'}> */}
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // onClick={() => {navigate('/editCategory');}}
                      >
                        ADD
                      </button>
                      {/* </Link> */}
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

export default AddCategory;
