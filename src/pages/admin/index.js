import {
  faHome,
  faListAlt,
  faSignOutAlt,
  faTable,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import NotFound from "../notfound";
import Dashboard from "./pagesAdmin/dashboard";
import Dataset from "./pagesAdmin/dataset";
import Detail from "./pagesAdmin/detail";
import Pelatihan from "./pagesAdmin/pelatihan";
import Pengujian from "./pagesAdmin/pengujian";
import "./style.css";

const Admin = () => {
  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("user") ?? 0;
    if (user === 0) {
      history.push("../login");
    }
  });

  const HandleLogout = () => {
    swal({
      title: "Apakah anda yakin ingin logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("user");
        history.push("../login");
      }
    });
  };

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
      route: <Pelatihan />,
      icon: faTable,
    },
    {
      name: "Hasil Pengujian",
      link: "/hasil-pengujian",
      route: <Pengujian />,
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
              {urlAdmin.map((element, index) => (
                <li
                  key={index}
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
                key={99}
                style={{
                  listStyleType: "none",
                  padding: 0,
                  margin: 0,
                  marginBottom: 15,
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                  }}
                  className="menu-list"
                  onClick={() => HandleLogout()}
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="lg"
                    className="mx-3"
                  />
                  <span className="not-mobile">Logout</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="margin-main" />
        <div className="admin-main">
          <Switch>
            {urlAdmin.map((element, index) =>
              element.link === "/" ? (
                <Route key={index} path={element.link} exact>
                  {element.route}
                </Route>
              ) : (
                <Route key={99} path={element.link}>
                  {element.route}
                </Route>
              )
            )}
            <Route key={100} path="/detail">
              <Detail />
            </Route>
            <Route key={101} path="*">
              <NotFound link="/" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Admin;
