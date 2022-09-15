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

function loadStatus(response) {
  let colDefs = gridOptions.api.getColumnDefs();
  let mapping = Object.assign(
    {},
    ...response.map((obj) => ({ [obj.value]: obj.label }))
  );
  colDefs[0].cellEditorParams.values = response;
  colDefs[0].refData = mapping;
  gridOptions.api.setColumnDefs(colDefs);
}

function loadHotel(response) {
  let colDefs = gridOptions.api.getColumnDefs();
  colDefs[6].cellEditorParams.values = response;
  gridOptions.api.setColumnDefs(colDefs);
}

function getContextMenuItems(params) {
  // reservRate.addEventListener("hide.bs.modal", (event) => {
  //   priceGridOptions.api.destroy();
  // });
  // const columnDefs = [
  //   { headerName: "Date", field: "date", width: 90, checkboxSelection: true },
  //   { headerName: "Rate", field: "rate", width: 90 },
  //   { headerName: "Extra Pax", field: "extra_pax", width: 90 },
  //   { headerName: "Extra Child", field: "extra_child", width: 90 },
  //   { headerName: "Meal", field: "meal", width: 90 },
  //   { headerName: "Meal Child", field: "meal_child", width: 90 },
  //   { headerName: "Peak Supp", field: "peak_supp", width: 90 },
  //   { headerName: "Discount", field: "discount", width: 90 },
  //   {
  //     headerName: "Applies To",
  //     field: "discount",
  //     width: 90,
  //     cellRenderer: (params) => {
  //       return `<input type='checkbox' ${params.value ? "checked" : ""} />`;
  //     },
  //   },
  //   { headerName: "Extras", field: "extras", width: 90 },
  // ];

  // // specify the data
  // const rowData = [
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxster", price: 72000 },
  // ];

  // // let the grid know which columns and what data to use
  // const priceGridOptions = {
  //   columnDefs: columnDefs,
  //   rowData: rowData,
  //   defaultColDef: {
  //     filter: false,
  //     sort: false,
  //     suppressMenu: true,
  //   },
  // };
  return [
    {
      // custom item
      name: "Manual Calculation",
      action: () => {
        console.log(params.node.data.id);
        // const priceGrid = document.getElementById("price-grid");
        // new agGrid.Grid(priceGrid, priceGridOptions);
        // priceModal.show();
      },
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calculator" viewBox="0 0 16 16">
      <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
      <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z"/>
    </svg>`,
    },
    "separator",
    "copy",
    "copyWithHeaders",
    "separator",
    "export",
  ];
}

class DatePicker {
  // gets called once before the renderer is used
  init(params) {
    // create the cell
    this.input = document.createElement("input");
    this.input.type = "date";
    this.input.value = new Date(params.value).toLocaleDateString("en-CA");
    this.input.classList.add("ag-input");
    this.input.style.height = "100%";
    this.input.style.width = "100%";
  }

  getGui() {
    return this.input;
  }

  afterGuiAttached() {
    this.input.focus();
    this.input.select();
  }

  getValue() {
    return this.input.value;
  }

  // any cleanup we need to be done here
  destroy() {
    // but this example is simple, no cleanup, we could
    // even leave this method out as it's optional
  }

  // if true, then this editor will appear in a popup
  isPopup() {
    // and we could leave this method out also, false is the default
    return false;
  }
}

class CustomSelect {
  // gets called once before the renderer is used
  init(params) {
    this.select = document.createElement("select");
    this.select.id = "custom-select";

    this.cellEditorParams = [];

    params.colDef.cellEditorParams.values.forEach((obj) =>
      this.cellEditorParams.push({
        value: obj.value,
        label: obj.label,
        selected: params.value == obj.value ? true : false,
      })
    );
  }

  // gets called once when grid ready to insert the element
  getGui() {
    return this.select;
  }

  // focus and select can be done after the gui is attached
  afterGuiAttached() {
    const element = document.getElementById("custom-select");
    const example = new Choices(element, {
      itemSelectText: "",
    });

    const choicesInner = document.querySelector(".choices__inner");

    let width = Math.max.apply(
      Math,
      this.cellEditorParams.map(function (el) {
        return el.label.length;
      })
    );

    choicesInner.style.minWidth =
      width * 10 > 500 ? `350px` : `${width * 10}px`;
    example.setChoices(this.cellEditorParams, "value", "label", false);

    this.select.focus();
  }
  // returns the new value after editing
  getValue() {
    return this.select.value;
  }

  // any cleanup we need to be done here
  destroy() {}

  // if true, then this editor will appear in a popup
  isPopup() {
    // and we could leave this method out also, false is the default
    return true;
  }
}

class CustomTooltip {
  init(params) {
    const eGui = (this.eGui = document.createElement("div"));
    const color = params.color || "white";
    const data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    console.log(data);
    eGui.classList.add(
      "border",
      "border-secondary",
      "px-3",
      "pt-3",
      "bg-light"
    );
    eGui.innerHTML = `
            <p>
                <span>${data.gwg_p_name}</span>
            </p>
        `;
  }

  getGui() {
    return this.eGui;
  }
}
