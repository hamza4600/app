import React from 'react';

import Badge from 'badge/Badge';
import { directoryRouter } from 'helpers/directoryRouter';
import MenuToggle from 'menu/MenuToggle';
import Title from 'title/Title';

const Header = ({ tools, ...props }) => (
  <header id="page-header" className="d-flex align-items-center mb-2 w-100">
    <MenuToggle />
    <Title className="d-inline-block my-1 mx-2" {...props} />
    <Badge.Summary {...props} />
    {tools.map((Tool, i) => <Tool key={i} {...props} />)}
  </header>
)

export default directoryRouter(Header)
