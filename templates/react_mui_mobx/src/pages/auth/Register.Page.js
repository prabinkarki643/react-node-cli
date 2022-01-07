import React from "react";
import { Link } from "react-router-dom";
import PageComponent from "../../components/common/Page.Component";
import { getStore } from "../../stores";
import { Button } from "@mui/material";

export default function RegisterPage() {
  const { sessionStore } = getStore();

  const registerUser = () => {
    sessionStore.setSession({
      user: { name: "Prabin" },
      token: "sdhshjdhsjdsjd",
    });
  };
  return (
    <PageComponent title="Create account">
      <div>
        LoginPage
        <Link to="/auth/login">Go To Login</Link>
        <div>
          <Button onClick={registerUser}>Register</Button>
        </div>
      </div>
    </PageComponent>
  );
}
