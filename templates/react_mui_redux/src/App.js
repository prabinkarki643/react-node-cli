import React from "react";
import AppThemeProvider from "./themes";
import ScrollToTopComponent from "./components/common/ScrollToTop.Component";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
import {rootStore,ReduxProvider} from "./stores";
function App() {
  return (
    <ReduxProvider store={rootStore}>
      <AppThemeProvider>
        <ScrollToTopComponent />
        <Router />
        <ToastContainer
          position="top-center"
          newestOnTop
          hideProgressBar
          autoClose={3000}
          pauseOnFocusLoss={false}
        />
      </AppThemeProvider>
    </ReduxProvider>
  );
}

export default App;
