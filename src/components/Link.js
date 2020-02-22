import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

export default function Link({ to, children, ...rest }) {

  const parseTo = (to) => {
    let parser = document.createElement('a');
    parser.href = to;
    return parser;
  }

  const isInternal = (to) => {
    // If it's a relative url such as '/path', 'path' and does not contain a protocol we can assume it is internal.
    if (to.indexOf("://") === -1) return true;

    const toLocation = parseTo(to);
    return window.location.hostname === toLocation.hostname;
  }

  if (isInternal(to)) {
    return (<ReactLink to={to} {...rest}>{children}</ReactLink>);
  } else {
    return (<a href={to} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>);
  }

}
