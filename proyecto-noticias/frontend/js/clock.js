document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Clock UI Logic
     *
     * Displays the current day, date, and time in the #datetime element.
     * Updates every minute to keep the time accurate.
     *
     */

    // Get the element where the date and time will be displayed
    const datetimeElement = document.getElementById('datetime');

    /**
     * Updates the #datetime element with the current day, date, and time.
     * Format: Capitalized day name, DD/MM/YYYY / HH:MM
     */
    function updateDateTime() {
        const now = new Date();

        // Get day name, date, and time in Spanish locale
        const options = { weekday: 'long' };
        const dayName = now.toLocaleDateString('es-ES', options);
        const date = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

        // Set formatted string to the element
        datetimeElement.textContent = `${capitalize(dayName)}, ${date} / ${time}`;
    }

    /**
     * Capitalizes the first letter of a string.
     * @param {string} text - The string to capitalize
     * @returns {string} - Capitalized string
     */
    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    // Initial update
    updateDateTime();
    // Update every minute
    setInterval(updateDateTime, 60000); // Updates every minute
});
