//If you have multiple HTML forms create separate js files for each forms don't add all form names in one js file

const scriptURL = 'https://script.google.com/macros/s/AKfycbxnIe4oGsMJ2G-A2FL3jiyU1dahh1hEbVpx0uS5dtqvNCg44VS7-aydHDnyqZbODpTZ/exec' //Google Web App URL

const form = document.forms['example-form'] //HTML Form Name

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response;
    })
    .then(() => {
      const successNotification = document.getElementById('notification');
      successNotification.textContent = 'Thank you! Your form has been submitted successfully.'; //Success Notification Preview, You can change this
      successNotification.style.display = 'block';
      setTimeout(() => {
        successNotification.style.display = 'none';
        window.location.reload();
      }, 5000); //Notification Preview Time (5000ms = 5s)
    })
    .catch(error => {
      console.error('Error!', error.message);
      const errorNotification = document.getElementById('errornotification');
      errorNotification.textContent = 'There was an error submitting the form. Please try again.'; //Error Notification Preview You can change this
      errorNotification.style.display = 'block';
      setTimeout(() => {
        errorNotification.style.display = 'none';
      }, 5000); //Notification Preview Time (5000ms = 5s)
    });
});