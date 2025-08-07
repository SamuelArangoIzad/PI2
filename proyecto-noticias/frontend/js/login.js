// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       DOM ELEMENT REFERENCES
    ========================== */
    const loginBtn       = document.querySelector('.btn-login');
    const loginOverlay   = document.getElementById('login-overlay');
    const loginCancel    = document.getElementById('login-cancel');
    const loginAccept    = document.getElementById('login-accept');
    const userSection    = document.getElementById('user-section');
    const userAvatar     = document.getElementById('user-avatar');
    const userMenu       = document.getElementById('user-menu');
    const logoutBtn      = document.getElementById('logout-btn');
    const editProfileBtn = document.getElementById('edit-profile');

    // Variable to store the currently logged-in user
    let currentUser = {};

    /* =========================
       LOGIN MODAL CONTROLS
    ========================== */

    // Show login modal
    loginBtn.addEventListener('click', () => {
        loginOverlay.style.display = 'flex';
    });

    // Close login modal
    loginCancel.addEventListener('click', () => {
        loginOverlay.style.display = 'none';
        clearLoginForm();
    });

    /* =========================
       LOGIN PROCESS
    ========================== */

    // Action when clicking "Accept" to send login data to backend
    loginAccept.addEventListener('click', async () => {

        const usuario    = document.getElementById('username').value.trim();
        const contrasena = document.getElementById('password').value.trim();

        // Validate required fields
        if (!usuario || !contrasena) {
            alert('Please enter both username and password.');
            return;
        }

        try {
            // Send login request to backend (POST method)
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, contrasena })
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login
                alert(data.message);

                // Store the user data in currentUser
                currentUser = {
                    usuario:  data.usuario,
                    email:    data.email,
                    nombre:   data.nombre,
                    apellido: data.apellido,
                    telefono: data.telefono
                };

                // Hide login modal and button
                loginOverlay.style.display = 'none';
                loginBtn.style.display     = 'none';

                // Show avatar and user section
                userSection.style.display  = 'flex';
                userAvatar.src             = './assets/userIconDefault.png'; // You can change dynamically if needed

                // Clear login form
                clearLoginForm();

                // Toggle user dropdown menu when clicking avatar
                userAvatar.onclick = () => {
                    userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
                };

                /* =========================
                   EDIT PROFILE PANEL
                ========================== */
                editProfileBtn.addEventListener('click', () => {
                    // Close profile panel button
                    document.getElementById("close-panel").addEventListener("click", function () {
                        document.getElementById("user-panel").style.display = "none";
                    });

                    // Hide menu and show profile panel
                    userMenu.style.display = 'none';
                    document.getElementById('user-panel').style.display = 'flex';

                    // Fill form with current user data
                    document.getElementById('edit-username').value = currentUser.usuario  || '';
                    document.getElementById('edit-email').value    = currentUser.email    || '';
                    document.getElementById('edit-nombre').value   = currentUser.nombre   || '';
                    document.getElementById('edit-apellido').value = currentUser.apellido || '';
                    document.getElementById('edit-telefono').value = currentUser.telefono || '';
                });

                /* =========================
                   TAB SWITCHING FUNCTIONALITY
                ========================== */
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        // Remove "active" class from all buttons
                        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');

                        // Hide all tab contents
                        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

                        // Show the selected tab
                        document.getElementById(btn.dataset.tab).classList.add('active');
                    });
                });

                // Return button to close profile panel
                document.getElementById('return-btn').addEventListener('click', () => {
                    document.getElementById('user-panel').style.display = 'none';
                });

                /* =========================
                   AVATAR PREVIEW BEFORE SAVING
                ========================== */
                document.getElementById('avatar-upload').addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                            document.getElementById('profile-avatar').src = reader.result;
                        };
                        reader.readAsDataURL(file);
                    }
                });

                /* =========================
                   SIMULATED SAVE PROFILE
                ========================== */
                document.getElementById('profile-form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Changes saved (Backend pending).'); // Placeholder
                });

                /* =========================
                   LOGOUT FUNCTIONALITY
                ========================== */
                logoutBtn.onclick = () => {
                    logoutUser();
                };

            } else {
                // Login failed
                alert(data.error);
            }

        } catch (error) {
            console.error('Login error:', error);
        }
    });

    /* =========================
       HELPER FUNCTIONS
    ========================== */

    // Clear login form fields
    function clearLoginForm() {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }

    // Log out user and reset interface
    function logoutUser() {
        userSection.style.display  = 'none';
        loginBtn.style.display     = 'inline-block';
        userMenu.style.display     = 'none';
        clearLoginForm();
        alert('You have successfully logged out.');
    }

});
