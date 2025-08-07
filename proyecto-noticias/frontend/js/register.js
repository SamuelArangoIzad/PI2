// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       DOM ELEMENT REFERENCES
    ========================== */
    const loginOverlay     = document.getElementById('login-overlay');
    const registerOverlay  = document.getElementById('register-overlay');

    const btnLogin         = document.querySelector('.btn-login');
    const btnLoginCancel   = document.getElementById('login-cancel');
    const btnRegisterCancel= document.getElementById('register-cancel');
    const linkRegister     = document.getElementById('open-register');
    const btnRegister      = document.getElementById('register-accept');

    /* =========================
       LOGIN MODAL CONTROLS
    ========================== */

    // Open login modal
    btnLogin.addEventListener('click', () => {
        loginOverlay.style.display = 'flex';
    });

    // Close login modal
    btnLoginCancel.addEventListener('click', () => {
        loginOverlay.style.display = 'none';
    });

    /* =========================
       REGISTER MODAL CONTROLS
    ========================== */

    // Open registration modal from login modal
    linkRegister.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        loginOverlay.style.display    = 'none'; // Hide login modal
        registerOverlay.style.display = 'flex'; // Show registration modal
    });

    // Close registration modal
    btnRegisterCancel.addEventListener('click', () => {
        registerOverlay.style.display = 'none';
    });

    /* =========================
       SHOW/HIDE PASSWORD FIELDS
    ========================== */

    // Toggle between showing and hiding password inputs
    document.getElementById('toggle-passwords').addEventListener('change', (e) => {
        const show = e.target.checked; // Boolean: true if checkbox is checked
        const passwordFields = [
            document.getElementById('reg-password'),
            document.getElementById('reg-confirm-password')
        ];
        // Change field type depending on checkbox state
        passwordFields.forEach(field => {
            field.type = show ? 'text' : 'password';
        });
    });

    /* =========================
       REGISTER PROCESS
    ========================== */

    // Send registration data to backend (registro.js)
    btnRegister.addEventListener('click', async () => {

        // Collect and clean input values
        const usuario             = document.getElementById('reg-username').value.trim();
        const email               = document.getElementById('reg-email').value.trim();
        const nombre              = document.getElementById('reg-firstname').value.trim();
        const apellido            = document.getElementById('reg-lastname').value.trim();
        const telefono            = document.getElementById('reg-phone').value.trim();
        const contrasena          = document.getElementById('reg-password').value.trim();
        const confirmarContrasena = document.getElementById('reg-confirm-password').value.trim();

        // Basic validations
        if (!usuario || !email || !nombre || !apellido || !telefono || !contrasena || !confirmarContrasena) {
            alert('Please complete all fields.');
            return;
        }

        if (contrasena !== confirmarContrasena) {
            alert('Passwords do not match.');
            return;
        }

        try {
            // Send POST request with JSON body
            const response = await fetch('/api/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario,
                    email,
                    nombre,
                    apellido,
                    telefono,
                    contrasena,
                    confirmarContrasena
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful
                alert(data.message);
                registerOverlay.style.display = 'none';
            } else {
                // Registration failed
                alert(data.error);
            }

        } catch (error) {
            console.error('Request error:', error);
        }
    });

});
