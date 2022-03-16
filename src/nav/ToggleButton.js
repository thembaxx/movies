import React from 'react';
import commonStyles from '../common/common.module.css';

function ToggleButton({ target, toggleSidebar }) {
  return (
    <div
      className={`navbar-toggler ${commonStyles.button}`}
      role="button"
      data-bs-toggle="collapse"
      data-bs-target={`#${target}`}
      aria-controls={target}
      aria-expanded="false"
      aria-label="Toggle navigation"
      onClick={() => toggleSidebar()}
    >
      <i className="bi bi-list fs-5"></i>
    </div>
  );
}

export default ToggleButton;
