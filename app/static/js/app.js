const gridOptions = {
  columnDefs: [
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
      cellRenderer: (params) => {
        return `<a target="_blank" rel="noopener noreferrer"
                href="https://gwg-du.meeting-point.com/Pages/Membership/Panel.aspx?M=EditReservation&ID=${params.value}">
                  ${params.value}
                </a>`;
      },
    },
    {
      headerName: "Voucher",
      field: "bkg_ref",
      width: 90,
      pinned: "left",
      cellRenderer: (params) => {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return `<div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>`;
        }
      },
    },
    {
      headerName: "OprCode",
      field: "opr_code",
      width: 80,
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
      type: "dateColumn",
      hide: true,
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
      cellEditor: DatePicker,
    },
    {
      headerName: "OutDate",
      field: "out_date",
      width: 95,
      type: "dateColumn",
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
    },
    {
      field: "sales",
      width: 80,
      type: "numberColumn",
      cellClassRules: {
        "bg-danger bg-opacity-50": (params) => params.value <= 0,
      },
    },
    {
      headerName: "OprPrice",
      field: "opr_cost",
      width: 80,
      type: "numberColumn",
      cellClassRules: {
        "bg-danger bg-opacity-50": (params) => params.value <= 0,
      },
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
    },
  ],
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
      valueFormatter: (params) => params.value.toFixed(2),
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
  sideBar: {
    toolPanels: ["filters", "columns"],
    position: "left",
  },
  onCellValueChanged: (params) => {
    body = {
      id: params.data.id,
      [params.colDef.field]: params.newValue,
    };
    ajax("/api/update", body).then((response) => response);
  },
  getRowId: (params) => {
    return params.data.id;
  },
  processCellForClipboard: (params) => {
    switch (params.column.colId) {
      case "status_id":
        return params.node.data.status;
        break;
      case "sales_date":
        return new Date(params.value).toLocaleDateString("en-GB");
        break;
      case "in_date":
        return new Date(params.value).toLocaleDateString("en-GB");
        break;
      case "out_date":
        return new Date(params.value).toLocaleDateString("en-GB");
        break;
      default:
        return params.value;
    }
  },
  processCellFromClipboard: (params) => {
    let objArray = params.column.colDef.cellEditorParams.values;
    return objArray.find((obj) => obj.label === params.value).value;
  },
  rowModelType: "serverSide",
  enableRangeSelection: true,
  rowSelection: "multiple",
  enableFillHandle: true,
  rowModelType: "serverSide",
  serverSideInfiniteScroll: true,
  // rowBuffer: 0,
  cacheBlockSize: 100,
  // cacheOverflowSize: 2,
  maxConcurrentDatasourceRequests: 1,
  // infiniteInitialRowCount: 1000,
  maxBlocksInCache: 10,
  tooltipShowDelay: 0,
  tooltipHideDelay: 2000,
  blockLoadDebounceMillis: 500,
  getContextMenuItems: getContextMenuItems,
  fillHandleDirection: "y",

  // enable master detail
  onFirstDataRendered: (params) => {
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  },
  masterDetail: true,
  detailRowAutoHeight: true,
  detailCellRendererParams: {
    detailGridOptions: {
      columnDefs: [
        { headerName: "Booking Code", field: "booking_code" },
        { headerName: "Date", field: "date" },
        { headerName: "Rate", field: "rate" },
        { headerName: "Extra Pax", field: "extra_pax" },
        { headerName: "Extra Child", field: "extra_child" },
        { headerName: "Meal", field: "meal" },
        { headerName: "Meal Child", field: "meal_child" },
        { headerName: "Peak Supp", field: "peak_supp" },
        { headerName: "Extras", field: "extras" },
        { headerName: "Discount", field: "discount" },
        {
          headerName: "Is Extra",
          cellRenderer: (params) => {
            return '<input type="checkbox" name="" id="" checked>';
          },
        },
        {
          headerName: "Is Child",
          field: "discount",
          cellRenderer: (params) => {
            return `<input type='checkbox' ${params.value ? "checked" : ""} />`;
          },
        },
        {
          headerName: "Is Meal",
          field: "discount",
          cellRenderer: (params) => {
            return `<input type='checkbox' ${params.value ? "checked" : ""} />`;
          },
        },
        {
          headerName: "Is Peak",
          field: "discount",
          cellRenderer: (params) => {
            return `<input type='checkbox' ${params.value ? "checked" : ""} />`;
          },
        },
        { headerName: "Total", field: "discount" },

        // {
        //   headerName: "Applies To",
        //   field: "discount",
        //   width: 90,
        //   cellRenderer: (params) => {
        //     return `<input type='checkbox' ${params.value ? "checked" : ""} />`;
        //   },
        // },
      ],
      defaultColDef: {
        flex: 1,
        filter: false,
        sort: false,
        suppressMenu: true,
      },
    },
    getDetailRowData: (params) => {
      // supply details records to detail cell renderer (i.e. detail grid)
      params.successCallback(params.data.callRecords);
    },
  },
};

const reservRate = document.getElementById("reserv-rate");
const priceModal = new bootstrap.Modal(reservRate);

document.addEventListener("DOMContentLoaded", () => {
  const reservGrid = document.querySelector("#reserv-grid");
  new agGrid.Grid(reservGrid, gridOptions);

  ajax("/api/status").then((response) => {
    loadStatus(response);
  });

  ajax("/api/hotel").then((response) => {
    loadHotel(response);
  });

  const dataSource = {
    getRows: (params) => {
      ajax("/api/data", params.request)
        .then((response) => {
          params.successCallback(response.data, response.total_rows);
        })
        .catch((e) => {
          console.error(e);
          params.failCallback();
        });
    },
  };

  gridOptions.api.setServerSideDatasource(dataSource);
});
