import React from 'react';
import { useSelector } from 'react-redux';

import Format from './Format';

const EventFormat = ({ children, ...props }) => {
  const { eventTypes } = useSelector(state => state.lookups);
  const event = eventTypes?.find(eve => parseInt(children) === parseInt(eve.event_type_id)) || {}

  return (
    <Format {...props}>{event.event_type}</Format>
  )
}

export default EventFormat
