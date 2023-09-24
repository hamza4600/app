import _ from 'lodash';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import isBefore from 'date-fns/isBefore';

import { alertActions, modalActions, sessionActions } from 'actions.js';
import { ENDPOINTS } from 'endpoints.js';
import { ENVIRONMENTS } from 'environments.js';
import { DEBUG, MODAL_PRIORITY, USER_DATA } from 'globals.js';
import { store } from 'store.js';

// Utility Functions

export const bugLog = (feedback, debug = DEBUG, name, value) => {
  if (name) feedback = `[${name}] ${feedback}`;
  if (value) feedback = `${feedback}: ${value}`;
  if (debug) console.log(feedback);
};

export const doCallback = (callback, ...rest) => {
  if (_.isFunction(callback)) callback(...rest);
};

export const mergeClassName = (...classNames) =>
  classNames.reduce((acc, curr) => (curr !== undefined ? [acc, curr].join(' ') : acc), []);

// API Functions

export const getEnv = key => {
  let val = ENVIRONMENTS.dev[key];
  Object.keys(ENVIRONMENTS).forEach(env => {
    if (window.location.hostname === ENVIRONMENTS[env].hostname) val = ENVIRONMENTS[env][key];
  });
  return val;
};

export const getURL = () => getEnv('url');

export const getKey = () => getEnv('key');

export const apiFetch = ({
  method = 'GET',
  endpoint,
  params,
  onFetch,
  onResponse,
  onSuccess,
  onError,
  onComplete,
  loadingMessage,
  successMessage,
  errorMessage,
  messageFunctions = modalFunctions,
  debug,
  debugOnly
}) => {
  let fetchLog = feedback => bugLog(feedback, debug);

  if (!endpoint) {
    doCallback(onError);
    return console.error('No endpoint specified!');
  }

  let url = getURL() + endpoint;
  if (params && method === 'GET') url += encodeSearch(params);
  fetchLog(url);

  const { token } = store.getState();
  let config = {};
  config.method = method;
  config.headers = {};
  config.headers['Content-Type'] = 'application/json';
  config.headers['x-api-key'] = getKey();
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  if (params && method !== 'GET') config.body = stringifyValues(params, true, ['confirmation', 'cleave']);
  fetchLog(config);

  if (debugOnly) return;

  const clearLoadingMessage = loadingMessage ? messageFunctions.loading(loadingMessage) : undefined;
  doCallback(onFetch);

  fetch(url, config)
    .then(response => {
      fetchLog(response);

      doCallback(clearLoadingMessage);
      doCallback(onResponse, response);

      if (!response.ok) {
        throw Error(response);
      } else {
        return response;
      }
    })
    .then(response => response.json())
    .then(data => {
      fetchLog(data);

      if (data.status === false) {
        messageFunctions.error(data.ERROR || data.error || data.message || errorMessage);
        doCallback(onError, data);
      } else {
        messageFunctions.success(successMessage);
        doCallback(onSuccess, data);
      }
    })
    .catch(response => {
      console.error(response);

      messageFunctions.error(errorMessage);
      doCallback(clearLoadingMessage);
      doCallback(onError);
    })
    .finally(() => {
      doCallback(onComplete);
    });
};

export const asyncFetch = async ({ method = 'GET', endpoint, params, errorMessage, debug, debugOnly }) => {
  const fetchLog = feedback => bugLog(feedback, debug);

  const url = getURL() + endpoint;
  fetchLog(url);

  try {
    const { token } = store.getState();

    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        'x-api-key': getKey()
      }
    };
    if (!_.isEmpty(params)) config.body = JSON.stringify(params);
    fetchLog(config);

    if (debugOnly) return;

    const response = await fetch(url, config);
    const result = await response.json();
    fetchLog(result);

    if (response.status !== 200) {
      throw new Error(result.message || errorMessage || 'An error occurred.');
    }

    return result;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

// Session Functions

export const timeExpired = timeStamp => {
  if (!timeStamp) return false;

  const nowUtc = utcToZonedTime(new Date(), 'UTC');
  const expUtc = utcToZonedTime(new Date(timeStamp), 'UTC');

  return isBefore(expUtc, nowUtc);
};

export const loggedIn = (token, tokenExp) => token && !timeExpired(tokenExp);

export const logOut = payload => {
  const LOGOUT_ALERT = {
    type: 'loading',
    message: 'Signing out',
    priority: MODAL_PRIORITY.logOut
  };

  const args = {
    method: 'POST',
    endpoint: ENDPOINTS.session.logout,
    onResponse: modalFunctions.add(LOGOUT_ALERT),
    onSuccess: () => store.dispatch(sessionActions.logout(payload)),
    errorMessage: 'Unable to sign out.'
  };

  apiFetch(args);
};

// Permissions

export const getRole = () => {
  const { user: { user_type_id } = {} } = store.getState();
  const {
    roles: { admin, user }
  } = USER_DATA;

  return {
    2: admin,
    1: user
  }[user_type_id];
};

export const isAdmin = () => {
  const role = getRole();
  return role === USER_DATA.roles.admin;
};

export const guardRoutes = routes => {
  const role = getRole();
  return _.pickBy(routes, route => {
    return !route.permissions || (route.permissions && route.permissions.includes(role));
  });
};

// Router Functions

export const decodeSearch = paramString => {
  const params = {};
  paramString = paramString.substring(1);
  let paramArray = paramString.split('&');
  paramArray.forEach(function (param) {
    let paramComponents = param.split('=');
    if (paramComponents[0] && paramComponents[1]) {
      let key = paramComponents[0];
      let value = paramComponents[1] || '';
      params[key] = value;
    }
  });
  return params;
};

export const encodeSearch = params => {
  const paramArray = [];
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      let val = params[key];
      if (!_.isNil(val)) paramArray.push(`${key}=${val}`);
    }
  }
  if (paramArray.length < 1) return '';
  const paramString = paramArray.join('&');
  return `?${paramString}`;
};

export const updateSearch = (search, ...params) => {
  let urlParams = decodeSearch(search);
  params.forEach(param => {
    if (param.name) {
      urlParams[param.name] = param.value;
    } else {
      urlParams[param.key] = param.value;
    }
  });
  let newSearch = encodeSearch(urlParams);
  return newSearch;
};

// UI Functions

const addAlert = alert => {
  if (!alert || !alert.message) return;
  alert.ID = Math.random().toString(36).substring(2, 15).toUpperCase();
  store.dispatch(alertActions.add(alert));
  return () => store.dispatch(alertActions.remove(alert.ID));
};

export const alertFunctions = {
  add: addAlert,
  remove: alertID => store.dispatch(alertActions.remove(alertID)),
  clear: alerts => store.dispatch(alertActions.clear(alerts)),
  message: message => addAlert({ message, variant: 'secondary' }),
  success: message => addAlert({ message, variant: 'success' }),
  warning: message => addAlert({ message, variant: 'warning' }),
  danger: message => addAlert({ message, variant: 'danger' }),
  error: message => addAlert({ message, type: 'error' }),
  loading: message => addAlert({ message, type: 'loading' })
};

const addModal = (modal, isAlert = !modal.type) => {
  if (!modal) return;
  if (isAlert && !modal.message) return;
  modal.ID = Math.random().toString(36).substring(2, 15).toUpperCase();
  if (modal.priority === undefined) modal.priority = 0;
  store.dispatch(modalActions.add(modal));
  return () => store.dispatch(modalActions.remove(modal.ID));
};

export const modalFunctions = {
  add: addModal,
  remove: modalID => store.dispatch(modalActions.remove(modalID)),
  increment: () => store.dispatch(modalActions.increment()),
  clear: () => store.dispatch(modalActions.clear()),
  message: message => addModal({ message, variant: 'secondary' }),
  success: message => addModal({ message, variant: 'success' }),
  warning: message => addModal({ message, variant: 'warning' }),
  danger: message => addModal({ message, variant: 'danger' }),
  error: message => addModal({ message, type: 'error' }, true),
  loading: message => addModal({ message, type: 'loading', priority: MODAL_PRIORITY.loading }, true)
};

// Form Functions

export const getField = (object, name) => name.split('.').reduce((o, k) => (o && o[k] ? o[k] : null), object);

export const updateValues = ({ name, value = '' }, values) =>
  name !== undefined
    ? name
        .split('.')
        .reduce((acc, curr, idx, src) => (acc[curr] = ++idx === src.length ? value : acc[curr] || {}), values)
    : values;

export const stringifyValues = (values, stringify, blacklist = []) => {
  if (Array.isArray(values)) {
    return values;
    //    return values.join(',');
  } else if (typeof values === 'object') {
    _.keys(values).forEach(key => {
      if (blacklist.includes(key)) delete values[key];
      else values[key] = stringifyValues(values[key]);
    });
    return stringify ? JSON.stringify(values) : values;
  } else {
    return values;
  }
};

// Charts

export const buildChartColors = (colors = [], numDatum = 0) => {
  if (colors.length < numDatum) {
    colors.push(...colors);
    buildChartColors();
  }
  return colors;
};

// Formatters

export const formatNumber = num => {
  if (_.isNil(num)) return num;

  const { format } = new Intl.NumberFormat();

  return format(num);
};
