document.addEventListener('DOMContentLoaded', () => {
    const confirmBtn = document.getElementById('confirm-age');

    confirmBtn.addEventListener('click', () => {
        const year = parseInt(document.getElementById('year').value);
        const month = parseInt(document.getElementById('month').value);
        const day = parseInt(document.getElementById('day').value);

        if (!year || !month || !day) {
            alert("Por favor ingresa una fecha completa.");
            return;
        }

        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }


        // En el futuro: aquí aplicaremos la lógica para mostrar noticias según la edad
        document.body.classList.add('loaded'); // Oculta el modal y muestra el contenido
    });
});
