// SESSION

export const sessionActions = {
  login: response => ({
    type: 'LOGIN_USER',
    ...response
  }),
  logout: payload => ({
    type: 'LOGOUT_USER',
    payload
  }),
  extendSession: response => ({
    type: 'EXTEND_SESSION',
    ...response
  }),
  changeDealership: response => ({
    type: 'CHANGE_DEALERSHIP',
    ...response
  })
}


// UI

export const alertActions = {
  add: alerts => ({
    type: 'ADD_ALERTS',
    alerts: Array.isArray(alerts) ? alerts : [ alerts ]
  }),
  remove: alertID => ({
    type: 'REMOVE_ALERT',
    alertID
  }),
  clear: alerts => ({
    type: 'CLEAR_ALERTS',
    alerts: alerts
  })
}

export const modalActions = {
  add: modal => ({
    type: 'ADD_MODAL',
    modal
  }),
  remove: modalID => ({
    type: 'REMOVE_MODAL',
    modalID
  }),
  increment: () => ({
    type: 'INCREMENT_MODAL'
  }),
  clear: () => ({
    type: 'CLEAR_MODALS'
  })
}


// DATA

export const lookupActions = {
  load: (key, payload = []) => ({
    type: 'LOAD_LOOKUP',
    key,
    payload
  }),
  error: (key) => ({
    type: 'LOOKUP_ERROR',
    key
  }),
  flush: key => ({
    type: 'FLUSH_LOOKUP',
    key
  })
}

export const recordActions = {
  load: (response = []) => ({
    type: 'LOAD_RECORDS',
    result: response.result || response,
    total: response.total_records
  }),
  flush: () => ({
    type: 'FLUSH_RECORDS'
  })
}
