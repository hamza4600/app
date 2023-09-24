import React from 'react';
import clsx from 'clsx';

import { decodeSearch, updateSearch } from 'functions.js';

import RecordTools from './RecordTools';
import Form from 'form/Form';

import styles from './recordToolbar.module.scss';

const RecordToolbar = ({
  parentRecord,
  parentName,
  headerTools,
  tools,
  ...props
}) => {

  const {
    path,
    step,
    history,
    location,
    endpoints,
    title = {}
  } = props;

  const values = decodeSearch(location.search);

  return (
    <div id="record-toolbar">
      <div className="d-flex flex-wrap align-items-center">
      {!endpoints.parent ? (
          <>
            <RecordTools.Count {...props} className="mr-auto pr-2 mb-1 mb-md-2" />
            <div className={clsx(styles.actions, 'd-flex flex-wrap align-items-center mb-1 mb-md-2')}>
              {headerTools ? headerTools.map((Component, i) => (
                 <Component {...props} key={i} />
              )) : null}
              <RecordTools.Add {...props} />
            </div>
          </>
        ) : (
          <div>
            {title.single ? <h2>{title.single}</h2> : null}
            {parentRecord[parentName] ? <strong>{parentRecord[parentName]}</strong> : null}
          </div>
      )}
      </div>
      {tools &&
        <Form className="row align-items-center mb-md-2" enableReinitialize={false}>
          {tools.map((Component, i) => (
            <Component
              {...props}
              key={i}
              values={values}
              onChange={e => history.push({
                pathname: `/${path}/${step}`,
                search: updateSearch(location.search, e.target)
              })}
              size='sm'
            />
          ))}
        </Form>
      }
    </div>
  );
}

export default RecordToolbar
