import React, { useCallback, useEffect, useState } from 'react';

import { BREAKPOINTS } from 'globals.js';

import { isAdmin } from 'functions.js';

import RecordItem from './RecordItem';
import RecordToolbar from './RecordToolbar';
import Table from 'table/Table';

import { STEPS_ADMIN, STEPS_USER } from 'directories.js'

const RecordList = ({
  actions,
  records: {
    list = [],
    total
  },
  ...props
}) => {
  const STEPS = isAdmin() ? STEPS_ADMIN : STEPS_USER;

  const { endpoints } = props;
  const buttons = [];
  if (actions) buttons.push(...actions);
  if (endpoints.save) buttons.push(STEPS.edit);
  else if (endpoints.get) buttons.push(STEPS.view);
  if (endpoints.delete) buttons.push(STEPS.delete);

  const [ mobile, setMobile ] = useState(undefined);

  const checkMobile = useCallback(
    () => setMobile(window.innerWidth < BREAKPOINTS.md),
    [setMobile]
  )

  useEffect(
    () => {
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    },
    [checkMobile]
  )

  if (mobile === undefined) return null;

  return mobile ? (
    <div className="w-100 mb-n1">
      <RecordToolbar {...props} records={list} total={total} />
      {list.map((record, i) => (
        <RecordItem {...props} key={i} record={record} buttons={buttons} />
      ))}
    </div>
  ) : (
    <Table {...props} records={list} total={total} buttons={buttons} />
  )
}

export default RecordList;
