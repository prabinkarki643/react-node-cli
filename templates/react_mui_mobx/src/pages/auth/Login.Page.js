import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PageComponent from "../../components/common/Page.Component";
import { getStore } from "../../stores";

export default function LoginPage() {
  const { sessionStore } = getStore();

  const loginUser = () => {
    sessionStore.setSession({
      user: { name: "Prabin" },
      token: "skdjskdjksdj",
    });
  };
  return (
    <PageComponent title="Login">
      <div>
        LoginPage
        <Link to="/auth/register">Go To Register</Link>
        <div>
          <Button onClick={loginUser}>Login</Button>
        </div>
      </div>
    </PageComponent>
  );
}
