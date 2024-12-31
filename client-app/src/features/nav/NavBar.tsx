import React, { useContext } from "react";
import { Menu, Container, Image, Dropdown, DropdownMenu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../stores/rootStore";

export const NavBar = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <Menu fixed="top" inverted>
      {user?.token && (
        <Container>
          <Menu.Item header as={Link} to="/dashboard">
            <img src="/assets/logo.jpg" alt="log" style={{ marginRight: "10px" }} /> Institute Name
          </Menu.Item>

          <Menu.Item as={Link} to="/contact" name="Contact" />
          <Dropdown item text="Setting">
            <DropdownMenu>
              <Menu.Item as={Link} to="/department" name="Department" />
              <Menu.Item as={Link} to="/course" name="Course" />
              <Menu.Item as={Link} to="/teacher" name="Teacher" />
              <Menu.Item as={Link} to="/assign-course" name="Assign Course" />
              <Menu.Item as={Link} to="/semester" name="Semester" />
              <Menu.Item as={Link} to="/student" name="Student" />
            </DropdownMenu>
          </Dropdown>

          {/* {user && ( */}
          <Menu.Item position="right">
            <Image avater spaced="right" src={user.image || "assets/user.png"} />
            <Dropdown pointing="top right" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/profile/username`} text="My Profile" icon="user" />

                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          {/* )} */}
        </Container>
      )}
    </Menu>
  );
};
