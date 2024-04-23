# Project Overview 🌟

This is a Dashboard system that created based on HTML , CSS and Javascript based on Bootstrap 05. You can use this project for create management related dashboard if some one don't have database knowledge. you can easily integrate google form , google sheets as a database to this system.

## Technologies Used 💻

This is a frontend-based dashboard connected to Google Sheets and Google Forms for database management.

- **Frontend:** HTML, CSS, JavaScript, SCSS

## Features 🚀

- **User Authentication System with Panel Based** (`loginfunction.js`)
  - For user details, please refer to: `login_details.csv`

- **Login Protect System with Cache Clear** (`loginprotect.js`)
  - After logging into the system, users can't share the login panel URL with anyone. If they share it, they will automatically be redirected to the login panel.

- **Clipboard Function**
  - When user click on a clipboard copy button then the content copied to the clipboard. You can view more details on `clipboard_copy_card.html` file.

- **HTML Form Submitting Data Saved in Google Sheets**
  - In this database there is no database so when system use HTML forms in the system data saved in Google Sheets.

## Upcoming Features ✅


## Support Contents (USAGE) 📝

### 🟢 Add a USER to the system

- You need to edit the `login_details.csv` file for this.
- Data Entering Format is `panelName, username, password, dashboardURL`


### 🟢 For Connect HTML form with Google Sheet

#### 01 Step : Prepare the HTML Form
You need to setup your HTML form correctly to eacute this process. To get clear idea you can visit the `form_and_googlesheet.html` file and I already add some important comments on the code. For better understand I will explain it below.

- **Add a name to your form :** Inside the `<form>` tag add a suitable name for that based on your requirement *(line no 150)* for an example like this way `<form action="#" class="form" name="example form">` to add a name u can used `name=""` variable.

- **Add names for every inputs :** For this add a name for every value or input data in your form Otherwise your input data will not read in the Google Sheet. for and example go through the line numbers 153,157,163 like that way add a name inside the `<input>` tag. Example : `<input name="Email Address"/>`

- **Drop Down Function Value Assign :** In your form if that you add drop down selection the name assign part may be some different little bit. First you need to give a name to the  `<select>` tag *(line no 166)* after that assign values to every options. Otherwise that data will not save under the select tag name. *(lines 168, 169)* to do that use `value=""` variable.

- **Submit Button :** In my case I used submit word for demonstration purposes and there is no issue to use that word in your projects also. But you can change the button name as your wish according to your form type. to ready your button component you need to add and assign value to word **submit** *(line no 192)* 
`type="submit" value="submit"` 

#### 02 Step : Setup JS Function FIle
Create a java script file and you can called that java script name as your preference. In my case for the demonstration I called that file `googlesheet.js` 
make sure to connect this file to your HTML code inside the body tag *(HTML File line no 221)*

- Copy below code and paste that in your JS file that you created.
```javascript
const scriptURL = 'YOUR GOOGLE SCRIPT WEB APP URL';

const form = document.forms['example form']; // Enter your form name here

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
```
- To preview this notification to the customers you need to add the notification dev class to the HTML form. to get and idea please go *(line no 205)* In HTML Code file. and you need to connect notification CSS file also *(line number 14)*. If you are implement the Notification Style in your main CSS code that is not a problem and you can do that it as your wish.

#### 03 Step : Setup Google Sheet

- Go to your google sheet and add edit your first row panel to your form input and drop downs names. In my example to store the Full Name I need to add that google sheet in *Name* because I named that input variable name to **Name**. *(line no 153) in HTML file* `<input type="text" name="Email" placeholder="Enter email address" required />` 


- Setup Google App Script
    - Open Script Editor: In your Google Sheets spreadsheet, click on `Extensions > Apps Script` to open the Google Apps Script editor.

    - Write Your Script: In the Apps Script editor, you can write your Google Apps Script code. This code will interact with your Google Sheet data and define the behavior of your web app. For that copy below code and paste it there.

```javascript
const sheetName = 'Sheet1'; // Define the name of the sheet where form data will be stored
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


- Deploy the Web App - Click on the disk icon to save your Apps Script project. - To deploy your web app, click on Deploy > New Deployment. - Choose Deployment Type: Select Web app. - Project Version: Select New if deploying for the first time. - Execute as: Choose your Google account (typically, yourself). - Who has access: Choose Anyone or Anyone within your organization. - Click Deploy.

- Access Your Web App After deployment, you will receive a URL for your web app. Copy that web app URL and copy that you created javacript code. For your Understand its on `const scriptURL = 'YOUR GOOGLE SCRIPT WEB APP URL';` this line


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

The "HTML Dashboard" is a basic open-source template used to demonstrate how the functions work, along with other JavaScript functions and custom notifications developed by the project's author mentioned above.

©️ 2024 DaviQ Technologies
