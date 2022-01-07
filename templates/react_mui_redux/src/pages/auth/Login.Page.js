import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PageComponent from "../../components/common/Page.Component";
import { setCurrentUser } from "../../stores/user/action";

export default function LoginPage() {
  const dispatch = useDispatch();

  const loginUser = () => {
    dispatch(setCurrentUser({
      user: { name: "Prabin" },
      token: "skdjskdjksdj",
    }))
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
