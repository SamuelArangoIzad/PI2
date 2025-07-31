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
    

    // Mostrar modal
    loginBtn.addEventListener('click', () => {
        loginOverlay.style.display = 'flex';
    });

    // Cerrar modal
    loginCancel.addEventListener('click', () => {
        loginOverlay.style.display = 'none';
        clearLoginForm();
    });



    // let permite reasignación y const no permite reasignación
    // Variable para almacenar el usuario actual
    // Esto permite que el usuario actual se mantenga en la sesión

    let currentUser = {};


    // Acción al dar clic en "Ingresar" envía el fronted de datos al backend a la clase entrada.js
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
                // Login exitoso
                alert(data.message);

                // GUARDAR EL USUARIO GLOBALMENTE DE LA SESIÓN

                currentUser = {
                    usuario: data.usuario,
                    email: data.email,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    telefono: data.telefono
                };


                //OCULTAR LOGIN MODAL Y BOTON
                loginOverlay.style.display = 'none';
                loginBtn.style.display = 'none';

                //MOSTRAR AVATAR

                userSection.style.display = 'flex';
                userAvatar.src = './assets/userIconDefault.png'; // Aquí puedes cambiar la imagen del avatar si es necesario
                // de forma dinamica

                clearLoginForm();

                // TOGGLE MENU DESPLEGABLE
                userAvatar.onclick = () => {
                    userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
                };
                
                // EDITAR PERFIL
                editProfileBtn.addEventListener('click' , () =>{

                    //AQUÍ OCURRE LA MAGIA DE LA PERSONALIZACIÓN DEL PERFIL

                    document.getElementById("close-panel").addEventListener("click", function () {
                        document.getElementById("user-panel").style.display = "none";
                    });
                    
                    userMenu.style.display = 'none'; // Ocultar el menú al editar perfil
                    document.getElementById('user-panel').style.display = 'flex'; // Mostrar el panel de usuario

                    //LLENAR CAMPOS CON DATOS ACTUALES
                    document.getElementById('edit-username').value = currentUser.usuario || ''; // Asignar el nombre de usuario actual
                    document.getElementById('edit-email').value = currentUser.email || '';
                    document.getElementById('edit-nombre').value = currentUser.nombre || '';
                    document.getElementById('edit-apellido').value = currentUser.apellido || '';
                    document.getElementById('edit-telefono').value = currentUser.telefono || '';

                });

                // CAMBIO DE TABS
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


                // TABS

                document.getElementById('return-btn').addEventListener('click' , () => {
                    document.getElementById('user-panel').style.display = 'none'; // Ocultar el panel de usuario
                });


                //CAMBIO DE AVATAR PREVISUALIZACIÓN
                document.getElementById('avatar-upload').addEventListener('change', (e) => {

                    const file = e.target.files[0];

                    if(file){
                        const reader = new FileReader();
                        reader.onload = () => {
                            document.getElementById('profile-avatar').src = reader.result;
                        };

                        reader.readAsDataURL(file);
                    }

                });


                // GUARDAR CAMBIOS SIMULADO FALTA EL BAKCKEND

                document.getElementById('profile-form').addEventListener('submit',(e) => {

                    e.preventDefault();

                    alert('CAMBIOS GUARDADOS, FALTA EL BACKEND.'); // Simulación de guardado
                });


                //CERRAR LA SESIÓN
                logoutBtn.onclick = () => {
                    logoutUser();
                };


            } else {
                alert(data.error);
            }

        } catch (error) {
            console.error('Error en login:', error);
        }
    });


    //LIMPIAR CAMPOS DEL LOGIN
    function clearLoginForm() {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }


    //FUNCIÓN PARA CERRAR SESIÓN COMPLETAMENTE
    function logoutUser(){
        userSection.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        userMenu.style.display = 'none';
        clearLoginForm();
        alert('Has cerrado sesión correctamente.');
    }
    
});