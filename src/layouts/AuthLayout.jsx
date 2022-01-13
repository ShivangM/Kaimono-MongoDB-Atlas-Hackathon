import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="wrapper">
        <div className="auth-brand">
          <Link to="/">
            <img
              className="logo"
              src="https://i.ibb.co/zNJ1p6d/KAImono-1920-x-720-px.png"
              alt="Kaimono Logo"
            />
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
