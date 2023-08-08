const axios = require('axios');

async function searchForItems(query) {
    try {
        const response = await axios.get(`https://api.pathofexile.com/search?query=${query}`);
        const items = response.data.items; // This depends on the API's response structure
        displaySearchResults(items);
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}

function executeSearch() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        searchForItems(query);
    }
}

function displaySearchResults(items) {
    const searchResultsList = document.getElementById('searchResults');
    searchResultsList.innerHTML = ''; // Clear previous results

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name; // This assumes each item has a 'name' property
        searchResultsList.appendChild(listItem);
    });
}

async function getItemPrice(itemId) {
    try {
        const response = await axios.get(`https://api.pathofexile.com/items/${itemId}/price`);
        return response.data.price; // This assumes the API returns the price directly
    } catch (error) {
        console.error("Error fetching item price:", error);
    }
}
function navigate(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the selected page
    document.getElementById(pageId).style.display = 'block';
}

