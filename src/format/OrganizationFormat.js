import React from 'react';
import { useSelector } from 'react-redux';

import Format from './Format';

const OrganizationFormat = ({ children, ...props }) => {
  const { originationTypes } = useSelector(state => state.lookups);
  const organization = originationTypes?.find(org => parseInt(children) === parseInt(org.origination_type_id)) || {}

  return (
    <Format {...props}>{organization.origination_type}</Format>
  )
}

export default OrganizationFormat
