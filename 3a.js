// Vegetable data (replace with your own data)
const vegetableData = {
  tomato: {
    price: "Rs: 7",
    market: "Local Farmers Market",
    season: "Summer",
    growingSeason: "April - September",
    nextYearPrice: "Rs: 9"
  },
  carrot: {
    price: "Rs: 9",
    market: "Supermarket",
    season: "Year-round",
    growingSeason: "March - November",
    nextYearPrice: "Rs: 10"
  },
  spinach: {
    price: "Rs: 9",
    market: "Organic Food Store",
    season: "Spring, Fall",
    growingSeason: "March - May, September - November",
    nextYearPrice: "Rs: 10"
  },
  // Add more vegetable details here...
};

function displayUserMessage(message) {
  const messageContainer = document.getElementById('messageContainer');
  const messageHTML = `<div class="message user-message">${message}</div>`;
  messageContainer.innerHTML += messageHTML;
}

function displaySystemMessage(message) {
  const messageContainer = document.getElementById('messageContainer');
  const messageHTML = `<div class="message system-message">${message}</div>`;
  messageContainer.innerHTML += messageHTML;
}

function displayOptions(vegetableName, vegetableOptions) {
  const buttonHTML = vegetableOptions
    .map(option => `<button onclick="handleOptionClick('${vegetableName}', '${option}')">${option}</button>`)
    .join(' ');

  const systemMessage = `
    <div class="system-message">
      <strong>Choose an option:</strong><br>
      ${buttonHTML}
    </div>
  `;
  displaySystemMessage(systemMessage);
}

function displayOptionDetails(option, value) {
  const systemMessage = `
    <div class="system-message">
      <strong>${option}:</strong> ${value || "N/A"}
    </div>
  `;
  displaySystemMessage(systemMessage);
}

function sendMessage() {
  const userInput = document.getElementById('userInput');
  const userMessage = userInput.value;

  if (userMessage.trim() === '') {
    return;
  }

  displayUserMessage(userMessage);
  processUserMessage(userMessage);

  userInput.value = '';
}

function processUserMessage(message) {
  const vegetableName = message.toLowerCase();

  if (vegetableData.hasOwnProperty(vegetableName)) {
    const vegetableOptions = Object.keys(vegetableData[vegetableName]);
    displayOptions(vegetableName, vegetableOptions);
  } else {
    displaySystemMessage(`No details found for '${message}'`);
  }
}

function handleOptionClick(vegetableName, option) {
  const value = vegetableData[vegetableName][option];
  displayOptionDetails(option, value);
}
