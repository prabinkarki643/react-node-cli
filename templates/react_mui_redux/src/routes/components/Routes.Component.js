import { Navigate, Outlet } from 'react-router-dom';

export function PrivateOutlet({isLoggedIn=false}) {
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth" />;
}

export function PrivateRoute({ children,isLoggedIn=false }) {
  return isLoggedIn ? children : <Navigate to="/auth" />;
}

export function PublicRoute({ children,isLoggedIn=false }) {
  return !isLoggedIn ? children : <Navigate to="/dashboard" />;
}
