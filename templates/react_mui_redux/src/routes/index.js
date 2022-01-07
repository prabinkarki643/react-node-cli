import { Navigate, useRoutes } from "react-router-dom";
import LandingPage from "../pages/Landing.Page";
import Page404 from "../pages/404.Page";
import DashboardLayout from "./layouts/Dashboard.Layout";
import { PrivateRoute, PublicRoute } from "./components/Routes.Component";
import DashboardPage from "../pages/dashboard/Dashboard.Page";
import AuthLayout from "./layouts/Auth.Layout";
import LoginPage from "../pages/auth/Login.Page";
import RegisterPage from "../pages/auth/Register.Page";
import UserPage from "../pages/dashboard/User.Page";
import { observer } from "mobx-react";
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../stores/user/selectors';

function Router() {
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: getIsLoggedIn(state),
    };
  });
  console.log("isLoggedIn", isLoggedIn);
  return useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/404", element: <Page404 /> },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Navigate to="/dashboard/app" replace />,
        },
        { path: "app", element: <DashboardPage /> },
        { path: "user", element: <UserPage /> },
      ],
    },
    {
      path: "/auth",
      element: (
        <PublicRoute isLoggedIn={isLoggedIn}>
          <AuthLayout />
        </PublicRoute>
      ),
      children: [
        { path: "/auth", element: <Navigate to="/auth/login" replace /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

export default observer(Router);
