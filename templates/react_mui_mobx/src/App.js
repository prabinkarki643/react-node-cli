import React from "react";
import AppThemeProvider from "./themes";
import ScrollToTopComponent from "./components/common/ScrollToTop.Component";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
import { rootStore, StoreProvider } from "./stores";

function App() {
  return (
    <StoreProvider value={rootStore} displayName="MobxStoreContext">
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
    </StoreProvider>
  );
}

export default App;
