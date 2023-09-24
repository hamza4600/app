// SESSION

export const user = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return { ...action.result };
    case 'CHANGE_DEALERSHIP':
      return {
        ...state,
        organization_id: action.organization_id
      };
    default:
      return state;
  }
}

export const token = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return action.token;
    case 'CHANGE_DEALERSHIP':
      return action.token;
    default:
      return state;
  }
}

export const tokenExp = (prevState = null, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return action.token_exp;
    case 'EXTEND_SESSION':
      return action.token_exp;
    case 'CHANGE_DEALERSHIP':
      return action.token_exp;
    default:
      return prevState;
  }
}


// UI

export const alerts = (state = [], action) => {
  let newState = [ ...state ];
  

  switch(action.type) {
    case 'ADD_ALERTS':
      newState.unshift(...action.alerts);
      return newState;
    case 'REMOVE_ALERT':
      newState.splice(newState.findIndex(alert => alert.ID === action.alertID), 1);
      return newState;
    case 'CLEAR_ALERTS':
      newState = action.alerts ? [ ...action.alerts ] : [];
      return newState;
    case 'LOGIN_USER':
      return [];
    case 'FLUSH_STATE':
      return [];
    default:
      return state;
  }
}

export const modals = (state = [], action) => {
  const newState = [ ...state ];

  switch(action.type) {
    case 'ADD_MODAL':
      const insertionPoint = newState.findIndex(modal => modal.priority < action.modal.priority);
      insertionPoint === -1 ? newState.push(action.modal) : newState.splice(insertionPoint, 0, action.modal);
      return newState;
    case 'REMOVE_MODAL':
      const modalKey = newState.findIndex(modal => modal.ID === action.modalID);
      modalKey === 0 ? newState[modalKey].close = true : newState.splice(modalKey, 1);
      return newState;
    case 'INCREMENT_MODAL':
      newState.shift();
      return newState;
    case 'CLEAR_MODALS':
      return [];
    default:
      return state;
  }
}


// DATA

export const lookups = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_LOOKUP':
      return {
        ...state,
        [action.key]: action.payload
      }
    case 'LOOKUP_ERROR':
      return {
        ...state,
        [action.key]: null
      }
    case 'FLUSH_LOOKUP':
      return {}
    default:
      return state;
  }
}

export const records = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_RECORDS':
      return {
        total: action.total,
        list: Array.isArray(action.result) ?  [ ...action.result ] : undefined,
        single: !Array.isArray(action.result) ? action.result : undefined
      };
    case 'FLUSH_RECORDS':
      return {};
    default:
      return state;
  }
}
