const SESSION_LENGTH = 3600000; // 1 hour
//const SESSION_LENGTH = 125000; // 2m 5s

const tokenExp = () => new Date(new Date().getTime() + SESSION_LENGTH);

const user = (props) => ({
  user_account_id: 118,
  membership_type_id: 2,
  last_name: "Admin",
  first_name: "John",
  organization_id: 255,
  user_privileges: "CHEKIN,CHEKOT",
  email_notif_flag: 0,
  cell_phone: "1-703-555-1212",
  password_changed_required: 0,
  email_address: "jadmin@fakeemail.com",
  user_type_id: 2,
  profile_img_url: "https://s3.amazonaws.com/...BF8EB.jpg",
  agreement_date: "December, 6 2019 11:38:14",
  text_notif_flag: 0,
  agreement_flag: 1,
  membership_type_key: "ORG",
  ...props,
});

export default {
  // SESSION

  "POST https://apidev.genevamedia.com/wparkw/authenticate": ({
    method,
    url,
    params,
    urlparams,
    headers,
  }) => {
    const {
      login: { username, password },
    } = params;
    if (username !== "hsmith" || password !== "foobar")
      //KAb2Y53s
      return {
        status: 200,
        data: {
          status: false,
          message: "Invalid username or password.",
        },
      };
    return {
      status: 200,
      data: {
        status: true,
        token: "eyJ0eXAi...",
        token_exp: tokenExp(),
        result: user(),
      },
    };
  },

  // List

  "GET https://apidev.genevamedia.com/wparkw/admin/organization": ({
    method,
    url,
    params,
    urlparams,
    headers,
  }) => {
    const { page = 1, rowsOnPage = 25 } = urlparams;
    const total = 10;
    const length = Math.min(rowsOnPage, total - (page - 1) * rowsOnPage);
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push({
        address_line1: "500 Main Rd.",
        address_line2: "Suite 300",
        city: "Coder City",
        postal_code: "23236",
        phone: "888-555-1212",
        organization_name: "ABC Dealership",
        state_province: "VA",
        email: "abcdealership@fakeemail.com",
        organization_id: 1261,
      });
    }

    return {
      status: 200,
      data: {
        total_records: total,
        result: result,
      },
    };
  },
  "GET https://apidev.genevamedia.com/wparkw/admin/stock-num-generation-config/{organization_id}": ({
    method,
    url,
    params,
    urlparams,
    headers,
  }) => {
    const { page = 1, rowsOnPage = 25 } = urlparams;
    const total = 50;
    const length = Math.min(rowsOnPage, total - (page - 1) * rowsOnPage);
    const numberingTypes = ['Sequential', 'VIN'];
    const specialCodePlacements = ['Prepend', 'Append', 'None'];
    const result = [];
    for (let i = 0; i < length; i++) {
      const numberingType = numberingTypes[Math.round(Math.random() * 1)];
      const specialCodePlacement = specialCodePlacements[Math.round(Math.random() * 2)];
      result.push({
        stock_num_generation_id: Math.round(Math.random() * 5000) + 1,
        event_action_type_id: Math.round(Math.random() * 5000) + 1,
        event_action_type: "New Car Trade",
        numbering_type: numberingType,
        special_code: "NT",
        duplicate_differentiator_placement: specialCodePlacement,
      });
    }

    return {
      status: 200,
      data: {
        total_records: total,
        result: result,
      },
    };
  },
  "GET https://apidev.genevamedia.com/wparkw/checked-in-list/{dateRange}": ({
    method,
    url,
    params,
    urlparams,
    headers,
  }) => {
    const { page = 1, rowsOnPage = 25 } = urlparams;
    const total = 10;
    const length = Math.min(rowsOnPage, total - (page - 1) * rowsOnPage);
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push({
        asset_id: i,
        asset_event_id: 20,
        vin: 'WBA7E4C53KGV70015',
        vehicle_description: '2018 BMW X5, Black',
        event_datetime: '1/1/2017 12:31PM',
        event_logged_by: 'Jack Ryan',
        total_docs: 3,
        total_photos: 3,
        damaged_flag: false
      });
    }

    return {
      status: 200,
      data: {
        date_accrual_summary: [
          {
            description: 'Today',
            total: 1,
            date_range_key: 'TODAY1'
          },
          {
            description: 'Yesterday',
            total: 3,
            date_range_key: 'YSTDAY'
          },
          {
            description: 'This Week',
            total: 4,
            date_range_key: 'THSWEK'
          },
          {
            description: 'This Month',
            total: 6,
            date_range_key: 'THSMTH'
          },
          {
            description: 'This Year',
            total: 9,
            date_range_key: 'THSYER'
          },
          {
            description: 'Last Week',
            total: 1,
            date_range_key: 'LSTWEK'
          },
          {
            description: 'Last Month',
            total: 1,
            date_range_key: 'LSTMTH'
          },
          {
            description: 'Last Year',
            total: 12,
            date_range_key: 'LSTYER'
          },
        ],
        result
      },
    };
  },

  // Record

  "GET https://apidev.genevamedia.com/wparkw/admin/organization/{organization_id}": ({
    method,
    url,
    params,
    urlparams,
    headers,
  }) => {
    return {
      status: 200,
      data: {
        address_line1: "500 Main Rd.",
        address_line2: "Suite 300",
        city: "Coder City",
        postal_code: "23236",
        phone: "888-555-1212",
        organization_name: "ABC Dealership",
        state_province: "VA",
        email: "abcdealership@fakeemail.com",
        organization_id: 1261,
      },
    };
  },
  "GET https://apidev.genevamedia.com/wparkw/admin/stock-num-generation-config/{organization_id}/{event_action_type_id}": ({
    method,
    url,
    params,
    urlparams,
    headers,
  }) => {
    return {
      status: 200,
      data: {
        event_action_type_id: 1,
        event_action_type: "New Car Trade",
        organization_id: 5,
        organization_name: "ABC Dealership",
        numbering_type: "V",
        sequential_start_number: "",
        vin_total_numbers: "6",
        special_code_placement: "P",
        special_code_value: "NT",
        differentiator_before_after: "B",
      },
    };
  },

  "PUT https://apidev.genevamedia.com/wparkw/admin/stock-num-generation-config": ({
    method,
    url,
    params,
    urlparams,
    headers,
  }) => {
    return {
      status: 200,
      data: {
        status: true,
      },
    };
  },

  // "POST https://apidev.genevamedia.com/wparkw/admin/stock-num-generation-config": ({
  //   method,
  //   url,
  //   params,
  //   urlparams,
  //   headers,
  // }) => {
  //   return {
  //     status: 200,
  //     data: {
  //       status: true,
  //     },
  //   };
  // },
};
