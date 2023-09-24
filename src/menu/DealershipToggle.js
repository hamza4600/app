import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { sessionActions } from 'actions.js';
import { ENDPOINTS } from 'endpoints.js';
import { apiFetch } from 'functions.js';

import Collapse from 'collapse/Collapse';
import { lookupOptions } from 'form/helpers/lookupOptions';

const MenuDealerships = ({
  organization_id,
  options,
  changeDealership,
  onResize,
  toggleClose
}) => {

  const { label } = options.find(option => option.value === organization_id) || {};

  const handleClick = ({ label, value }) => {
    toggleClose();

    console.log(organization_id)

    const args = {
      method: 'POST',
      endpoint: ENDPOINTS.session.changeDealership,
      params: {
        organization_id: value
      },
      onSuccess: changeDealership,
      successMessage: `Dealership changed to ${label}.`,
      errorMessage: `Unable to change dealership to ${label}.`
    }

    apiFetch(args);
  }

  return label ? (
    <Collapse
      label={label}
      Wrapper={({ children }) => <div className="px-2 border-top-thick border-bottom">{children}</div>}
      onEntered={onResize}
      onExited={onResize}
    >
      <ListGroup variant="flush" className="my-n1">
        {options.map((option, i) => option.value !== organization_id ? (
          <ListGroup.Item
            key={i}
            action
            className="d-flex w-auto py-1 px-2 mx-n2 align-items-center bg-transparent border-0"
            onClick={() => handleClick(option)}
          >{option.label}</ListGroup.Item>
        ) : null)}
      </ListGroup>
    </Collapse>
  ) : null;
}
export default compose(
  lookupOptions,
  connect(
    ({ user: { organization_id } }) => ({ organization_id }),
    ({ ...sessionActions })
  )
)(MenuDealerships)
