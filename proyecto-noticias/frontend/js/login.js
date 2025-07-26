document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.btn-login');
    const loginOverlay = document.getElementById('login-overlay');
    const loginCancel = document.getElementById('login-cancel');
    const loginAccept = document.getElementById('login-accept');

    // Mostrar modal
    loginBtn.addEventListener('click', () => {
        loginOverlay.style.display = 'flex';
    });

    // Cerrar modal
    loginCancel.addEventListener('click', () => {
        loginOverlay.style.display = 'none';
    });

    // Acción al dar clic en "Ingresar" (por ahora solo cerrar modal)
    loginAccept.addEventListener('click', () => {
        alert('Inicio de sesión en desarrollo...');
        loginOverlay.style.display = 'none';
    });
});
