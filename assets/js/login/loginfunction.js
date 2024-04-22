//User Authentication function handle form this java file

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get selected department, username, and password
  const department = this.department.value;
  const username = this.username.value;
  const password = this.password.value;

  console.log('Form submitted with:', department, username, password);

  // Fetch data from CSV file and authenticate users
  fetch('login_details.csv')
    .then(response => response.text())
    .then(text => {
      const rows = text.split('\n').map(row => row.split(','));
      console.log('CSV rows:', rows);
      authenticateUser(department, username, password, rows);
    })
    .catch(error => console.error('Error fetching CSV file:', error));
});

function authenticateUser(department, username, password, rows) {
  // Find matching credentials for the selected department
  const filteredRows = rows.filter(row => row[0] === department);
  console.log('Filtered rows for department:', filteredRows);
  
  const credentials = filteredRows.find(row => row[1] === username && row[2] === password);
  console.log('Credentials found:', credentials);

  //Login Cache Save Function
  if (credentials) {
    // Set isLoggedIn flag in localStorage upon successful login
    localStorage.setItem('isLoggedIn', 'true');

    // Redirect to the corresponding dashboard URL
    window.location.href = credentials[3];
  } else {
    // Handle incorrect credentials
    const notification = document.getElementById('errornotification');
      notification.textContent = 'User Name, Password or Your Section is Incorrect';
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 5000); 
  }
}