document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.querySelector('.chatbot-button');
    const chatWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatBody = document.querySelector('.chat-body');

    // Abrir ventana
    chatBtn.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
    });

    // Cerrar ventana
    closeBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // Enviar mensaje
    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            const userMsg = document.createElement('p');
            userMsg.classList.add('user-msg');
            userMsg.style.background = '#004080';
            userMsg.style.color = '#fff';
            userMsg.style.padding = '8px';
            userMsg.style.borderRadius = '8px';
            userMsg.style.marginBottom = '8px';
            userMsg.style.maxWidth = '80%';
            userMsg.style.marginLeft = 'auto';
            userMsg.textContent = message;

            chatBody.appendChild(userMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
            userInput.value = '';
        }
    });
});
