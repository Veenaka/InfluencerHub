import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import ParseJwt from "../../utilities/ParseJwt";
import { useState, useEffect } from "react";
import styles from "../../styles/styles.module.css";
//import FontAwesomeIcon from '@fortawesome/react-fontawesome'

function Menu(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [fname, setUserName] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const user = ParseJwt(userToken);
    if (userToken) {
      const response = axios
        .get(`${process.env.REACT_APP_BASEURL}/api/useraccounts/${user._id}`)
        .then((res) => {
          setUserName(res.data.firstName);
        });
      if (response.staus !== "ok") {
        setUserName("Admin");
      }
    }
  }, []);

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#46B47F" }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand>
            <Link
              to="/dashboard"
              className="text-decoration-none text-light"
              style={{ color: "#f0f0f0" }}
            >
              InfluencerHub
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/dashboard" className={styles.menu_item}>
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/allUsers" className={styles.menu_item}>
                  {" "}
                  All Users
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/newUsers" className={styles.menu_item}>
                  New Users
                </Link>
              </Nav.Link>
              <Navbar.Collapse>
                <Nav>
                  <NavDropdown
                    className="text-light"
                    title="Reports"
                    menuVariant="light"
                  >
                    <NavDropdown.Item>
                      <Link
                        to="/accountReports"
                        className="text-decoration-none text-dark"
                      >
                        Account Reports
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link
                        to="/commentReports"
                        className="text-decoration-none text-dark"
                      >
                        Comment Reports
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              <Nav.Link>
                <Link to="/suspendedUsers" className={styles.menu_item}>
                  Suspended Users
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/adminSettings" className={styles.menu_item}>
                  Settings
                </Link>
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>
                <Link to="/" className={styles.menu_item}>
                  Log out
                </Link>
              </Nav.Link>
            </Nav>
            <Navbar.Brand Style={"padding:0px 0px 0px 450px; color:#f0f0f0"}>
              <Link
                to={"/editaccount"}
                className="text-decoration-none text-light"
              >
                {fname}
              </Link>
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Menu;
