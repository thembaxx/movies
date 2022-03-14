import React from 'react';
import { Link } from 'react-router-dom';

import styles from './navLink.module.css';
import commonStyles from '../../common/common.module.css';

import Popup from './Popup';

function NavLink({
  name,
  route,
  routeBase,
  isPopup,
  responsive,
  items = null,
}) {
  const nav = (
    <div className={`${styles.link} ${commonStyles.link}`}>{name}</div>
  );

  let content;
  if (!isPopup) {
    content = <Link className={`${styles.container}`} to={route}>{nav}</Link>;
  } else {
    content = (
      <Popup items={items} routeBase={routeBase} responsive={responsive}>
        {
          <div className={`${styles.container}`}>
            <span>{nav}</span>
            <i className={`bi bi-caret-down-fill ${styles.popupIcon}`}></i>
          </div>
        }
      </Popup>
    );
  }

  return content;
}

export default NavLink;
