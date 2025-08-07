/**
 * Subscribe Controller
 *
 * Handles the subscription modal logic, including opening, closing, and sending subscription data to the backend.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements for subscribe button, overlay, accept/cancel buttons, and email input
    const subscribeBtn = document.querySelector('.btn-subscribe');
    const overlay = document.getElementById('subscribe-overlay');
    const acceptBtn = document.getElementById('subscribe-accept');
    const cancelBtn = document.getElementById('subscribe-cancel');
    const emailInput = document.getElementById('email-input');

    // Show overlay when subscribe button is clicked
    subscribeBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });

    
    // Close overlay when cancel button is clicked
    cancelBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        emailInput.value = '';
    });


    // Send subscription data to backend (suscripciones.js)
    acceptBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();

        if (!email || !email.includes('@')) {
            alert('Please enter a valid email.');
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
                alert('Thank you for subscribing!');
                overlay.style.display = 'none';
                emailInput.value = '';
            } else {
                alert(result.error || 'Subscription error');
            }
        } catch (error) {
            console.error('Request error:', error);
            alert('Server error.');
        }
    });
});
