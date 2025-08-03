document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.btn-login');
    const loginOverlay = document.getElementById('login-overlay');
    const loginCancel = document.getElementById('login-cancel');
    const loginAccept = document.getElementById('login-accept');
    const userSection = document.getElementById('user-section');
    const userAvatar = document.getElementById('user-avatar');
    const userMenu = document.getElementById('user-menu');
    const logoutBtn = document.getElementById('logout-btn');
    const editProfileBtn = document.getElementById('edit-profile');
    const closePanelBtn = document.getElementById('close-panel');
    const userPanel = document.getElementById('user-panel');

    let currentUser = {};

    // Mostrar modal login
    loginBtn.addEventListener('click', () => {
        loginOverlay.style.display = 'flex';
    });

    // Cerrar modal login
    loginCancel.addEventListener('click', () => {
        loginOverlay.style.display = 'none';
        clearLoginForm();
    });

    // Botón cerrar panel (X)
    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', () => {
            userPanel.style.display = 'none';
        });
    }


    // Login
    loginAccept.addEventListener('click', async () => {
        const usuario = document.getElementById('username').value.trim();
        const contrasena = document.getElementById('password').value.trim();

        if (!usuario || !contrasena) {
            alert('Por favor ingresa usuario y contraseña.');
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, contrasena })
            });

            const data = await response.json();

            if (response.ok) {
                //LOgin exitoso
                alert(data.message);


                //GUARDAR EL USUARIO GLOBALMENTE EN LA SESIÓN
                currentUser = {
                    usuario: data.usuario,
                    email: data.email,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    telefono: data.telefono
                };

                //OCULTAR MODAL LOGIN Y BOTON
                loginOverlay.style.display = 'none';
                loginBtn.style.display = 'none';

                //MOSTRAR AVATAR
                userSection.style.display = 'flex';
                userAvatar.src = './assets/userIconDefault.png';

                clearLoginForm();

                // Toggle menú
                userAvatar.onclick = () => {
                    userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
                };

                // Editar perfil
                editProfileBtn.addEventListener('click', () => {

                    userMenu.style.display = 'none'; // Ocultar el menú al editar perfil
                    document.getElementById('user-panel').style.display = 'flex'; // Mostrar el panel de usuario

                    document.getElementById('edit-username').value = currentUser.usuario || '';
                    document.getElementById('edit-email').value = currentUser.email || '';
                    document.getElementById('edit-nombre').value = currentUser.nombre || '';
                    document.getElementById('edit-apellido').value = currentUser.apellido || '';
                    document.getElementById('edit-telefono').value = currentUser.telefono || '';
                });


                //cambio de tabs
                document.querySelectorAll('.tab-btn').forEach(btn => {

                    btn.addEventListener('click', () => {

                        document.querySelectorAll('.tab-btn').forEach
                        (b => b.classList.remove('active'));

                        btn.classList.add('active');

                        document.querySelectorAll('.tab-content').forEach
                        (tab => tab.classList.remove('active'));

                        document.getElementById(btn.dataset.tab).classList.add('active');

                    });

                });

                //visualización de avatar
                document.getElementById('avatar-upload').addEventListener('change', (e) => {

                    const file = e.target.file[0];

                    if(file){

                        const reader = new FileReader();

                        reader.onload = () => {

                            document.getElementById('profile-avatar').src = reader.result;
                        };

                        reader.readAsDataURL(file);

                    }

                });

                //Guardar cambios

                document.getElementById('profile-form').addEventListener('submit',(e) => {

                    e.preventDefault();

                    alert('Cambios guardados, falta el backend');

                });


                logoutBtn.onclick = () => {
                    logoutUser();
                };


            } else {
                alert(data.error);
            }

        } 
        
        
        
        catch (error) {
            console.error('Error en login:', error);
        }


    });

    function clearLoginForm() {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }

    function logoutUser() {
        userSection.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        userMenu.style.display = 'none';
        userPanel.style.display = 'none';
        currentUser = {};
        alert('Has cerrado sesión correctamente.');
    }
});
