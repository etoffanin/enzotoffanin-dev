const apolloBot = document.getElementById("apolloBot");
const apolloMessage = document.getElementById("apolloMessage");

/* FRASES */
const commonMessages = [


  "Isso parecia mais fácil no começo",
  "Você continua aqui",
  "Você parece gostar de explorar",
  "Esse site ainda vai mudar bastante",
  "Operion ainda está evoluindo...",
  "Ainda construindo coisas incríveis",
  "Clima Pro foi um ótimo aprendizado",
  "Talvez exista uma mensagem secreta",
  "Detectei curiosidade 👀",
  "Eu sabia que você clicaria outra vez",
  "Sim, eu realmente fui programado pra isso",
  "Ansiedade detectada",
  "Você realmente quer descobrir todas?",
  "Esse clique foi suspeito",
  "O Apollo quase não existiu nesse projeto",
  "Esse portfólio já teve layouts muito piores.",

];

const rareMessages = [


  "Algumas partes desse site quase foram apagadas",
  "Existiu uma quantidade absurda de testes por trás disso",
  "Tem algo escondido aqui, Talvez.",
  "Talvez você tenha perdido alguma coisa",
  "Você desbloqueou uma frase rara!",
  "O Apollo observa padrões interessantes",
  "Esse clique teve energia de QA"

];

const legendaryMessages = [

  "Parabéns! Você encontrou a mensagem lendária!",
  "Poucas pessoas encontram essa mensagem.",
  "Essa mensagem tem aproximadamente 1% de chance.",
  "Apollo considera você uma ameaça leve."

];

let usedMessages = [];

/* CLIQUE APOLLO */

apolloBot.addEventListener("click", () => {

  const allMessages = [
    ...commonMessages,
    ...rareMessages,
    ...legendaryMessages
  ];

  // RESET TOTAL

  if (usedMessages.length >= allMessages.length) {
    usedMessages = [];
  }

  let selectedPool = [];

  const randomChance = Math.random() * 100;

  // 1% lendária

  if (randomChance <= 1) {

    selectedPool = legendaryMessages;

  }

  // 35% rara

  else if (randomChance <= 35) {

    selectedPool = rareMessages;

  }

  // comum

  else {

    selectedPool = commonMessages;

  }

  // REMOVE REPETIÇÕES

  let availableMessages = selectedPool.filter(
    message => !usedMessages.includes(message)
  );

  // SE ACABAR

  if (availableMessages.length === 0) {

    availableMessages = allMessages.filter(
      message => !usedMessages.includes(message)
    );

  }

  // ESCOLHE

  const randomMessage =
    availableMessages[
      Math.floor(Math.random() * availableMessages.length)
    ];

  // DIGITAÇÃO

  typeApolloMessage(randomMessage);

  // SALVA

  usedMessages.push(randomMessage);

});

/* DIGITAÇÃO */

let typingInterval;

function typeApolloMessage(message) {

  // LIMPA DIGITAÇÃO ANTIGA

  clearInterval(typingInterval);

  // LIMPA TEXTO

  apolloMessage.textContent = "";

  let index = 0;

  const speed = 35;

  // NOVA DIGITAÇÃO

  typingInterval = setInterval(() => {

    apolloMessage.textContent += message.charAt(index);

    index++;

    // FINALIZA

    if (index >= message.length) {

      clearInterval(typingInterval);

    }

  }, speed);

}