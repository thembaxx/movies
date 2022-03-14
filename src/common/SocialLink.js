import React from 'react';

function SocialLink({ icon, link, name }) {
  return (
    <a rel="noreferrer" href={link} aria-label={name} className="fs-5 me-3" target="_blank">
      <div style={{ fontSize: '16px' }}>{icon}</div>
    </a>
  );
}

export default SocialLink;
