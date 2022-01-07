import React from "react";
import { Link } from "react-router-dom";
import PageComponent from "../../components/common/Page.Component";
import { Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { logOut } from "../../stores/user/action";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logOut())
  };
  return (
    <PageComponent title="Dashboard app">
      <div>DashboardPage</div>
      <br />
      <Link to="/">Landing Page</Link>
      <br />
      <Button onClick={logout}>Logout</Button>
    </PageComponent>
  );
}
