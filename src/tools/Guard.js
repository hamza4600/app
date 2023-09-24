import React from 'react';

import { getRole } from 'functions.js';

export default function Guard({ children, role }) {
  const userRole = getRole();
  return userRole === role ? <>{children}</> : null;
}
