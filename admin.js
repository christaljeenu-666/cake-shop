// Authentication Check
if (sessionStorage.getItem('bakeone_admin_session') !== 'true') {
    window.location.href = 'login.html';
}

function logout() {
    sessionStorage.removeItem('bakeone_admin_session');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    renderInventory();

    document.getElementById('add-product-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addProduct();
    });
});

function getProducts() {
    return JSON.parse(localStorage.getItem('bakeone_products')) || [];
}

function saveProducts(products) {
    localStorage.setItem('bakeone_products', JSON.stringify(products));
}

function renderInventory() {
    const list = document.getElementById('inventory-list');
    const products = getProducts();

    list.innerHTML = '';

    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${p.id}</td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>
                <button class="action-btn" style="background: var(--secondary); color: #1a1a2e; margin-right: 5px;" onclick="editProduct(${p.id})">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
        `;
        list.appendChild(tr);
    });
}

// Auto format price with Rupee symbol
document.addEventListener('DOMContentLoaded', () => {
    const priceInput = document.getElementById('prod-price');
    if (priceInput) {
        priceInput.addEventListener('input', function (e) {
            // Remove all non-numeric characters
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length > 0) {
                // Prepend Rupee symbol
                e.target.value = '₹' + value;
            } else {
                e.target.value = '';
            }
        });
    }
});

// Auto format price with Rupee symbol
document.addEventListener('DOMContentLoaded', () => {
    const priceInput = document.getElementById('prod-price');
    if (priceInput) {
        priceInput.addEventListener('input', function (e) {
            // Remove all non-numeric characters
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length > 0) {
                // Prepend Rupee symbol
                e.target.value = '₹' + value;
            } else {
                e.target.value = '';
            }
        });
    }
});

function addProduct() {
    const nameInput = document.getElementById('prod-name');
    const priceInput = document.getElementById('prod-price');
    const imageInput = document.getElementById('prod-image');

    const newProduct = {
        id: Date.now(), // simple unique id 
        name: nameInput.value,
        price: priceInput.value,
        image: imageInput.value
    };

    const products = getProducts();
    products.push(newProduct);
    saveProducts(products);

    // Reset form and re-render
    document.getElementById('add-product-form').reset();
    renderInventory();
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = getProducts();
        products = products.filter(p => p.id !== id);
        saveProducts(products);
        renderInventory();
    }
}

// Edit functionality
let editingId = null;

function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (!product) return;

    // Populate form
    document.getElementById('prod-name').value = product.name;
    document.getElementById('prod-price').value = product.price;
    document.getElementById('prod-image').value = product.image;

    // Change button text and mode
    const btn = document.querySelector('#add-product-form button');
    btn.textContent = 'Update Product';

    // Smooth scroll to form
    document.querySelector('.admin-setup-card, .admin-container').scrollIntoView({ behavior: 'smooth' });
    editingId = id;
}

// Modify existing form submission
document.getElementById('add-product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (editingId) {
        saveEditedProduct();
    } else {
        addProduct();
    }
});

function saveEditedProduct() {
    const nameInput = document.getElementById('prod-name').value;
    const priceInput = document.getElementById('prod-price').value;
    const imageInput = document.getElementById('prod-image').value;

    let products = getProducts();
    const index = products.findIndex(p => p.id === editingId);

    if (index !== -1) {
        products[index] = {
            ...products[index],
            name: nameInput,
            price: priceInput,
            image: imageInput
        };

        saveProducts(products);
        renderInventory();

        // Reset form
        document.getElementById('add-product-form').reset();
        document.querySelector('#add-product-form button').textContent = 'Add Product';
        editingId = null;
    }
}
