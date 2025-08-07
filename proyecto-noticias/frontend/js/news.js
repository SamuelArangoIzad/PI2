/**
 * News Side Menu Controller
 * Handles the opening and closing of the side menu for news categories.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements for menu button, side menu, and close button
    const menuBtn = document.getElementById('menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const closeMenu = document.getElementById('close-menu');

    // Open side menu when menu button is clicked
    menuBtn.addEventListener('click', () => {
        sideMenu.classList.add('open');
    });

    // Close side menu when close button is clicked
    closeMenu.addEventListener('click', () => {
        sideMenu.classList.remove('open');
    });
});
