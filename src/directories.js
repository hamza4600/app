import React from 'react';
import { generatePath } from 'react-router'

import { USER_DATA } from 'globals.js';
import { ENDPOINTS } from 'endpoints.js';
import { getRole, logOut, modalFunctions } from 'functions.js';
import {
  ACTIVITIES,
  APPROVER,
  CHECKED_IN,
  CHECKED_OUT,
  DAMAGED,
  DEALERSHIP,
  EVENT_TYPE,
  ORIGINATION_TYPE,
  PRINTER,
  REASON,
  REJECTED,
  STOCK_NUM_GENERATION,
  THIRD_PARTY,
  USER,
  WAITING_APPROVAL
} from 'tables.js';

import Authentication from 'authentication/Authentication';
import Interfaces from 'interface/Interfaces';
import InterfaceList from 'interface/InterfaceList';
// import InterfaceTools from 'interface/tools/Tools';
import Record from 'record/Record';
import Forms from 'record/forms/Forms';
/*

path: Path for routing components and linking nav items
onClick: Instead of 'path', used for nav item clicks.
title: Used for page and document titles on target routes.
header: Used in place of 'title' for page titles. Useful for markup or longer titles.
label: Used in place of 'title' for nav items, etc. Useful for abbreviated titles.
icon: The icon used on nav items, etc.
components: Used to add components to routes.

menuItemType: Component to use in Menu. Defaults to MenuItem.Link.
menuItemClassName: ClassName to use on MenuItem.

steps
params
saveButton

*/

const { roles: { admin, user } } = USER_DATA;

// TODO: Look into using permissions array

export const STEPS_ADMIN = {
  list: {
    paramOptions: 'page/:pageNumber',
    component:    Record.List
  },
  add: {
    component:  Record.Add,
    action: {
      default:  'Add',
      loading:  'Adding',
      complete: 'Added'
    },
    icon:       'plus-circle'
  },
  view: {
    to:         ({ path, record, id, match: { params } }) => `/${generatePath(path, params)}/view/${record[id]}`,
    params:     ':recordID',
    component:  Record.View,
    action: {
      default:  'View'
    },
    icon:       'search-plus'
  },
  edit: {
    to:         ({ path, record, id, match: { params } }) => `/${generatePath(path, params)}/edit/${record[id]}`,
    params:     ':recordID',
    component:  Record.Edit,
    action: {
      default:  'Update',
      loading:  'Updating',
      complete: 'Updated'
    },
    icon:       'pencil-alt'
  },
  delete: {
    onClick: props => modalFunctions.add({
      type: 'delete',
      ...props
    }),
    action: {
      default:  'Delete',
      loading:  'Deleting',
      complete: 'Deleted'
    },
    icon:       'trash-alt'
  },
  sort: {
    to:         ({ path, match: { params } }) => `/${generatePath(path, params)}/sort`,
    component:  Record.Sort,
    action: {
      default:  'Sort',
      loading:  'Sorting',
      complete: 'Sorted'
    }
  },
}

export const STEPS_USER = {
  list: {
    component:  InterfaceList
  },
  view: {
    to:        ({ path, record, id, match: { params } }) => `/${generatePath(path, params)}/view/${record[id]}`,
    params:    ':id/:eventId',
    component: Interfaces.CarDetail,
    action: {
      default: 'View'
    },
  },
  add: {
    component:  Interfaces.ComingSoon,
    action: {
      default:  'Add',
      loading:  'Adding',
      complete: 'Added'
    }
  },
  edit: {
    to:         ({ path, record, id, match: { params } }) => `/${generatePath(path, params)}/edit/${record[id]}`,
    params:     ':id/:eventId',
    component:  Interfaces.CarDetail,
    action: {
      default:  'Update',
      loading:  'Updating',
      complete: 'Updated'
    }
  }
}

export const AUTHENTICATION = {
  login: {
    path:      'login',
    title:     'Log in to Your Account',
    subtitle:  'Please Enter Your Information',
    form:      Authentication.Login
  },
  password: {
    path:      'forgot-password',
    title:     'Reset Password',
    form:      Authentication.Password
  }
}

export const USER_MENU = {
  settings: {
    path: 'settings',
    title: {
      page: 'Settings'
    },
    icon: {
      use: 'settings'
    },
    component: Interfaces.Settings,
    permissions: [user]
  },
  signOut: {
    icon: {
      use: 'power'
    },
    title: {
      menu: 'Sign Out'
    },
    onClick: () => logOut()
  }
}

export const INTERFACE_ADMIN = {
  dashboard: {
    path:      'dashboard',
    title: {
      page:    'Dashboard',
    },
    icon:      'tachometer-alt',
    component: ({ children }) => <>{children}</>
  },
  users: {
    path:      'users',
    title: {
      single:  'User',
      plural:  'Users'
    },
    icon:      'user',
    columns:   USER,
    form:      Forms.User,
    endpoints: ENDPOINTS.user,
    id:        'user_account_id',
    tools: [
               Record.Tools.Rows,
               Record.Tools.Dealerships,
               Record.Tools.Privileges,
               Record.Tools.Name
    ]
  },
  approver: {
    path:      'approvers',
    title: {
      single:  'Approver',
      plural:  'Approvers'
    },
    icon:      'check',
    columns:   APPROVER,
    endpoints: ENDPOINTS.approver,
    id:        'user_account_id'
  },
  dealerships: {
    path:      'dealerships',
    title: {
      single:  'Dealership',
      plural:  'Dealerships'
    },
    icon:      'car',
    columns:   DEALERSHIP,
    form:      Forms.Dealership,
    endpoints: ENDPOINTS.dealership,
    id:        'organization_id',
    name:      'organization_name',
    actions: [{
        to:         ({ record, id }) => `/dealerships/stock-num-generation/${record[id]}`,
        params:     ':recordID',
        component:  Record.List,
        action: {
          custom:   <>Configure<br /> Stock Number Generation</>
        },
        icon:       'cog'
    }],
    subpaths: {
      stockNumGeneration: {
        path:      'stock-num-generation/:id',
        title: {
          page:    'Dealerships',
          single:  'Stock Number Generation',
          plural:  'Stock Numbers'
        },
        columns:    STOCK_NUM_GENERATION,
        form:       Forms.StockNumGeneration,
        endpoints:  ENDPOINTS.stockNumGeneration,
        id:         'event_action_type_id',
        name:       'event_action_type'
      }
    }
  },
  stockStickerPrinters: {
    path:      'stock-sticker-printers',
    title: {
      single:  'Printer',
      plural:  'Printers'
    },
    icon:      'print',
    columns:   PRINTER,
    form:      Forms.Printer,
    endpoints: ENDPOINTS.printer,
    id:        'printer_id',
    name:      'printer_name'
  },
  reasons: {
    path:      'reasons',
    title: {
      single:  'Reason',
      plural:  'Reasons'
    },
    icon:      'clipboard-list',
    columns:   REASON,
    form:      Forms.Reason,
    endpoints: ENDPOINTS.reason,
    id:        'event_action_type_id',
    name:      'reason_description',
    tools: [
      Record.Tools.EventType,
      Record.Tools.OriginationType
    ],
    headerTools: [
      Record.Tools.Sort
    ],
    sort: {
      defaultParams: { eventType: 1, sort: 'SNM', order: 'A' },
      tools: [
        p => <Record.Tools.EventType {...p} useBlank={false} />
      ]
    }
  },
  eventType: {
    path:      'event-types',
    title: {
      single:  'Event Type',
      plural:  'Event Types'
    },
    icon:      'clipboard-list',
    columns:   EVENT_TYPE,
    form:      Forms.EventType,
    endpoints: ENDPOINTS.eventType,
    id:        'event_type_id',
    name:      'event_Type'
  },
  originationType: {
    path:      'origination-types',
    title: {
      single:  'Origination Type',
      plural:  'Origination Types'
    },
    icon:      'clipboard-list',
    columns:   ORIGINATION_TYPE,
    form:      Forms.OriginationType,
    endpoints: ENDPOINTS.originationType,
    id:        'origination_type_id',
    name:      'origination_type'
  }
}

export const INTERFACE_USER = {
  dashboard: {
    path:      'dashboard',
    title: {
      page:    'Dashboard',
    },
    icon:      {
      use: 'chart'
    },
    component: Interfaces.Dashboard
  },
  waitingApproval: {
    path:      'awaiting-approval',
    title: {
      page:    'Waiting for Approval',
    },
    icon:      {
      use: 'update'
    },
    subpaths: {
      checkedIn: {
        path:      'checked-in',
        title: {
          page:    'Checked In for Approval'
        },
        columns: WAITING_APPROVAL,
        endpoints: ENDPOINTS.approvalCheckedIn,
        // tools: [InterfaceTools.Search],
        inMenu: true,
        lookupPath: 'awaitingApproval.CHIAWA'
      },
      checkedOut: {
        path:      'checked-out',
        title: {
          page:    'Checked Out for Approval'
        },
        columns: WAITING_APPROVAL,
        endpoints: ENDPOINTS.approvalCheckedOut,
        // tools: [InterfaceTools.Search],
        inMenu: true,
        lookupPath: 'awaitingApproval.CHOAWA'
      }
    }
  },
  // stockSticker: {
  //   path:      'stock-sticker',
  //   title: {
  //     page:    'Stock Sticker',
  //   },
  //   icon:      {
  //     use: 'label'
  //   },
  //   component: ({ children }) => <>{children}</>
  // },
  thirdPartyDataFeed: {
    path:      'third-party-data-feed',
    title: {
      page:    '3rd Party Data Feed',
    },
    icon:      {
      use: 'feed'
    },
    columns: THIRD_PARTY,
    endpoints: ENDPOINTS.thirdParty
  },
  checkedIn: {
    path:      'checked-in',
    title: {
      page:    'Checked In',
    },
    icon:      {
      use: 'check-circle'
    },
    color: 'green',
    columns: CHECKED_IN,
    endpoints: ENDPOINTS.checkedIn,
    // tools: [InterfaceTools.Search]
  },
  damaged: {
    path:      'damaged',
    title: {
      page:    'Damaged',
    },
    icon:      {
      use: 'warning'
    },
    color: 'red',
    columns: DAMAGED,
    endpoints: ENDPOINTS.damaged,
    // tools: [InterfaceTools.Search]
  },
  rejected: {
    path:      'rejected',
    title: {
      page:    'Rejected',
    },
    icon:      {
      use: 'close-circle'
    },
    color: 'orange',
    columns: REJECTED,
    endpoints: ENDPOINTS.rejected,
    // tools: [InterfaceTools.Search]
  },
  checkedOut: {
    path:      'checked-out',
    title: {
      page:    'Checked Out',
    },
    icon:      {
      use: 'clipboard-check'
    },
    color: 'red',
    columns: CHECKED_OUT,
    endpoints: ENDPOINTS.checkedOut,
    // tools: [InterfaceTools.Search]
  },
  activities: {
    path:      'activities',
    title: {
      page:    'Activities',
    },
    icon:      {
      use: 'clipboard'
    },
    color: 'primary',
    columns: ACTIVITIES,
    endpoints: ENDPOINTS.activities,
    // tools: [InterfaceTools.Search]
  },
  floorplan: {
    path:      'floorplan',
    title: {
      page:    'Floorplan',
    },
    icon:      {
      use: 'library-books'
    },
    component: Interfaces.ComingSoon
  }
}

export const getInterfaceRoutes = () => {
  const role = getRole();

  return {
    [admin]: INTERFACE_ADMIN,
    [user]: INTERFACE_USER
  }[role];
}
