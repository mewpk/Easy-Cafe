import React, { useEffect, useState } from "react";
import axios from "axios";
import './Bartender.css'
import NavbarBartenderFooter from "../../layout/navbarBartenderFooter";
const querystring = require("querystring");


const BartenderDetail = () => {
  const [show, setShow] = useState(null);

  const get = async () => {
    const res = await axios.get("bartenders/home");

    let results = res.data.reduce(function (results, org) {
      (results[org.id_order] = results[org.id_order] || []).push(org);
      return results;
    }, {});

    const entries = Object.values(results);
    setShow(entries);

    // console.log(res.data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      get();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  //---------------------------------------
  const accept = async (id) => {
    // console.log("id", id);
    const res = await axios.put(`bartenders/home/process/accept/${id}`);
    const res2 = await axios.post(`/lineNotify/notify`, {
      status1: "accept",
      id,
    });
  };
  //---------------------------------------
  const processing = async (id) => {
    // console.log("id", id);
    const res = await axios.put(`bartenders/home/process/processing/${id}`);
    const res2 = await axios.post(`/lineNotify/notify`, {
      status1: "processing",
      id,
    });

    console.log(res);
  };
  //---------------------------------------

  const done = async (id) => {
    // console.log("id", id);
    const res = await axios.put(`bartenders/home/process/done/${id}`);
    // console.log(res);

    if (res.status === 200) {
      console.log("------");

      let clearDoneOrder = show.filter((x) => x[0].id_order != id);

      // if (clearDoneOrder.length > 0) {
      console.log("dd", clearDoneOrder);
      setShow(clearDoneOrder);
      const res2 = await axios.post(`/lineNotify/notify`, {
        status1: "done",
        id,
      });

      // }
    }
  };
  //---------------------------------------

  return (
    <div>
    <div
      style={{ paddingTop: "100px", padding: "10px", paddingBottom: "80px", marginTop: "90px" }}
    >
      {show &&
        show.map((x, index) => (
          <div className="mt-2 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-1">
              <div className="mt-2 md:mt-0 md:col-span-2">
                <form
                  action="#"
                // onSubmit={handleSubmit}
                >
                  <div className="shadow overflow-hidden rounded-lg">
                    <div className="px-4 py-6 bg-home space-y-2 sm:p-6">
                      <fieldset>
                        <legend className="font-large text-white text-left mt-2 mb-3" >
                          Order No. {x[0].id_order}
                        </legend>

                        <table style={{ width: "100%", margin: "0px auto" }}>

                          <tr>

                            <th style={{ color: "white", textAlign : "center" }}>
                              รายการ
                            </th>
                            <th style={{ color: "white", textAlign : "center" }}>
                              ประเภท
                            </th>
                            <th style={{ color: "white", textAlign : "center" }}>
                              จำนวน
                            </th>
                          </tr>
                          {
                            x.map((x, index) => (
                              <>
                                <tr>
                                  <td style={{ color: "white", textAlign : "center" }}>
                                    {x.product_name}
                                  </td>
                                  <td style={{ color: "white", textAlign : "center" }}>
                                    {x.type}
                                  </td>
                                  <td style={{ color: "white" , textAlign : "center"}}>
                                    {x.amount}
                                  </td>
                                </tr>
                              </>
                            ))
                          }
                        </table>

                      </fieldset>
                    </div>
                    <div className="px-4 py-3 bg-home text-center sm:px-6">
                      <button
                        
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      style={{ marginRight: "10px"}}
                      disabled={x[0].process !== "R"}
                        onClick={(e) => {
                          console.log("orderIsclick");
                          e.preventDefault();
                          accept(x[0].id_order);
                        }}
                      >
                        รับออเดอร์
                      </button>

                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        style={{ marginRight: "10px"}}
                        disabled={x[0].process !== "A"}
                        onClick={(e) => {
                          e.preventDefault();
                          processing(x[0].id_order);
                        }}
                      >
                        กำลังทำ
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        style={{ marginRight: "10px"}}
                        disabled={x[0].process !== "P"}
                        onClick={(e) => {
                          e.preventDefault();
                          done(x[0].id_order);
                        }}
                      >
                        เสร็จ
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
    </div>
   <NavbarBartenderFooter/>
    </div>
  );
};

export default BartenderDetail;