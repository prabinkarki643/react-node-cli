import React from "react";
import { Link } from "react-router-dom";
import PageComponent from "../../components/common/Page.Component";
import { Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from "../../stores/user/action";

export default function RegisterPage() {
  const dispatch = useDispatch();

  const registerUser = () => {
    dispatch(setCurrentUser({
      user: { name: "Prabin" },
      token: "skdjskdjksdj",
    }))
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
