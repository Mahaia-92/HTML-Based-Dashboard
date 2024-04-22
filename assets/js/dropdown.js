
// Get references to the select element and paragraph container
const optionSelect = document.getElementById('optionSelect');
const paragraphContainer = document.getElementById('paragraphContainer');

// Function to update the paragraph content based on selected option
function updateParagraph() {
  const selectedOption = optionSelect.value;
  let content = '';

  // Retrieve content from hidden div based on selected option
  switch (selectedOption) {
    case '1':
      content = document.getElementById('content1').innerHTML;
      break;
    case '2':
      content = document.getElementById('content2').innerHTML;
      break;
    case '3':
      content = document.getElementById('content3').innerHTML;
      break;
    default:
      content = '';
  }

  // Update the paragraph container with the selected content
  paragraphContainer.innerHTML = content;
}



// Add event listener to the select element
optionSelect.addEventListener('change', updateParagraph);

// Initial update to display default content
updateParagraph();
