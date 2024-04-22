# Project Overview 🌟

This project is a dashboard for managing all the administrative tasks related to the StateWide Roleplay server. It is a web-based project where staff can easily access and manage the database according to user-based permissions.

**Integrated Sections**
- Application Team
- High Court Team

## Technologies Used 💻

This is a frontend-based dashboard connected to Google Sheets and Google Forms for database management.

- **Frontend:** HTML, CSS, JavaScript, SCSS
- **Database:** Google Sheets and CSV for user management


## Features 🚀

- **User Authentication System with Panel Based** (`loginfunction.js`)
  - For user details, please refer to: `login_details.csv`

- **Login Protect System with Cache Clear** (`loginprotect.js`)
  - After logging into the system, users can't share the login panel URL with anyone. If they share it, they will automatically be redirected to the login panel.

- **Clipboard Function**
  - In `lawyer.html` file, design a function in `clipboard.js` to copy the form URL to the clipboard.

- **HTML Form Submitting Data Saved in Google Sheets**
  - Form submission will occur on `openday.html` page. The JavaScript function code responsible is located in `opendaygoogle.js`.

## Add a USER to the system

- You need to edit the `login_details.csv` file for this.
- Data Entering Format is `panelName, username, password, dashboardURL`

For your help available panel names are :
- applicationteam
- highcourt

## Support Contents 📝


### 🟢 For Connect HTML form with Google Sheet

**01. In your HTML code add a name to your form inside the `<form>` tag. : Example `<form name="testing-form"> (form content) </form>`**

**02. Create a Javascript file related to your form and copy below code to it**

```javascript
const scriptURL = '#' //google WepApp URL

const form = document.forms['testing-form'] //form name

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Applicant Data Saved Successfully" )) //Default Popup Alert for form submit.
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
```
**03. Creating and Deploying a Web App with Google Apps Script**

Go to Google Sheets and create or open your spreadsheet and give popper name for the sheet name.

- Open Script Editor:
In your Google Sheets spreadsheet, click on `Extensions > Apps Script` to open the Google Apps Script editor.

- Write Your Script:
In the Apps Script editor, you can write your Google Apps Script code. This code will interact with your Google Sheet data and define the behavior of your web app. For that copy below code and paste it there.

```javascript
const sheetName = 'form data'; // Define the name of the sheet where form data will be stored
const scriptProp = PropertiesService.getScriptProperties();

function intialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function(header) {
      return header === 'Date' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```
- Deploy the Web App
      - Click on the disk icon to save your Apps Script project.
      - To deploy your web app, click on Deploy > New Deployment.
      - Choose Deployment Type: Select Web app.
      - Project Version: Select New if deploying for the first time.
      - Execute as: Choose your Google account (typically, yourself).
      - Who has access: Choose Anyone or Anyone within your organization.
      - Click Deploy.

- Access Your Web App
After deployment, you will receive a URL for your web app. Copy that web app URL and copy that you created javacript code `const scriptURL = '#'`.

**04. Finally called the created javascript file to the HTML file in `<script src=""> </script>` tag.**

### 🟢 Clipboard Function
- No need to create separate java script files for every clipboard function working buttons Just create one javascript file and copy below code there and save.

```javascript
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
    
    // Display a custom notification : for this you need to create custom notification design
    // Add this to your HTML file after the button : <div id="clipnotification" class="notification"></div>
    // You need to create a CSS for this as you wish how would this need to show
    var notification = document.getElementById('clipnotification');
    notification.textContent = 'Link copied to clipboard, share this link with the player';
    notification.style.display = 'block';
    
    // Hide the notification after a short delay (e.g., 2 seconds)
    setTimeout(function() {
        notification.style.display = 'none';
    }, 5000);
});
```

- After that change the button id in your HTML file to **copyButton** for read that button function in your HTML code for example : 
`<a href="#" id="copyButton" class="btn btn-primary"><i class="ti ti-clipboard"></i> Copy Application Link</a>` / `<button id="copyButton" class="btn btn-primary"> Copy Application Link </button>`

- to work this function call the created java script file to your HTML code from `<script src=""> </script>` tag.


# Copyright Statement ©️

This project is developed by [Tharindu Darshana](https://github.com/tdbpathiraja) at DaviQ Technologies and is protected under the following copyright:

Fully restructured and added more functional features to the default project interface.

©️ 2024 DaviQ Technologies
