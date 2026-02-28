const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

async function loadMenu() {
    try {
        const response = await fetch('http://localhost:5000/api/menu');
        const items = await response.json();
        const container = document.querySelector('.menu-container');

        container.innerHTML = '';
        items.forEach(item => {
            container.innerHTML += `
                <div class="food-card" data-category="${item.category}">
                    <div class="image-box">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="food-info">
                        <h3>${item.name}</h3>
                        <p class="price">${item.price} Birr</p>
                    </div>
                </div>
            `;
        });

        activateFilter();

    } catch (error) {
        console.error("Error loading menu:", error);
    }
}

// FILTER FUNCTION
function activateFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const foodCards = document.querySelectorAll('.food-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;

            foodCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', loadMenu)