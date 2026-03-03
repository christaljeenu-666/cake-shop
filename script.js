// Initial Product Data (Mocking a Database)
const initialProducts = [
    { id: 1, name: "Velvet Cupcake", price: "₹350.00", image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500&auto=format&fit=crop&q=60", badge: "Best Seller" },
    { id: 2, name: "Glazed Donut", price: "₹180.00", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=60", badge: "Trending" },
    { id: 3, name: "Professional Whisk", price: "₹450.00", image: "https://images.unsplash.com/photo-1594132333420-5c66ccca65f7?w=500&auto=format&fit=crop&q=60", badge: "Bestseller" },
    { id: 4, name: "Silicon Rolling Pin", price: "₹850.00", image: "https://images.unsplash.com/photo-1549428574-d021c7e169da?w=500&auto=format&fit=crop&q=60" },
    { id: 5, name: "Offset Spatula Set", price: "₹550.00", image: "https://images.unsplash.com/photo-1591873550186-b452818987b2?w=500&auto=format&fit=crop&q=60", badge: "New" },
    { id: 6, name: "Digital Oven Thermometer", price: "₹1,100.00", image: "https://images.unsplash.com/photo-1584852928373-c151475c74f5?w=500&auto=format&fit=crop&q=60" },
    { id: 7, name: "Nordic Ware Bundt Pan", price: "₹2,400.00", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
    { id: 8, name: "Copper Mixing Bowls", price: "₹4,200.00", image: "https://images.unsplash.com/photo-1594911771120-0439f00192e4?w=500&auto=format&fit=crop&q=60" },
    { id: 9, name: "Pastry Blow Torch", price: "₹1,350.00", image: "https://images.unsplash.com/photo-1516054966844-38666580dc3e?w=500&auto=format&fit=crop&q=60" },
    { id: 10, name: "Cooling Rack (Double)", price: "₹890.00", image: "https://images.unsplash.com/photo-1586985289946-886616475753?w=500&auto=format&fit=crop&q=60" },
    { id: 11, name: "Silpat Baking Mat", price: "₹1,500.00", image: "https://images.unsplash.com/photo-1556912177-c54030639a48?w=500&auto=format&fit=crop&q=60", badge: "Pro Pick" },
    { id: 12, name: "French Rolling Pin", price: "₹750.00", image: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=500&auto=format&fit=crop&q=60" },
    { id: 13, name: "Bench Scraper", price: "₹320.00", image: "https://images.unsplash.com/photo-1594132333420-5c66ccca65f7?w=500&auto=format&fit=crop&q=60" },
    { id: 14, name: "Adjustable Measuring Cup", price: "₹980.00", image: "https://images.unsplash.com/photo-1584852928373-c151475c74f5?w=500&auto=format&fit=crop&q=60" },
    // 10 New Baking Tools
    { id: 15, name: "Digital Kitchen Scale", price: "₹1,250.00", image: "https://images.unsplash.com/photo-1548625361-ec85d88691f1?w=500&auto=format&fit=crop&q=60", badge: "Essential" },
    { id: 16, name: "Heavy Duty Stand Mixer", price: "₹28,500.00", image: "https://images.unsplash.com/photo-1593348122394-0f1e8f244195?w=500&auto=format&fit=crop&q=60", badge: "Premium" },
    { id: 17, name: "Macaron Baking Kit", price: "₹1,800.00", image: "https://images.unsplash.com/photo-1563716113-17b5f08ca6bc?w=500&auto=format&fit=crop&q=60" },
    { id: 18, name: "Stainless Steel Sifter", price: "₹450.00", image: "https://images.unsplash.com/photo-1516054966844-38666580dc3e?w=500&auto=format&fit=crop&q=60" },
    { id: 19, name: "Adjustable Cake Slicer", price: "₹600.00", image: "https://images.unsplash.com/photo-1594132333420-5c66ccca65f7?w=500&auto=format&fit=crop&q=60" },
    { id: 20, name: "Ceramic Pie Dish", price: "₹1,450.00", image: "https://images.unsplash.com/photo-1598588523910-410a01cedcb4?w=500&auto=format&fit=crop&q=60" },
    { id: 21, name: "Piping Bag & Tips Set", price: "₹1,100.00", image: "https://images.unsplash.com/photo-1513230489240-8df461d9a2ba?w=500&auto=format&fit=crop&q=60", badge: "Bestseller" },
    { id: 22, name: "Perforated Tart Ring", price: "₹380.00", image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500&auto=format&fit=crop&q=60" },
    { id: 23, name: "Fondant Smoother", price: "₹250.00", image: "https://images.unsplash.com/photo-1549428574-d021c7e169da?w=500&auto=format&fit=crop&q=60" },
    { id: 24, name: "Proofing Basket (Banneton)", price: "₹1,650.00", image: "https://images.unsplash.com/photo-1586985289946-886616475753?w=500&auto=format&fit=crop&q=60", badge: "Artisan" }
];

// Force reset of products in local storage for this update
localStorage.setItem('bakeone_products', JSON.stringify(initialProducts));

// Local Storage Setup
if (!localStorage.getItem('bakeone_products')) {
    localStorage.setItem('bakeone_products', JSON.stringify(initialProducts));
} else {
    // Migration: Update existing products to ₹ if they still have $
    let existingProducts = JSON.parse(localStorage.getItem('bakeone_products'));
    let updated = false;
    existingProducts = existingProducts.map(p => {
        if (typeof p.price === 'string' && p.price.includes('$')) {
            updated = true;
            // Simple replacement for migration (e.g. $5 -> ₹400 approx for demo)
            const numericValue = parseFloat(p.price.replace('$', '')) || 0;
            return { ...p, price: '₹' + (numericValue * 80).toFixed(0) };
        }
        return p;
    });
    if (updated) {
        localStorage.setItem('bakeone_products', JSON.stringify(existingProducts));
    }
}

let cart = JSON.parse(localStorage.getItem('bakeone_cart_items')) || [];

function saveCart() {
    localStorage.setItem('bakeone_cart_items', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    if (!cartCountEl) return;
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountEl.textContent = totalItems;
}

updateCartUI();

function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem('bakeone_products')) || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();

    // Visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "Added!";
    btn.style.background = "#2ecc71";
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "var(--primary)";
    }, 1000);

    const icon = document.querySelector('.cart-icon');
    if (icon) {
        icon.style.transform = 'scale(1.2)';
        setTimeout(() => icon.style.transform = 'scale(1)', 200);
    }
}

// Render Products
function renderProducts(searchTerm = '') {
    const grid = document.getElementById('product-grid');
    if (!grid) return; // Only run on main page

    const products = JSON.parse(localStorage.getItem('bakeone_products')) || [];
    grid.innerHTML = ''; // Clear existing

    // Filter products
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.7);">No products found matching your search.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        // Scroll to products instantly if they start searching
        const productsSection = document.getElementById('products');
        if (window.scrollY < productsSection.offsetTop - 100 && searchInput.value.length > 0) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
        renderProducts(searchInput.value);
    }
}


// Ensure products render
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-grid')) {
        renderProducts();
        init3D();
    }

    // Secret Admin Access: Ctrl + Alt + A
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
            window.location.href = 'login.html';
        }
    });
});

// --- THREE.JS 3D ANIMATION ---
function init3D() {
    const container = document.getElementById('canvas-container');
    if (!container) return; // Only run if container exists

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Transparent background
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Geometry - A "Donut" placeholder (Torus)
    const geometry = new THREE.TorusGeometry(1.5, 0.6, 16, 50);

    // Material - Shiny Pink to look like icing
    const material = new THREE.MeshStandardMaterial({
        color: 0xff6b6b,
        roughness: 0.2,
        metalness: 0.1
    });

    const donut = new THREE.Mesh(geometry, material);

    // Give it a jaunty angle
    donut.rotation.x = Math.PI / 4;
    scene.add(donut);

    // Add some "sprinkles" (small particles)
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xf3a683 // Secondary color
    });

    const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleMesh);


    // Handle window resize for canvas
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Slow rotation for the donut
        donut.rotation.y += 0.01;
        donut.rotation.z += 0.005;

        // Slow rotation for sprinkles container
        particleMesh.rotation.y -= 0.002;

        // Floating effect
        donut.position.y = Math.sin(Date.now() * 0.001) * 0.2;

        renderer.render(scene, camera);
    }

    animate();
}
