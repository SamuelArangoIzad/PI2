document.addEventListener('DOMContentLoaded', () => {
    const subscribeBtn = document.querySelector('.btn-subscribe');
    const overlay = document.getElementById('subscribe-overlay');
    const acceptBtn = document.getElementById('subscribe-accept');
    const cancelBtn = document.getElementById('subscribe-cancel');
    const emailInput = document.getElementById('email-input');

    // Mostrar overlay al hacer clic en el botón de suscripción
    subscribeBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });

    
    // Cerrar overlay al hacer clic en cancelar o aceptar
    cancelBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        emailInput.value = '';
    });


    // Enviar datos de suscripción al backend clase suscripciones.js
    acceptBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();

        if (!email || !email.includes('@')) {
            alert('Por favor ingresa un correo válido.');
            return;
        }

        try {
            const response = await fetch('/api/suscribirse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const result = await response.json();
            if (response.ok) {
                alert('¡Gracias por suscribirte!');
                overlay.style.display = 'none';
                emailInput.value = '';
            } else {
                alert(result.error || 'Error al suscribirse');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en el servidor.');
        }
    });
});
