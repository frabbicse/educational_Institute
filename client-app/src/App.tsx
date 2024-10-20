import React, { Fragment, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./features/home/HomePage";
import { NavBar } from "./features/nav/NavBar";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import "./App.css";
import LoginForm from "./features/user/LoginForm";
import NotFound from "./layout/NotFound";
import { Dashboard } from "./features/dashboard/Dashboard";
import { Contact } from "./features/contact/Contact";
import { RootStoreContext } from "./stores/rootStore";
import { LoadingComponent } from "./layout/LoadingComponent";
import ModalContainer from "./common/modals/ModalContainer";
import RegisterForm from "./features/user/RegisterForm";

export const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  // if (!appLoaded) return <LoadingComponent content="Loading ap....." />;

  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      {/* <Route path="/" element={<HomePage />} /> */}

      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};

export default observer(App);
