const setEditModal = (id) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/items/${id}`, false);
    xhttp.send();

    const item = JSON.parse(xhttp.responseText);

    const { itemName, itemDiscription, itemType } = item;

    document.getElementById("itemName").value = itemName;
    document.getElementById("itemDiscription").value = itemDiscription;
    document.getElementById("itemType").value = itemType;

    // Setting up the action URL for the edit form
    document.getElementById("editForm").action = `http://localhost:3000/items/update/${id}`;

    // Listen for form submission and reload page after successful submission
    document.getElementById("editForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target);
        const editData = {
            itemName: formData.get("itemName"),
            itemDiscription: formData.get("itemDiscription"),
            itemType: formData.get("itemType")
        };

        try {
            const response = await fetch(`http://localhost:3000/items/update/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editData)
            });

            if (response.ok) {
                // alert("Item updated successfully");
                location.reload(); // Reload the page after successful edit
            } else {
                throw new Error("Failed to update item");
            }
        } catch (error) {
            console.error("Error:", error);
            // alert("Failed to update item");
        }
    });
};

  

const deleteItem = (id) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/items/${id}`, false);
    xhttp.send();

    // Reloading the page
    location.reload();
}



const loadItems = () => {

  const xhttp = new XMLHttpRequest(); // Corrected variable name

  xhttp.open("GET", "http://localhost:3000/items/", false);
  xhttp.send();

  const items = JSON.parse(xhttp.responseText);
    console.log(items)
  for (let item of items) {
      const x = `
          <div class="col-4">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${item._id}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${item.itemName}</h6>

                      <div>Description: ${item.itemDiscription}</div>
                      <div>Type: ${item.itemType}</div>

                      <hr>

                      <button type="button" class="btn btn-danger" onClick="deleteItem('${item._id}')">Delete</button>
                      <button type="button" class="btn btn-primary" data-toggle="modal" 
                          data-target="#editItemModal" onClick="setEditModal('${item._id}')">
                          Edit
                      </button>
                  </div>
              </div>
          </div>
      `;

      document.getElementById("items").innerHTML =
      document.getElementById("items").innerHTML + x;
  }
};



loadItems();

