import React from "react";
import { Link } from "react-router-dom";
import PageComponent from "../../components/common/Page.Component";
import { Button } from "@mui/material";
import { getStore } from "../../stores";

export default function DashboardPage() {
  const logout = () => {
    const { sessionStore } = getStore();
    sessionStore.logOutSession();
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
