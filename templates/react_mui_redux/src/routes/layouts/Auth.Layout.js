import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <div>Logo</div>
      <div>Signup Link</div>
      <Outlet />
    </div>
  );
}
