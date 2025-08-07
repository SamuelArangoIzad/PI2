/**
 * News Controller
 * Loads news articles from a local JSON file and displays them as cards in the #news-container element.
 * The JSON file should contain an array of news objects with 'imagen', 'titulo', and 'descripcion' properties.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get the container element where news cards will be displayed
    const container = document.getElementById('news-container');

    // Fetch news data from the local JSON file
    fetch('data/noticias.json')
        .then(response => response.json()) // Parse the response as JSON
        .then(noticias => {
            // Iterate over each news item in the array
            noticias.forEach(noticia => {
                // Create a new card element for the news item
                const card = document.createElement('div');
                card.classList.add('news-card');

                // Set the card's HTML content with image, title, and description
                card.innerHTML = `
                    <img src="${noticia.imagen}" alt="News image">
                    <h2>${noticia.titulo}</h2>
                    <p>${noticia.descripcion}</p>
                `;

                // Append the card to the container
                container.appendChild(card);
            });
        })
        // Handle errors in fetching or parsing
        .catch(error => console.error('Error loading news:', error));
});
