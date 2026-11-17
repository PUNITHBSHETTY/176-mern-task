const form = document.getElementById("itemForm");
const list = document.getElementById("itemList");

let editId = null;

// Display items
async function displayItems() {
    const res = await fetch('/items');
    const items = await res.json();

    list.innerHTML = "";

    items.forEach(item => {
        list.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <button onclick="editItem(${item.id}, '${item.name}', ${item.price})">Edit</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </td>
            </tr>`;
    });
}

// Add or Update item
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const item = {
        name: document.getElementById("name").value,
        price: Number(document.getElementById("price").value)
    };

    if (editId === null) {
        await fetch('/items', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        });
    } else {
        await fetch('/items/' + editId, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        });
        editId = null;
    }

    form.reset();
    displayItems();
});

// Edit item
function editItem(id, name, price) {
    editId = id;
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
}

// Delete item
async function deleteItem(id) {
    await fetch('/items/' + id, {method: 'DELETE'});
    displayItems();
}

displayItems();