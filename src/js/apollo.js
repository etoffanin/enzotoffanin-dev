const apolloBot = document.getElementById("apolloBot");
const apolloMessage = document.getElementById("apolloMessage");
const apolloAnnouncement = document.getElementById("apolloAnnouncement");

let commonMessages = [];
let rareMessages = [];
let legendaryMessages = [];
let usedMessages = [];
let typingInterval;

async function initApollo() {
  apolloBot.addEventListener("click", handleApolloClick);

  try {
    const response = await fetch("./src/data/apollo-messages.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const messages = await response.json();
    commonMessages = messages.common;
    rareMessages = messages.rare;
    legendaryMessages = messages.legendary;
  } catch (error) {
    console.error("Não foi possível carregar as frases do Apollo:", error);
    apolloMessage.textContent = "Não consegui carregar minhas frases agora.";
  }
}

function handleApolloClick() {
  apolloBot.classList.add("apollo-clicked");
  setTimeout(() => {
    apolloBot.classList.remove("apollo-clicked");
  }, 450);

  const allMessages = [
    ...commonMessages,
    ...rareMessages,
    ...legendaryMessages
  ];

  if (allMessages.length === 0) {
    return;
  }

  if (usedMessages.length >= allMessages.length) {
    usedMessages = [];
  }

  const randomChance = Math.random() * 100;
  let selectedPool;

  if (randomChance <= 1) {
    selectedPool = legendaryMessages;
  } else if (randomChance <= 35) {
    selectedPool = rareMessages;
  } else {
    selectedPool = commonMessages;
  }

  let availableMessages = selectedPool.filter(
    (message) => !usedMessages.includes(message)
  );

  if (availableMessages.length === 0) {
    availableMessages = allMessages.filter(
      (message) => !usedMessages.includes(message)
    );
  }

  const randomMessage = availableMessages[
    Math.floor(Math.random() * availableMessages.length)
  ];

  typeApolloMessage(randomMessage);
  usedMessages.push(randomMessage);
}

function typeApolloMessage(message) {
  clearInterval(typingInterval);
  apolloMessage.textContent = "";
  apolloAnnouncement.textContent = "";

  let index = 0;
  const speed = 35;

  typingInterval = setInterval(() => {
    apolloMessage.textContent += message.charAt(index);
    index++;

    if (index >= message.length) {
      clearInterval(typingInterval);
      apolloAnnouncement.textContent = message;
    }
  }, speed);
}
