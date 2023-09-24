import React from 'react';

import { DATE_FORMATS } from 'globals.js';

import Format from 'format/Format';
import Tools from 'table-v2/tools/Tools';

export const ROWS_ON_PAGE = {
  default: 25,
  options: [ 12, 25, 50, 100 ]
}

export const APPROVER = [
  {
    key:    'name',
    label:  'Name',
    xs:     3
  },
  {
    key:    'email_address',
    label:  'Email',
    xs:     4
  }
]

export const DEALERSHIP = [
  {
    key:    'organization_name',
    label:  'Name',
    xs:     3
  },
  {
    key:    'city',
    label:  'City',
    xs:     3
  },
  {
    key:    'phone',
    label:  'Phone',
    xs:     2
  },
  {
    key:    'email',
    label:  'Email',
    xs:     4
  },
]

export const EVENT_TYPE = [
  {
    key:    'event_type',
    label:  'Event Type',
    xs:     12
  }
]

export const ORIGINATION_TYPE = [
  {
    key:    'origination_type',
    label:  'Origination Type',
    xs:     12
  }
]

export const PRINTER = [
  {
    key:    'printer_name',
    label:  'Name',
    xs:     3
  },
  {
    key:    'printer_ip_address',
    label:  'IP Address',
    xs:     2
  },
  {
    key:    'store_name',
    label:  'Dealership',
    xs:     3
  },
  {
    key:    'default_flag',
    label:  'Default',
    format: Format.Check,
    xs:     2
  },
  {
    key:    'active_flag',
    label:  'Active',
    format: Format.Active,
    xs:     2
  }
]

export const REASON = [
  {
    key:    'reason_name',
    label:  'Description',
    sort:   'DES',
    xs:     3
  },
  {
    key:    'event_type_id',
    label:  'Event Type',
    sort:   'EVT',
    format: Format.Event,
    xs:     3
  },
  {
    key:    'origination_type_id',
    label:  'Source',
    sort:   'SRC',
    format: Format.Organization,
    xs:     3
  },
  {
    key:    'active_flag',
    label:  'Active',
    sort:   'ATV',
    format: Format.Active,
    xs:     3
  }
]

export const USER = [
  {
    key:    'name',
    label:  'Name',
    sort:   'NAM',
    xs:     2
  },
  {
    key:    'phone',
    label:  'Phone',
    xs:     2
  },
  {
    key:    'email_address',
    label:  'Email',
    sort:   'EML',
    xs:     4
  },
  {
    key:    'create_date',
    label:  'Created Date',
    sort:   'CDT',
    xs:     3
  },
  {
    key:    'status',
    label:  'Status',
    format: Format.Active,
    xs:     1
  }
]

export const STOCK_NUM_GENERATION = [
  {
    key:    'reason_name',
    label:  'Reason',
    xs:     5
  },
  {
    key:    'numbering_type',
    label:  'Type',
    xs:     2
  },
  {
    key:    'special_code',
    label:  'Special Code',
    xs:     2
  },
  {
    key:    'duplicate_differentiator_placement',
    label:  'Duplicate Differentiator',
    xs:     3
  },
]

// User

export const ACTIVITIES = [
  {
    Header: 'VIN Number',
    accessor: 'vin',
    width: 170
  },
  {
    Header: 'Vehicle Info',
    accessor: 'vehicle_description',
    width: 270,
    mobileHeading: true
  },
  {
    Header: 'General Pictures',
    accessor: 'total_photos',
    Cell: Tools.BadgeCell,
    width: 130
  },
  {
    Header: 'Damage Pictures',
    accessor: 'damaged_flag',
    Cell: ({ value }) => <Tools.BadgeCell value={!!value && '!'} variant="danger" />,
    width: 130
  },
  {
    Header: 'Date',
    accessor: 'event_datetime',
    width: 135
  },
  {
    Header: 'Status / By',
    accessor: 'event_logged_by',
    width: 150
  },
  {
    Header: '',
    accessor: 'asset_id',
    Cell: ({ value, ...props }) => (
      <Tools.ActionsCell {...props} id={value}>
        <Tools.Edit />
      </Tools.ActionsCell>
    ),
    width: 40,
    disableSortBy: true
  }
];

export const CHECKED_IN = [
  {
    Header: 'VIN Number',
    accessor: 'vin',
    width: 170
  },
  {
    Header: 'Vehicle Info',
    accessor: 'vehicle_description',
    width: 270,
    mobileHeading: true
  },
  {
    Header: 'General Pictures',
    accessor: 'total_photos',
    Cell: Tools.BadgeCell,
    width: 130
  },
  {
    Header: 'Damage Pictures',
    accessor: 'damaged_flag',
    Cell: ({ value }) => <Tools.BadgeCell value={!!value && '!'} variant="danger" />,
    width: 130
  },
  {
    Header: 'Invoice and Documents',
    accessor: 'total_docs',
    Cell: p => <Tools.BadgeCell {...p} variant="warning" />,
    width: 160
  },
  {
    Header: 'Date',
    accessor: 'event_datetime',
    width: 135
  },
  {
    Header: 'Checked In/Active by',
    accessor: 'event_logged_by',
    width: 150
  },
  {
    Header: '',
    accessor: 'asset_id',
    Cell: ({ value, ...props }) => (
      <Tools.ActionsCell {...props} id={value}>
        <Tools.Edit />
      </Tools.ActionsCell>
    ),
    width: 40,
    disableSortBy: true
  }
];

export const CHECKED_OUT = [
  {
    Header: 'VIN Number',
    accessor: 'vin',
    width: 170
  },
  {
    Header: 'Vehicle Info',
    accessor: 'vehicle_description',
    width: 270,
    mobileHeading: true
  },
  {
    Header: 'General Pictures',
    accessor: 'total_photos',
    Cell: Tools.BadgeCell,
    width: 130
  },
  {
    Header: 'Damage Pictures',
    accessor: 'damaged_flag',
    Cell: ({ value }) => <Tools.BadgeCell value={!!value && '!'} variant="danger" />,
    width: 130
  },
  {
    Header: 'Invoice and Documents',
    accessor: 'total_docs',
    Cell: p => <Tools.BadgeCell {...p} variant="warning" />,
    width: 160
  },
  {
    Header: 'Date',
    accessor: 'event_datetime',
    width: 135
  },
  {
    Header: 'Checked Out History/Archived by',
    accessor: 'event_logged_by',
    width: 210
  },
  {
    Header: '',
    accessor: 'asset_id',
    Cell: ({ value, ...props }) => (
      <Tools.ActionsCell {...props} id={value}>
        <Tools.Edit />
      </Tools.ActionsCell>
    ),
    width: 40,
    disableSortBy: true
  }
];

export const DAMAGED = [
  {
    Header: 'VIN Number',
    accessor: 'vin',
    width: 170
  },
  {
    Header: 'Vehicle Info',
    accessor: 'vehicle_description',
    width: 300,
    mobileHeading: true
  },
  {
    Header: 'General Pictures',
    accessor: 'total_photos',
    Cell: Tools.BadgeCell,
    width: 130
  },
  {
    Header: 'Damage Pictures',
    accessor: 'damaged_flag',
    Cell: ({ value }) => <Tools.BadgeCell value={!!value && '!'} variant="danger" />,
    width: 130
  },
  {
    Header: 'Invoice and Documents',
    accessor: 'total_docs',
    Cell: p => <Tools.BadgeCell {...p} variant="warning" />,
    width: 160
  },
  {
    Header: 'Date',
    accessor: 'event_datetime',
    width: 155
  },
  {
    Header: 'Checked Out History/Archived by',
    accessor: 'event_logged_by',
    width: 210
  },
  {
    Header: '',
    accessor: 'asset_id',
    Cell: ({ value, ...props }) => (
      <Tools.ActionsCell {...props} id={value}>
        <Tools.Edit />
      </Tools.ActionsCell>
    ),
    width: 40,
    disableSortBy: true
  }
];

export const REJECTED = [
  {
    Header: 'VIN Number',
    accessor: 'vin',
    width: 170
  },
  {
    Header: 'Vehicle Info',
    accessor: 'vehicle_description',
    width: 270,
    mobileHeading: true
  },
  {
    Header: 'General Pictures',
    accessor: 'total_photos',
    Cell: Tools.BadgeCell,
    width: 130
  },
  {
    Header: 'Damage Pictures',
    accessor: 'damaged_flag',
    Cell: ({ value }) => <Tools.BadgeCell value={!!value && '!'} variant="danger" />,
    width: 130
  },
  {
    Header: 'Invoice and Documents',
    accessor: 'total_docs',
    Cell: p => <Tools.BadgeCell {...p} variant="warning" />,
    width: 160
  },
  {
    Header: 'Date',
    accessor: 'event_datetime',
    width: 135
  },
  {
    Header: 'Checked Out History/Archived by',
    accessor: 'event_logged_by',
    width: 210
  },
  {
    Header: '',
    accessor: 'asset_id',
    Cell: ({ value, ...props }) => (
      <Tools.ActionsCell {...props} id={value}>
        <Tools.Edit />
      </Tools.ActionsCell>
    ),
    width: 40,
    disableSortBy: true
  }
];

export const THIRD_PARTY = [
  {
    Header: 'VIN Number',
    accessor: 'vin_num',
    width: 170
  },
  {
    Header: 'Vehicle Info',
    accessor: 'vehicle_description',
    width: 270,
    Cell: ({ row }) => {
      const { year, make, model, trim } = row.original;
      return `${year} ${make} ${model} ${trim}`;
    },
    disableSortBy: true,
    mobileHeading: true
  },
  {
    Header: 'Date',
    accessor: 'date_created',
    Cell: ({ value }) => <Tools.DateCell value={value} format={DATE_FORMATS.dateTime} />,
    width: 130
  }
];

export const WAITING_APPROVAL = [
  {
    Header: 'VIN Number',
    accessor: 'vin',
    width: 170
  },
  {
    Header: 'Vehicle Info',
    accessor: 'vehicle_description',
    width: 270,
    mobileHeading: true
  },
  {
    Header: 'Waiting For Approval',
    accessor: 'total_docs',
    Cell: p => <Tools.BadgeCell {...p} variant="info" />,
    width: 150
  },
  {
    Header: 'Date',
    accessor: 'event_datetime',
    width: 135
  },
  {
    Header: 'Added by',
    accessor: 'event_logged_by',
    width: 150
  },
  {
    Header: 'Sent for Approval',
    accessor: 'review_request_by',
    width: 150
  },
  {
    Header: '',
    accessor: 'asset_id',
    Cell: ({ value, ...props }) => (
      <Tools.ActionsCell {...props} id={value}>
        <Tools.Edit />
      </Tools.ActionsCell>
    ),
    width: 40,
    disableSortBy: true
  }
];
