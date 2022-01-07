import React from "react";
import { Link } from "react-router-dom";
import PageComponent from "../components/common/Page.Component";
import { getStore } from "../stores";
import { observer } from 'mobx-react';

function LandingPage() {
  const {sessionStore}=getStore()
  return (
    <PageComponent title="App Name">
      <div>LandingPage</div>
      <br/>
      {
        sessionStore.isLoggedIn ? <Link to="/dashboard">Dashboard</Link> : <Link to="/auth">Login</Link> 
      }
    </PageComponent>
  );
}

export default observer(LandingPage)
