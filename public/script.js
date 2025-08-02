async function fetchItems() {
    try {
        const res = await fetch('/api/items');
        const items = await res.json();
        const container = document.getElementById('items-container');
        container.innerHTML = '';

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <a href="${item.link}" target="_blank">View Item</a>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        console.error('Error fetching items:', err);
    }
}

// Initial fetch
fetchItems();

// Auto-refresh every 15 minutes (900,000 ms)
setInterval(fetchItems, 900000);