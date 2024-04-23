const scriptURL = '#'

const form = document.forms['example-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Applicant Data Saved Successfully" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})