import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageComponent from "../components/common/Page.Component";
import { getIsLoggedIn } from "../stores/user/selectors";

function LandingPage() {
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: getIsLoggedIn(state),
    };
  });
  return (
    <PageComponent title="App Name">
      <div>LandingPage</div>
      <br />
      {isLoggedIn ? (
        <Link to="/dashboard">Dashboard</Link>
      ) : (
        <Link to="/auth">Login</Link>
      )}
    </PageComponent>
  );
}

export default LandingPage;
