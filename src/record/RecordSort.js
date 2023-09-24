import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { generatePath } from 'react-router'
import { Card, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { List, arrayMove } from 'react-movable';

import { apiFetch, decodeSearch, updateSearch } from 'functions.js';

import Form from 'form/Form';
import Button from 'button/Button';
import Sprite from 'graphics/Sprite';

import styles from './recordSort.module.scss';

const RecordSort = ({
  endpoints,
  history,
  location,
  name,
  path,
  params,
  records: {
    list = []
  },
  sort: {
    tools
  } = {},
  title,
  refetchRecords,
  ...props
}) => {
  const values = decodeSearch(location.search);

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(list);
  }, [list, setItems])

  const goBack = useCallback(
    () => history.push(`/${generatePath(path, params)}/list`),
    [history, params, path]
  )

  const handleSort = ({ oldIndex, newIndex }) => {
    const args = {
      method: 'PUT',
      endpoint: endpoints.sort(),
      params: {
        event_type_id: values.eventType,
        sort_order: newIndex + 1,
        event_action_type_id: items[oldIndex].event_action_type_id
      },
      loadingMessage: 'Updating sort order',
      onComplete: () => refetchRecords({ loadingMessage: null }),
      errorMessage: 'Unable to update sort order.'
    }

    setItems(arrayMove(items, oldIndex, newIndex));

    apiFetch(args);
  };

  return (
    <Card className={clsx(styles.card, 'p-1 py-md-3 px-md-2 w-100')}>
      <div className="d-flex flex-wrap align-items-center">
        <div className="d-flex align-items-center mr-auto pr-2 mb-1">
          <h2 className={clsx(styles.title, 'mb-0')}>Sort {title.plural ? title.plural : ''}</h2>
          <OverlayTrigger
            overlay={<Tooltip>Drag to change sort order</Tooltip>}
          >
            <span>
              <Sprite use="info-circle" />
            </span>
          </OverlayTrigger>
        </div>
        <Button.Back
          className={clsx(styles.back, 'mb-1')}
          size="sm"
          block={false}
          onClick={goBack}
        />
      </div>
      {tools &&
        <Form className="row align-items-center" enableReinitialize={false}>
          {tools.map((Component, i) => (
            <Component
              {...props}
              key={i}
              values={values}
              onChange={e => history.push({
                search: updateSearch(location.search, e.target)
              })}
              size='sm'
              formGroup={{
                className: styles.select
              }}
            />
          ))}
        </Form>
      }
      <List
        values={items}
        onChange={handleSort}
        renderList={Table}
        renderItem={p => <Row key={p.props.key} {...p} valueKey={name} />}
      />
    </Card>
  );
}

function Table({ children, props }) {
  return (
    <div {...props} className="table d-flex flex-column flex-grow-1 w-100 mb-0 bg-light">{children}</div>
  )
}

function Row({ value, props, isDragged, valueKey }) {
  return (
    <ListGroup {...props} variant="flush" className={clsx(styles.item, isDragged && styles.dragging)}>
      <ListGroup.Item className={clsx('d-flex align-items-center p-1 mb-0 border-top-0', !isDragged && 'border-bottom')}>
        <Sprite use="drag" className={clsx(styles.icon, 'mr-1 text-gray-light')} />
        {value[valueKey]}
      </ListGroup.Item>
    </ListGroup>
  )
}

export default RecordSort;
