export const SITE_TITLE = 'Check In/Out';
export const COPYRIGHT = '© Geneva Media Services LLC';

export const DEBUG = false;

export const TINY_MCE_API = process.env.REACT_APP_TINY_MCE_API;

// UI

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1250,
  xl: 1800
};

export const VARIANTS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

export const TIMES = {
  modalDuration: 2, // in seconds
  reauthWarningTime: 2, // in minutes
  sessionTimerLength: 5, // in seconds
  transitionDuration: 150 // in milliseconds
};

export const MODAL_PRIORITY = {
  loading: -1,
  extendSession: 2,
  logOut: 3
};

/*
export const PATHNAMES = {
  root: '/',
  login: '/login/',
  password: '/reset-password/',
  dashboard: '/',
  page: '/page/',
  add: '/add/',
  edit: '/edit/',
  view: '/view/'
}
*/

// API

export const USER_DATA = {
  membershipTypes: {
    individual: 'IND',
    organization: 'ORG'
  },
  privileges: {
    approver: 'APPRVR',
    checkIn: 'CHEKIN',
    checkOut: 'CHEKOT'
  },
  roles: {
    admin: 'ADM',
    user: 'USR'
  }
};

export const ASSET_DATA = {
  accessType: {
    owner: 'OWN',
    reviewer: 'REV'
  },
  category: {
    vehicle: 'VEHICL'
  },
  eventStatus: {
    checkedIn: 'CHKDIN',
    checkedOut: 'CHKOUT',
    requested: 'AWAAPV',
    rejected: 'REJRET'
  },
  eventOutcome: {
    checkIn: {
      approved: 'CKIAPV',
      requested: 'CKIAWA',
      rejected: 'CKIREJ'
    },
    checkOut: {
      approved: 'CHOAPV',
      requested: 'CHOAWA',
      rejected: 'CHOREJ'
    }
  },
  eventType: {
    checkIn: 'CHECKI',
    checkOut: 'CHECKO'
  },
  imageType: {
    damaged: 'DMGPRF',
    generic: 'GENERC'
  },
  reviewStatus: {
    approved: 'APPROV',
    requested: 'REQAPV',
    rejected: 'REJECT'
  }
};

export const DATE_RANGES = [
  {
    key: 'TODAY1',
    label: 'Today'
  },
  {
    key: 'YSTDAY',
    label: 'Yesterday'
  },
  {
    key: 'THSWEK',
    label: 'This Week'
  },
  {
    key: 'LSTWEK',
    label: 'Last Week'
  },
  {
    key: 'THSMTH',
    label: 'This Month'
  },
  {
    key: 'LSTMTH',
    label: 'Last Month'
  },
  {
    key: 'THSYER',
    label: 'This Year'
  },
  {
    key: 'LSTYER',
    label: 'Last Year'
  }
];

export const DATE_FORMATS = {
  date: 'MM/dd/yyyy',
  dateTime: 'MM/dd/yyyy h:mm aa',
  time: 'h:mm aa'
};
