function showNotification(message, type = 'success', modalSelector = '.subscribe-modal') {
    let container = document.querySelector(`${modalSelector} .subscribe-message`);

    if (!container) {
        const modal = document.querySelector(modalSelector);
        container = document.createElement('div');
        container.className = 'subscribe-message';
        modal.insertBefore(container, modal.querySelector('.subscribe-buttons'));
    }

    container.textContent = message;
    container.className = `subscribe-message ${type}`;
    container.style.display = 'block';

    setTimeout(() => {
        container.style.display = 'none';
    }, 4000);
}
