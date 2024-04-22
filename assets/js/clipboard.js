document.getElementById('copyButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    var linkToCopy = this.getAttribute('href');
    
    // Create a temporary input element
    var tempInput = document.createElement('input');
    tempInput.value = linkToCopy;
    document.body.appendChild(tempInput);
    
    // Select the value inside the input element
    tempInput.select();
    
    // Execute the copy command
    document.execCommand('copy');
    
    // Remove the temporary input element
    document.body.removeChild(tempInput);
    
    // Display a custom notification
    var notification = document.getElementById('notification');
    notification.textContent = 'Link copied to clipboard, share this link with the player';
    notification.style.display = 'block';
    
    // Hide the notification after a short delay (e.g., 2 seconds)
    setTimeout(function() {
        notification.style.display = 'none';
    }, 5000);
});

