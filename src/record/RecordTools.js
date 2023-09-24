import React from 'react';

import { LOOKUPS } from 'lookups.js';
import { ROWS_ON_PAGE } from 'tables.js';

import AddRecordButton from './tools/AddRecordButton';
import RecordCount from './tools/RecordCount';
import SortRecordButton from './tools/SortRecordButton';
import SelectFilter from './tools/SelectFilter';
import Form from 'form/Form';

const RecordTools = {};

RecordTools.Add = AddRecordButton;
RecordTools.Count = RecordCount;
RecordTools.Sort = SortRecordButton;
RecordTools.Rows = props => (
  <SelectFilter
    {...props}
    name="rowsOnPage"
    label="Per Page"
    placeholder=""
    options={ROWS_ON_PAGE.options.map((num) => ({
      label: `${num} Rows`,
      value: num
    }))}
    defaultValue={ROWS_ON_PAGE.default}
    useBlank={false}
  />
)
RecordTools.Dealerships = props => (
  <SelectFilter
    {...props}
    name="dealershipStoreID"
    label="Dealership"
    lookup={LOOKUPS.dealerships}
  />
)
RecordTools.Privileges = props => (
  <SelectFilter
    {...props}
    name="userPrivilege"
    label="Privilege"
    lookup={LOOKUPS.privileges}
  />
)
RecordTools.Name = ({
  name = 'userName',
  onChange,
  values,
  ...props
}) => (
  <Form.Control
    {...props}
    name={name}
    defaultValue={values[name]}
    label="Search:"
    placeholder="Search by user name"
    icon={undefined}
    onClear={onChange}
    onKeyUp={e => e.keyCode === 13 ? onChange(e) : null}
    withClearButton
    formGroupClassName="col-xs-12 col-md d-flex align-items-center mb-1 mb-md-0"
    labelClassName="d-none d-sm-inline-block d-md-none mb-0 text-muted text-nowrap"
  />
)
RecordTools.EventType = props => (
  <SelectFilter
    {...props}
    name="eventType"
    label="Event Type"
    lookup={LOOKUPS.eventTypes}
  />
)
RecordTools.OriginationType = props => (
  <SelectFilter
    {...props}
    name="originationType"
    label="Source"
    lookup={LOOKUPS.originationTypes}
  />
)

export default RecordTools
