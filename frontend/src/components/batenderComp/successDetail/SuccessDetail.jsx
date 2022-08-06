import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarBartenderFooter from "../../layout/navbarBartenderFooter";

const SuccessDetail = () => {
  const [orders, setOrders] = useState(null);
  const [show, setShow] = useState(null);
  const get = async () => {
    const res = await axios.get("bartenders/success");
    setOrders(res.data);
  };
  useEffect(() => {
    !orders ? get() : <></>;
  }, []);
  if (orders) {
    let results = orders.reduce(function (results, org) {
      (results[org.id_order] = results[org.id_order] || []).push(org);
      return results;
    }, {});
    // show.push(results)
    const entries = Object.values(results);
    if (!show) {
      setShow(entries);
    }

    console.log(show);
  }

  return (
    <div>
      <div
        style={{
          paddingTop: "100px",
          padding: "10px",
          paddingBottom: "100px",
          marginTop: "90px",
        }}
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
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-6 rounded-lg bg-home space-y-2 sm:p-6">
                        <fieldset>
                          <legend className="font-large mt-2 text-white text-left">
                            Order No. {x[0].id_order}
                          </legend>

                          <div className="mb-3">
                            <p className="text-xs text-white text-right">
                              {x[0].at_date}
                            </p>
                          </div>

                          <table
                            style={{
                              width: "100%",
                              margin: "0px auto",
                              marginBottom: "30px",
                            }}
                          >
                            <tr>
                              <th
                                style={{ color: "white", textAlign: "center" }}
                              >
                                ลำดับ
                              </th>
                              <th
                                style={{ color: "white", textAlign: "center" }}
                              >
                                รายการ
                              </th>
                              <th
                                style={{ color: "white", textAlign: "center" }}
                              >
                                ประเภท
                              </th>
                              <th
                                style={{ color: "white", textAlign: "center" }}
                              >
                                จำนวน
                              </th>
                            </tr>
                            {x.map((x, index) => (
                              <>
                                <tr>
                                  <td
                                    style={{
                                      color: "white",
                                      textAlign: "center",
                                    }}
                                  >
                                    {index + 1}
                                  </td>
                                  <td
                                    style={{
                                      color: "white",
                                      textAlign: "center",
                                    }}
                                  >
                                    {x.product_name}
                                  </td>
                                  <td
                                    style={{
                                      color: "white",
                                      textAlign: "center",
                                    }}
                                  >
                                    {x.type}
                                  </td>
                                  <td
                                    style={{
                                      color: "white",
                                      textAlign: "center",
                                    }}
                                  >
                                    {x.amount}
                                  </td>
                                </tr>
                              </>
                            ))}
                          </table>
                        </fieldset>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
      </div>
      <NavbarBartenderFooter />
    </div>
  );
};

export default SuccessDetail;
