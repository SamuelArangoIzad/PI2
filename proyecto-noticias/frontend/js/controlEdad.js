/**
 * Age Verification Controller
 *
 * Handles the logic for the age verification overlay. If the user confirms they are of age,
 * the overlay is hidden and the main content is shown. If not, a warning is displayed and
 * the user can be redirected to a safe page.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements for overlay and buttons
    const overlay = document.getElementById('age-overlay');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    btnYes.addEventListener('click', () => {
        // Hide the overlay and show main content
        overlay.style.display = 'none';
        document.body.classList.add('loaded');
        // Add logic here for uncensored news if needed
    });

    btnNo.addEventListener('click', () => {
        // Show warning and optionally redirect to a safe page
        alert("Sorry, you cannot access sensitive content.");
        // You could redirect to another page:
        // window.location.href = 'content-for-minors.html';
    });
});
