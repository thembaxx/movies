import React from 'react';
import { socialLinks } from '../constants';

import SocialLink from './SocialLink';

function Social() {
  return (
    <nav className="d-flex py-2">
      {socialLinks.map((item, index) => (
        <SocialLink
          key={index}
          icon={item.icon}
          link={item.link}
          name={item.name}
        />
      ))}
    </nav>
  );
}

export default Social;
