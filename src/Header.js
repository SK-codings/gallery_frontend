import { useEffect, useState } from "react";
import logo192 from "./logo192.png";
const Header = ({ isuser }) => {
  const [loggeduser, setLoggeduser] = useState();
  useEffect(() => {
    setLoggeduser(localStorage.getItem("galleryProfile"));
  }, [loggeduser]);
  const handleLogout = () => {
    localStorage.removeItem("galleryProfile");
    setLoggeduser("");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={logo192}
            alt="logo"
            style={{ width: "70px", height: "70px" }}
          />
          Gallery App
        </a>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {!loggeduser & !isuser ? (
            <>
              <a href="/signin">
                <button className="btn btn-light " style={{ padding: "5px" }}>
                  Login
                </button>
              </a>
            </>
          ) : (
            <button
              className="btn btn-light"
              onClick={() => handleLogout()}
              style={{ padding: "5px" }}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
