let editMode = false;
let editId = null;

async function loadMenu() {
    const response = await fetch('http://localhost:5000/api/menu');
    const items = await response.json();

    const container = document.getElementById('adminList');
    container.innerHTML = '';

    items.forEach(item => {
        container.innerHTML += `
            <div class="admin-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ${item.price} Birr - ${item.category}
                </div>
                <div class="admin-buttons">
                    <button class="edit-btn" onclick="startEdit(${item.id}, '${item.name}', ${item.price}, '${item.category}', '${item.image}')">Edit</button>
                    <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
                </div>
            </div>
        `;
    });
}

let deleteId = null;

function deleteItem(id) {
    deleteId = id;
    document.getElementById('deleteModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('deleteModal').style.display = 'none';
    deleteId = null;
}

async function confirmDelete() {
    if (!deleteId) return;

    await fetch(`http://localhost:5000/api/menu/${deleteId}`, {
        method: 'DELETE'
    });

    closeModal();
    loadMenu(); // Smooth reload without page refresh
}

function startEdit(id, name, price, category, image) {
    editMode = true;
    editId = id;

    document.getElementById('formTitle').innerText = "Edit Menu Item";
    document.getElementById('submitBtn').innerText = "Update Item";

    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('category').value = category;
    document.getElementById('image').value = image;
}

document.getElementById('menuForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value,
        image: document.getElementById('image').value
    };

    if (editMode) {
        await fetch(`http://localhost:5000/api/menu/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        editMode = false;
        editId = null;

        document.getElementById('formTitle').innerText = "Add Menu Item";
        document.getElementById('submitBtn').innerText = "Add Item";

    } else {
        await fetch('http://localhost:5000/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    this.reset();
    loadMenu();
});

loadMenu();