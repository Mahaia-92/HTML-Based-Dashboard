// Function to check if user is logged in
function checkLoggedIn() {
    // Check if isLoggedIn flag is set in localStorage
    if (!localStorage.getItem('isLoggedIn')) {
        // Redirect to index.html if not logged in
        window.location.href = '../../index.html';
    }
}

// Check login status when page loads
window.onload = checkLoggedIn;




