import React from "react";

import Logo from "../common/Logo";
import commonStyles from "../common/common.module.css";

function Header({ toggleSidebar, genres }) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <Logo genres={genres} />
      <div
        role="button"
        className={`${commonStyles.button}`}
        onClick={() => toggleSidebar()}
      >
        <i className="bi bi-x-lg fs-5"></i>
      </div>
    </div>
  );
}

export default Header;
