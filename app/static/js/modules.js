// Reservation Grid Definitions
const reservColDefs = [
  {
    headerName: "Status",
    field: "status_id",
    width: 90,
    pinned: "right",
    editable: true,
    cellEditor: CustomSelect,
    cellEditorParams: {
      values: [],
    },
    refData: {},
  },
  {
    headerName: "RefID",
    field: "ref_id",
    width: 90,
    pinned: "left",
    cellRenderer: "agGroupCellRenderer",
  },
  {
    headerName: "ResID",
    field: "res_id",
    width: 70,
    pinned: "left",
    cellRenderer: renderResID,
  },
  {
    headerName: "Voucher",
    field: "bkg_ref",
    width: 90,
    pinned: "left",
    cellRenderer: renderSpinner,
  },
  {
    headerName: "OprCode",
    field: "opr_code",
    width: 80,
    hide: true,
  },
  {
    headerName: "Operator",
    field: "opr_name",
    width: 80,
  },
  {
    headerName: "HotelName",
    field: "hotel_name",
    width: 180,
    editable: true,
    cellEditor: CustomSelect,
    cellEditorParams: {
      values: [],
    },
  },
  {
    headerName: "ImportDate",
    field: "import_date",
    width: 90,
    hide: true,
    type: "dateColumn",
  },
  {
    headerName: "SalesDate",
    field: "sales_date",
    width: 90,
    type: "dateColumn",
  },
  {
    headerName: "InDate",
    field: "in_date",
    width: 95,
    type: "dateColumn",
    editable: true,
    cellEditor: DatePicker,
  },
  {
    headerName: "OutDate",
    field: "out_date",
    width: 95,
    type: "dateColumn",
    editable: true,
    cellEditor: DatePicker,
  },
  {
    headerName: "RoomType",
    field: "room",
    width: 130,
  },
  {
    field: "meal",
    width: 60,
  },
  {
    field: "days",
    width: 60,
  },
  {
    field: "adult",
    width: 60,
  },
  {
    field: "child",
    width: 60,
  },
  {
    field: "purchase",
    width: 80,
    type: "numberColumn",
    cellClassRules: {
      "bg-danger bg-opacity-50": (params) => params.value <= 0,
    },
    editable: true,
  },
  {
    field: "sales",
    width: 80,
    type: "numberColumn",
    cellClassRules: {
      "bg-danger bg-opacity-50": (params) => params.value <= 0,
    },
    editable: true,
  },
  {
    headerName: "OprPrice",
    field: "opr_cost",
    width: 80,
    type: "numberColumn",
    cellClassRules: {
      "bg-danger bg-opacity-50": (params) => params.value <= 0,
    },
    editable: true,
  },
  {
    headerName: "Margin %",
    field: "margin",
    width: 80,
    type: "numberColumn",
    cellClassRules: {
      "bg-danger bg-opacity-50": (params) => params.value < 0,
    },
  },
  {
    headerName: "PurchaseID",
    field: "gwg_p_id",
    width: 100,
  },
  {
    headerName: "PurchaseCode",
    field: "gwg_p_code",
    width: 150,
    tooltipField: "gwg_p_code",
  },
  {
    headerName: "SalesID",
    field: "gwg_s_id",
    width: 100,
  },
  {
    headerName: "SalesCode",
    field: "gwg_s_code",
    width: 150,
    tooltipField: "gwg_s_code",
  },
];

const reservGridOpts = {
  getRowId: (params) => {
    return params.data.id;
  },
  columnDefs: reservColDefs,
  defaultColDef: {
    filter: true,
    filterParams: {
      debounceMs: 500,
      suppressAndOrCondition: true,
      buttons: ["reset"],
      values: (params) => {
        setFilterParams(params);
      },
    },
    tooltipComponent: CustomTooltip,
    lockPinned: true,
    enableCellChangeFlash: true,
  },
  columnTypes: {
    dateColumn: {
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString("en-GB"),
      filter: "agDateColumnFilter",
      filterParams: {
        filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
      },
    },
    numberColumn: {
      valueFormatter: (params) => parseFloat(params.value).toFixed(2),
      cellClass: "text-end",
      filter: "agNumberColumnFilter",
      filterParams: {
        filterOptions: [
          "equals",
          "notEqual",
          "lessThan",
          "lessThanOrEqual",
          "greaterThan",
          "greaterThanOrEqual",
          "inRange",
        ],
      },
    },
  },
  tooltipShowDelay: 0,
  tooltipHideDelay: 2000,
  rowModelType: "serverSide",
  serverSideInfiniteScroll: true,
  cacheBlockSize: 50,
  maxBlocksInCache: 10,
  processCellForClipboard: (params) => {
    let field = params.column.colId;

    if (field == "status_id") {
      return params.node.data.status;
    } else if (["sales_date", "in_date", "out_date"].includes(field)) {
      return new Date(params.value).toLocaleDateString("en-GB");
    } else {
      return params.value;
    }
  },
  processCellFromClipboard: (params) => {
    let field = params.column.colId;
    let value = params.value;

    if (field == "status_id") {
      let objArray = params.column.colDef.cellEditorParams.values;
      value = objArray.find((obj) => obj.label === params.value).value;
    } else if (["purchase", "sales", "opr_cost"].includes(field)) {
      value = value.replace(/[^\d].+/, "");
    }
    return value;
  },
  onCellValueChanged: (params) => {
    body = {
      id: params.data.id,
      [params.colDef.field]: params.newValue,
    };
    ajax("/api/update", body).then((response) => response);
  },
};

async function ajax(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function renderResID(params) {
  return `<a target="_blank" rel="noopener noreferrer"
          href="https://gwg-du.meeting-point.com/Pages/Membership/Panel.aspx?M=EditReservation&ID=${params.value}">
            ${params.value}
          </a>`;
}

function renderSpinner(params) {
  if (params.value !== undefined) {
    return params.value;
  } else {
    return `<div class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>`;
  }
}

function loadHotel(response) {
  let colDefs = reservGridOpts.api.getColumnDefs();
  colDefs[6].cellEditorParams.values = response;
  reservGridOpts.api.setColumnDefs(colDefs);
}

function loadStatus(response) {
  let colDefs = reservGridOpts.api.getColumnDefs();
  let mapping = Object.assign(
    {},
    ...response.map((obj) => ({ [obj.value]: obj.label }))
  );
  colDefs[0].cellEditorParams.values = response;
  colDefs[0].refData = mapping;
  reservGridOpts.api.setColumnDefs(colDefs);
}

function setFilterParams(params) {
  ajax("/api/filter", {
    attr: params.colDef.field,
    filterModel: params.api.getFilterModel(),
  })
    .then((response) => {
      params.success(response);
    })
    .catch((error) => {
      console.error(error);
    });
}
