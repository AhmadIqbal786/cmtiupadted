// Global error handling
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg);
    showErrorNotification('Something went wrong. Please try again.');
    return false;
};

// Show error notification
function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showInputError(input, 'This field is required');
        } else {
            removeInputError(input);
        }
    });
    
    return isValid;
}

// Show input error
function showInputError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    input.classList.add('error');
}

// Remove input error
function removeInputError(input) {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('error');
}
