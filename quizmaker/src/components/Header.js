import React, { useEffect } from "react";
import {
  Navbar,
  Button,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      {userInfo ? (
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">QuizMaker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
                <Nav.Link href="/create">Create</Nav.Link>
                <Nav.Link href="/myquiz">My Quizzes</Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </Nav>
              {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
            </Navbar.Collapse>
          </Navbar>
        </div>
      ) : (
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">QuizMaker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
              {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
            </Navbar.Collapse>
          </Navbar>
        </div>
      )}
    </div>
  );
};

export default Header;
