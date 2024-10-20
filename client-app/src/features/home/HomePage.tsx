import React, { useContext, Fragment } from "react";
import { Segment, Container, Header, Image, Button } from "semantic-ui-react";
import { Link, Route, useNavigate } from "react-router-dom";
import { RootStoreContext } from "../../stores/rootStore";
import { Dashboard } from "../dashboard/Dashboard";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

export const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  const navigate = useNavigate();
  function toLoginPage() {
    navigate("/login");
  }

  function toRegistrationPage() {
    navigate("/register");
  }

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/logo-2.jpg" alt="logo" style={{ marginBottom: 12 }} />
          Educational Institute Solution
        </Header>
        <Header />
        {isLoggedIn && user ? (
          <>
            <Header as="h2" inverted content={`Welcome to Solution${user.displayName}`} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Header as="h2" inverted content="Welcome to Solution" />
            <Button onClick={toLoginPage} size="huge" inverted>
              Login
            </Button>

            <Button onClick={toRegistrationPage} size="huge" inverted>
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};
