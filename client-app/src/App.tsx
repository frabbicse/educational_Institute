import React, { Fragment, useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import DepartmentDashboard from "./features/departments/DepartmentDashboard";
import Course from "./features/Course/Course";
import Semester from "./features/semester/Semester";
import Teacher from "./features/teacher/Teacher";
import ProtectedRoute from "./features/ProtectedRoute";
import CourseAssign from "./features/course assign to teacher/CourseAssign";
import Student from "./features/student/Student";
import "react-widgets/styles.css";
 

export const App = () => {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser, loginState } = rootStore.userStore;

  useEffect(() => {
    rootStore.commonStore.setNavigate(navigate); // Set navigate globally
  }, [navigate, rootStore]);

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
      loginState();
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token, loginState]);

  // if (!appLoaded) return <LoadingComponent content="Loading ap....." />;

  return (
    <>
      {/* <ModalContainer /> */}
      <ToastContainer position="bottom-right" />
      {/* <Route path="/" element={<HomePage />} /> */}

      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/department" element={<DepartmentDashboard />} />
            <Route path="/course" element={<Course />} />
            <Route path="/semester" element={<Semester />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/assign-course" element={<CourseAssign />} />
            <Route path="/student" element={<Student />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
};

export default observer(App);
