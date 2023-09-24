import React from 'react';

import Format from './Format';

const DateFormat = ({ children, ...props }) => (
  <Format {...props}>
    {children.split(/ (.+)/).map((part, i) => part ? (
      <span key={i} className="d-inline-block">
        {i > 0 &&
          <>&nbsp;</>
        }
        {part}
      </span>
    ) : null)}
  </Format>
)

export default DateFormat
