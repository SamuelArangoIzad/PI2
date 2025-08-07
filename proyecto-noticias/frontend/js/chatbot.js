document.addEventListener('DOMContentLoaded', () => {
    /**
     * Chatbot UI Logic
     *
     * Handles the opening, closing, and message sending functionality for the chatbot window.
     *
     * Elements:
     * - .chatbot-button: Floating button to open the chatbot window
     * - #chatbot-window: Main chatbot window container
     * - #close-chat: Button to close the chatbot window
     * - #send-btn: Button to send a message
     * - #user-input: Input field for user messages
     * - .chat-body: Container for chat messages
     *
     */

    // Get DOM elements
    const chatBtn = document.querySelector('.chatbot-button'); // Floating chatbot button
    const chatWindow = document.getElementById('chatbot-window'); // Chatbot window container
    const closeBtn = document.getElementById('close-chat'); // Close button inside chatbot window
    const sendBtn = document.getElementById('send-btn'); // Send message button
    const userInput = document.getElementById('user-input'); // Input field for user text
    const chatBody = document.querySelector('.chat-body'); // Chat message container

    /**
     * Opens the chatbot window by setting its display to 'flex'.
     */
    chatBtn.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
    });

    /**
     * Closes the chatbot window by setting its display to 'none'.
     */
    closeBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    /**
     * Handles sending a user message:
     * - Reads and trims the input value
     * - If not empty, creates a styled message element
     * - Appends it to the chat body
     * - Scrolls to the latest message
     * - Clears the input field
     */
    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            // Create user message element
            const userMsg = document.createElement('p');
            userMsg.classList.add('user-msg');
            // Inline styles for user message bubble
            userMsg.style.background = '#004080';
            userMsg.style.color = '#fff';
            userMsg.style.padding = '8px';
            userMsg.style.borderRadius = '8px';
            userMsg.style.marginBottom = '8px';
            userMsg.style.maxWidth = '80%';
            userMsg.style.marginLeft = 'auto';
            userMsg.textContent = message;

            // Add message to chat body
            chatBody.appendChild(userMsg);
            // Scroll to bottom to show latest message
            chatBody.scrollTop = chatBody.scrollHeight;
            // Clear input field
            userInput.value = '';
        }
    });
});
