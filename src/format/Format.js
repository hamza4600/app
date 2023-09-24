import React from 'react';

import ActiveFormat from './ActiveFormat';
import AgeFormat from './AgeFormat';
import CheckFormat from './CheckFormat';
import DateFormat from './DateFormat';
import NumberFormat from './NumberFormat';
import EventFormat from './EventFormat';
import OrganizationFormat from './OrganizationFormat';

const Format = ({
  children,
  className,
  before = '',
  after = ''
}) => (
  className ? <span className={className}>{before}{children}{after}</span> : <>{before}{children}{after}</>
)


Format.Active       = ActiveFormat;
Format.Age          = AgeFormat;
Format.Check        = CheckFormat;
Format.Date         = DateFormat;
Format.Number       = NumberFormat;
Format.Event        = EventFormat;
Format.Organization = OrganizationFormat;

export default Format;
