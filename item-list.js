const setEditModal = (id) => {
  const http = new XMLHttpRequest();

  http.open("GET", `http://localhost:3000/book/${isbn}`, false);
  http.send();

  const book = JSON.paerse(http.responseText);

  const { itemName, itemDiscription, itemType } = item;

  document.getElementById("id").value = id;
  document.getElementById("itemName").value = itemName;
  document.getElementById(" itemDiscription").value = itemDiscription;
  document.getElementById("itemType").value = itemType;

  // setting up the action url for the book
  document.getElementById(
    "editForm"
  ).action = `http://localhost:3000/items${id}`;
};

const deleteBook = (id) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("DELETE", `http://localhost:3000/items/${id}`, false);
  xhttp.send();

  location.reload();
};

const loadItems = () => {
  const http = new XMLHttpRequest();

  xhttp.open("GET", "http://localhost:3000/items", false);
  xhttp.send();

  const items = JSON.parse(xhttp.responseText);

  for (let item of items) {
    const x = `
          <div class="col-4">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${item.itemName}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${item.id}</h6>

                      <div>Description: ${item.itemDescription}</div>
                      <div>Type: ${item.itemType}</div>

                      <hr>

                      <button type="button" class="btn btn-danger" onClick="deleteItem(${item.id})">Delete</button>
                      <button type="button" class="btn btn-primary" data-toggle="modal" 
                          data-target="#editItemModal" onClick="setEditModal(${item.id})">
                          Edit
                      </button>
                  </div>
              </div>
          </div>
      `;

    // document.getElementById("items").innerHTML =
    document.getElementById("items").innerHTML + x;
  }
};

loadItems();
