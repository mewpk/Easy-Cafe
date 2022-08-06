import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDetail = () => {
  const navigate = useNavigate();

  return (
  <div className="bg-admin">
  <div>
    <button
      style={{
        background: "green",
        color: "white",
        border: "1px solid white",
        padding: "10px 30px",
        borderRadius: "10px",
      }}
      onClick={() => navigate("/admin/coffee")}
    >
      START APP
    </button>
  </div>
</div>
)
};

export default AdminDetail;
