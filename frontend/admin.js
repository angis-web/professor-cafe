// 1. SET THE API URL
// When you host on Render, replace 'http://localhost:5000' with your Render link
const API_URL = 'http://localhost:5000/api/menu';

let editMode = false;
let editId = null;

async function loadMenu() {
    try {
        const response = await fetch(API_URL);
        const items = await response.json();

        const container = document.getElementById('adminList');
        container.innerHTML = '';

        items.forEach(item => {
            // IMPORTANT: MongoDB uses item._id instead of item.id
            container.innerHTML += `
                <div class="admin-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        ${item.price} Birr - ${item.category}
                    </div>
                    <div class="admin-buttons">
                        <button class="edit-btn" onclick="startEdit('${item._id}', '${item.name}', ${item.price}, '${item.category}', '${item.image}')">Edit</button>
                        <button class="delete-btn" onclick="deleteItem('${item._id}')">Delete</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading menu:", error);
    }
}

let deleteId = null;

function deleteItem(id) {
    deleteId = id; // This is now the MongoDB _id string
    document.getElementById('deleteModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('deleteModal').style.display = 'none';
    deleteId = null;
}

async function confirmDelete() {
    if (!deleteId) return;

    await fetch(`${API_URL}/${deleteId}`, {
        method: 'DELETE'
    });

    closeModal();
    loadMenu(); 
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
        // Update existing item using editId (_id)
        await fetch(`${API_URL}/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        editMode = false;
        editId = null;

        document.getElementById('formTitle').innerText = "Add Menu Item";
        document.getElementById('submitBtn').innerText = "Add Item";

    } else {
        // Add new item
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    this.reset();
    loadMenu();
});

loadMenu();