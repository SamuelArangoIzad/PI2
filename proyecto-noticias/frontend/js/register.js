document.addEventListener('DOMContentLoaded', () => {
    const loginOverlay = document.getElementById('login-overlay');
    const registerOverlay = document.getElementById('register-overlay');

    const btnLogin = document.querySelector('.btn-login');
    const btnLoginCancel = document.getElementById('login-cancel');
    const btnRegisterCancel = document.getElementById('register-cancel');
    const linkRegister = document.getElementById('open-register');
    const btnRegister = document.getElementById('register-accept');

    // Abrir modal login
    btnLogin.addEventListener('click', () => {
        loginOverlay.style.display = 'flex';
    });

    // Cerrar modal login
    btnLoginCancel.addEventListener('click', () => {
        loginOverlay.style.display = 'none';
    });

    // Abrir modal registro desde login
    linkRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginOverlay.style.display = 'none';
        registerOverlay.style.display = 'flex';
    });

    // Cerrar modal registro
    btnRegisterCancel.addEventListener('click', () => {
        registerOverlay.style.display = 'none';
    });

    // Mostrar/Ocultar contraseñas
    document.getElementById('toggle-passwords').addEventListener('change', (e) => {
        const show = e.target.checked;
        const passwordFields = [
            document.getElementById('reg-password'),
            document.getElementById('reg-confirm-password')
        ];
        passwordFields.forEach(field => {
            field.type = show ? 'text' : 'password';
        });
    });


    // Enviar datos de registro al backend clase registro.js
    btnRegister.addEventListener('click', async () => {
        const usuario = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const nombre = document.getElementById('reg-firstname').value.trim();
        const apellido = document.getElementById('reg-lastname').value.trim();
        const telefono = document.getElementById('reg-phone').value.trim();
        const contrasena = document.getElementById('reg-password').value.trim();
        const confirmarContrasena = document.getElementById('reg-confirm-password').value.trim();


        const modalSelector = '.register-modal';

        // Validaciones simples
        if (!usuario || !email || !nombre || !apellido || !telefono || !contrasena || !confirmarContrasena) {
            showNotification('Por favor completa todos los campos.', 'error', modalSelector);
            return;
        }

        if (contrasena !== confirmarContrasena) {
            showNotification('Las contraseñas no coinciden.', 'error', modalSelector);
            return;
        }

        const aceptoTerminos = document.getElementById('accept-terms').checked;

        if(!aceptoTerminos){
            showNotification('Debes aceptar los términos y condiciones.' , 'error', modalSelector);
            return;
        }

        try {
            const response = await fetch('/api/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, email, nombre, apellido, telefono, contrasena, confirmarContrasena})
            });

            const data = await response.json();

            if (response.ok) {
                showNotification(data.message || 'Registro exitoso', 'success', modalSelector);

                

                //TIEMPO 
                setTimeout(() => {
                    registerOverlay.style.display = 'none';
                }, 3000);

                //limpiar campos
                clearRegisterForm();

            } else {
                showNotification(data.error || 'Error en el registro', 'error', modalSelector);
            }
        } catch (error) {
            showNotification('Error al conectar con el servidor.', 'error', modalSelector);
        }
    });

});


// Función para limpiar el formulario
function clearRegisterForm() {
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-firstname').value = '';
    document.getElementById('reg-lastname').value = '';
    document.getElementById('reg-phone').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-confirm-password').value = '';
    document.getElementById('toggle-passwords').checked = false;

    // Asegurarse que los campos vuelvan a tipo password
    document.getElementById('reg-password').type = 'password';
    document.getElementById('reg-confirm-password').type = 'password';
}
