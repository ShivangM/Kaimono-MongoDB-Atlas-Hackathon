import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>
        &copy; {currentYear} <strong>Kaimono</strong> - Online Grocery Store
      </p>
    </footer>
  );
};

export default Footer;
