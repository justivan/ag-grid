class CustomSelect {
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
    let toolTip = params.data.gwg_p_name;

    if (params.colDef.field == "gwg_s_code") {
      toolTip = params.data.gwg_s_name;
    }

    this.eGui = document.createElement("div");
    this.eGui.classList.add(
      "border",
      "border-secondary",
      "px-3",
      "pt-3",
      "bg-light"
    );
    this.eGui.innerHTML = `
            <p>
                <span>${toolTip}</span>
            </p>
        `;
  }

  getGui() {
    return this.eGui;
  }
}

class DatePicker {
  init(params) {
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
    //
  }

  isPopup() {
    return false;
  }
}
