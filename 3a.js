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
    price: "Rs: 8",
    market: "Supermarket",
    season: "Year-round",
    growingSeason: "March - November",
    nextYearPrice: "Rs: 10"
  },
  spinach: {
    price: "Rs: 7",
    market: "Organic Food Store",
    season: "Spring, Fall",
    growingSeason: "March - May, September - November",
    nextYearPrice: "Rs: 9"
  },
  // Add more vegetable data here...
};

const messageContainer = document.getElementById('messageContainer');
const resetButton = document.getElementById('resetButton');

function displayUserMessage(message) {
  const userMessage = `
    <div class="message user-message">
      ${message}
    </div>
  `;
  messageContainer.innerHTML += userMessage;
}

function displaySystemMessage(message) {
  const systemMessage = `
    <div class="message system-message">
      ${message}
    </div>
  `;
  messageContainer.innerHTML += systemMessage;
}

function displayOptions(vegetableName, options) {
  const buttonHTML = options.map(option => `<button onclick="handleOptionClick('${vegetableName}', '${option}')">${option}</button>`).join(' ');
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
  const userMessage = userInput.value.trim();

  if (userMessage === '') {
    return;
  }

  displayUserMessage(userMessage);
  processUserMessage(userMessage);

  userInput.value = '';
  resetButton.disabled = false;
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

const userInput = document.getElementById('userInput');
userInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function resetChat() {
  messageContainer.innerHTML = '';
  resetButton.disabled = true;
}
