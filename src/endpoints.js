export const ENDPOINTS = {
  session: {
    login: 'authenticate',
    logout: 'logout',
    resetPassword: 'reset-password',
    extendSession: 'extend-session',
    changeDealership: 'change-dealership-session'
  },
  lookup: {
    awaitingApproval: 'awaiting-approval-summary',
    eventTypes: 'admin/event-type/list',
    originationTypes: 'admin/origination-type/list',
    organizations: 'organizations/list',
    privileges: 'user-privileges/list',
    states: 'us-states/list'
  },

  // Admin
  approver: {
    list: () => 'approvers/list'
  },
  dealership: {
    list: () => 'admin/organization',
    get: organizationID => `admin/organization/${organizationID}`,
    save: organizationID => (organizationID ? `admin/organization/${organizationID}` : 'admin/organization/'),
    delete: organizationID => `admin/organization/${organizationID}`
  },
  eventType: {
    list: () => 'admin/event-type/list',
    get: eventTypeID => `admin/event-type/${eventTypeID}`,
    save: eventTypeID => (eventTypeID ? `admin/event-type/${eventTypeID}` : 'admin/event-type/')
  },
  originationType: {
    list: () => 'admin/origination-type/list',
    get: originationTypeID => `admin/origination-type/${originationTypeID}`,
    save: originationTypeID =>
      originationTypeID ? `admin/origination-type/${originationTypeID}` : 'admin/origination-type/'
  },
  printer: {
    list: () => 'admin/stock-sticker-printer/list',
    get: printerID => `admin/stock-sticker-printer/${printerID}`,
    save: printerID => (printerID ? `admin/stock-sticker-printer/${printerID}` : 'admin/stock-sticker-printer/'),
    delete: printerID => `admin/stock-sticker-printer/${printerID}`
  },
  reason: {
    list: () => 'admin/reason/list',
    get: eventActionTypeId => `admin/reason/${eventActionTypeId}`,
    save: eventActionTypeId => (eventActionTypeId ? `admin/reason/${eventActionTypeId}` : 'admin/reason/'),
    sort: () => 'admin/reason/sort'
  },
  user: {
    list: () => 'admin/user',
    get: userAccountID => `admin/user/${userAccountID}`,
    save: userAccountID => (userAccountID ? `admin/user/${userAccountID}` : 'admin/user/')
  },
  stockNumGeneration: {
    list: organizationID => `admin/stock-num-generation-config/${organizationID}`,
    get: (eventActionTypeID, organizationID) =>
      `admin/stock-num-generation-config/${organizationID}/${eventActionTypeID}`,
    save: () => 'admin/stock-num-generation-config/',
    parent: organizationID => `admin/organization/${organizationID}`
  },

  // User
  account: {
    get: () => 'account/get',
    edit: () => 'account/edit'
  },
  activities: {
    list: dateRange => `current-activities/${dateRange}`,
    get: (assetId, assetEventId) => `vehicle/view/${assetId}/${assetEventId}`,
    save: () => 'vehicle/approval-review'
  },
  approvalCheckedIn: {
    list: () => 'checked-in-approval-list',
    get: (assetId, assetEventId) => `vehicle/view/${assetId}/${assetEventId}`,
    save: () => 'vehicle/approval-review'
  },
  approvalCheckedOut: {
    list: () => 'checked-out-approval-list',
    get: (assetId, assetEventId) => `vehicle/view/${assetId}/${assetEventId}`,
    save: () => 'vehicle/approval-review'
  },
  checkedIn: {
    list: dateRange => `checked-in-list/${dateRange}`,
    get: (assetId, assetEventId) => `vehicle/view/${assetId}/${assetEventId}`,
    save: () => 'vehicle/approval-review'
  },
  checkedOut: {
    list: dateRange => `checked-out-list/${dateRange}`,
    get: (assetId, assetEventId) => `vehicle/view/${assetId}/${assetEventId}`,
    save: () => 'vehicle/approval-review'
  },
  damaged: {
    list: dateRange => `damaged-list/${dateRange}`,
    get: (assetId, assetEventId) => `vehicle/view/${assetId}/${assetEventId}`,
    save: () => 'vehicle/approval-review'
  },
  thirdParty: {
    list: () => 'third-party-list'
  },
  rejected: {
    list: dateRange => `rejected-list/${dateRange}`,
    get: (assetId, assetEventId) => `vehicle/view/${assetId}/${assetEventId}`,
    save: () => 'vehicle/approval-review'
  }
};
