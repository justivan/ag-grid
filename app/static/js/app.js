document.addEventListener("DOMContentLoaded", () => {
    const reservGrid = document.querySelector("#reserv-grid");
    new agGrid.Grid(reservGrid, reservGridOpts);
  
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
  
    reservGridOpts.api.setServerSideDatasource(dataSource);
  });