import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import NavbarAdminFooter from '../../layout/navbarAdminFooter';
import NavbarAdminHead from '../../layout/navbarAdminHead';



function AddProduct() {
    

  //ดึง category_name redux category ที่ categorySlice
  let state = useSelector((state)=>state.category.categoryAll);
 

  const [product_name,setName] = useState('');
  const [product_photo,setPhoto] = useState('');
  const [id_category,setCategory] = useState(1);
  const [hot_price,setHot] = useState();
  const [iced_price,setIced] = useState();
  const [frappe_price,setFrappe] = useState();

  const handleSubmit = async event =>{
  // event.preventDefault();
  // console.log(event.target.category.value);

  //สร้างก้อน formData เก็บค่ามาจาก element โดย useState เพื่อส่งให้Backend
  const formData = new FormData();    
    formData.append("product_name",product_name);
    formData.append("product_photo",product_photo);
    formData.append("id_category",id_category);
    formData.append('hot_price',hot_price);
    formData.append('iced_price',iced_price);
    formData.append('frappe_price',frappe_price);
  // console.log(formData);
  // console.log("id_category", id_category);



//ส่งข้อมูล formData ให้ backend
  await axios.post("admins/product/add",formData);
  window.location.href='/admin/coffee';
  
  
}

console.log(id_category);

  return (
<div>
<NavbarAdminHead/>
    {/* // <div style={{ paddingTop: "100px", padding: "10px"}}> */}
      <div className="flex justify-center mt-24">
        <div className="mt-2 sm:mt-0 w-full px-2.5 pt-7">
          <div className="md:grid md:grid-cols-1 md:gap-1">
            <div className="mt-2 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit} className="mt-2 md:mt-0">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 rounded-lg opacity-90 bg-home space-y-2 sm:p-6">
                      
                      <div className='flex justify-center text-white uppercase'>
                        <p className=''>Add Product</p>
                      </div>

                      {/* <div className="contents text-xl font-large text-white uppercase"> */}
                          <div class="col-span-6 sm:col-span-3 mt-4">
                            <label for="product-name" class="block text-sm font-medium text-gray-300">Product Name</label>
                            <input onChange={(e)=>setName(e.target.value)} type="text" name="product-name" id="product-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                          </div>

                            <div>
                            <label class="block mb-2 text-sm font-medium text-gray-300 " for="file_input">Upload Photo</label>
                            <input accept="image/png, image/gif, image/jpeg" 
                            onChange={(e)=>setPhoto(e.target.files[0])} 
                            class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                            aria-describedby="file_input_help" id="file_input" type="file"/>
                            {/* input file    /  accept เพื่อกำหนดประเภทไฟล์              /        รับค่าข้อมูลกลับมาเป็น .files */}
                          </div>

                          <br></br>           
                          <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                              <select name="category"
                                  onChange={e => setCategory(e.target.value)}
                                  class="form-select appearance-none
                                  block
                                  w-full
                                  px-3
                                  py-1.5
                                  text-base
                                  font-normal
                                  text-gray-700
                                  bg-white bg-clip-padding bg-no-repeat
                                  border border-solid border-gray-300
                                  rounded
                                  transition
                                  ease-in-out
                                  m-0
                                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                    {state.map((x)=>(
                                      <option value={x.id_category}>{x.category_name}</option>
                                    ))}
                                    
                                </select>
                            </div>
                          </div>
                       
                          <div class="col-span-6 sm:col-span-3 ">
                            <label for="hot-price" class="block text-sm font-medium text-gray-300">Hot Price</label>
                            <input onChange={(e)=>setHot(e.target.value)} type="text" name="hot-price" id="hot-price" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                          </div>
                          
                        
                          <div class="col-span-6 sm:col-span-3 ">
                            <label for="iced-price" class="block text-sm font-medium text-gray-300">Iced Price</label>
                            <input onChange={(e)=>setIced(e.target.value)} type="text" name="iced-price" id="iced-price" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                          </div>
                        
                          <div class="col-span-6 sm:col-span-3 ">
                            <label for="frappe-price" class="block text-sm font-medium text-gray-300">Frappe Price</label>
                            <input onChange={(e)=>setFrappe(e.target.value)} type="text" name="frappe-price" id="frappe-price" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                          </div>
                          <br></br>
                          <div class="flex item-center justify-center pt-1">
                            <button type='submit' className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              ADD
                            </button>
                          </div>
                        
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      
  </div>
  <NavbarAdminFooter/>
</div>
  )
}

export default AddProduct;
