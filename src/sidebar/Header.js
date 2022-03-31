import React from "react";

import Logo from "../common/Logo";
import commonStyles from "../common/common.module.css";

function Header({ toggleSidebar, genres }) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <Logo />
      <div
        role="button"
        className={`${commonStyles.button}`}
        onClick={() => toggleSidebar()}
      >
        <i className="bi bi-x fs-4"></i>
      </div>
    </div>
  );
}

export default Header;
