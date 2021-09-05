import {
  faHome,
  faListAlt,
  faSignOutAlt,
  faTable,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "../notfound";
import Dashboard from "./pagesAdmin/dashboard";
import Dataset from "./pagesAdmin/dataset";
import "./style.css";

const Admin = () => {
  const urlAdmin = [
    {
      name: "Dashboard",
      link: "/",
      route: <Dashboard />,
      icon: faHome,
    },
    {
      name: "Dataset",
      link: "/dataset",
      route: <Dataset />,
      icon: faListAlt,
    },
    {
      name: "Hasil Pelatihan",
      link: "/hasil-pelatihan",
      route: <div>ini Hasil Pelatihan</div>,
      icon: faTable,
    },
    {
      name: "Hasil Pengujian",
      link: "/hasil-pengujian",
      route: <div>ini Hasil Pengujian</div>,
      icon: faTasks,
    },
  ];

  return (
    <Router basename="/admin">
      <div className="bg-default admin-wrapper">
        <div className="admin-aside">
          <Link to="/" className="title">
            <span className="not-mobile mx-3">De-Clickbait</span>
            <span className="is-mobile mx-3">DC</span>
          </Link>
          <div
            style={{
              height: 20,
            }}
          />
          <div>
            <ul
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              {urlAdmin.map((element) => (
                <li
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    marginBottom: 15,
                  }}
                >
                  <Link className="menu-list" to={element.link}>
                    <FontAwesomeIcon
                      icon={element.icon}
                      size="lg"
                      className="mx-3"
                    />
                    <span className="not-mobile">{element.name}</span>
                  </Link>
                </li>
              ))}
              <li
                style={{
                  listStyleType: "none",
                  padding: 0,
                  margin: 0,
                  marginBottom: 15,
                }}
              >
                <Link className="menu-list" to="/">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="lg"
                    className="mx-3"
                  />
                  <span className="not-mobile">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="admin-main">
          <Switch>
            {urlAdmin.map((element) =>
              element.link === "/" ? (
                <Route path={element.link} exact>{element.route}</Route>
              ) : (
                <Route path={element.link}>{element.route}</Route>
              )
            )}

            <Route path="*">
              <NotFound link="/" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Admin;
