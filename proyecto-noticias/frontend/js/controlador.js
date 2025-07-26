document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('news-container');

    fetch('data/noticias.json')
        .then(response => response.json())
        .then(noticias => {
            noticias.forEach(noticia => {
                const card = document.createElement('div');
                card.classList.add('news-card');

                card.innerHTML = `
                    <img src="${noticia.imagen}" alt="Imagen noticia">
                    <h2>${noticia.titulo}</h2>
                    <p>${noticia.descripcion}</p>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error cargando noticias:', error));
});
