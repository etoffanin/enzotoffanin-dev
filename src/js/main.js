const apolloBot = document.getElementById("apolloBot");
const apolloMessage = document.getElementById("apolloMessage");

/* FRASES */
const commonMessages = [


  "Isso parecia mais fácil no começo",
  "Esse site ainda vai mudar bastante",
  "Operion ainda está evoluindo...",
  "Ainda construindo coisas incríveis",
  "Clima Pro foi um ótimo aprendizado",
  "Talvez exista uma mensagem secreta",
  "Detectei curiosidade 👀",
  "Sim, eu realmente fui programado pra isso",
  "Ansiedade detectada",
  "Esse clique foi suspeito",
  "O Apollo quase não existiu nesse projeto",
  "Esse portfólio já teve layouts muito piores.",
  "A primeira versão do Clima Pro era muito mais simples",
  "O Clima Pro foi um dos projetos que mais evoluiu",
  "O Clima Pro quase teve tema claro",
  "O Apollo acompanhou a evolução do Clima Pro",
  "O Operion começou como uma ideia simples no trabalho",
  "O Operion nasceu observando problemas reais",
  "O Enzo provavelmente está alterando algo agora",
  "Enzo já quebrou esse layout mais vezes do que admite",
  "Meu criador acha que dormir é opcional",
  "Enzo definitivamente tinha coisas mais importantes pra fazer",
  "Às vezes eu acho que o Enzo adiciona coisas só porque pode.",
  "Enzo me deu personalidade demais pra um simples widget",
  "Eu fui criado apenas para ficar flutuando nesse site eternamente",
  "O Apollo suspeita que Enzo gostaria de programar um polvo robótico",
  "O Apollo ainda não entende o fascínio do Enzo por polvos.",
  "O Apollo ainda está tentando entender por que humanos gostam tanto de café",
  "Bananas são levemente radioativas",
  "O Apollo descobriu que humanos passam anos olhando para telas brilhantes",
  "O Apollo ainda tenta entender por que humanos gostam de filmes tristes",
  

];

const rareMessages = [

  "Você realmente quer descobrir todas?",
  "Algumas partes desse site quase foram apagadas",
  "Existiu uma quantidade absurda de testes por trás disso",
  "Tem algo escondido aqui, Talvez.",
  "Talvez você tenha perdido alguma coisa",
  "Você desbloqueou uma frase rara!",
  "O Apollo observa padrões interessantes",
  "Esse clique teve energia de QA",
  "Meu criador definitivamente adiciona complexidade desnecessária nas coisas",
  "Às vezes eu me pergunto quem realmente está preso aqui.",
  "Meu criador claramente gosta de adicionar detalhes desnecessariamente legais",
  "Eu existo porque Enzo não conseguiu simplesmente fazer um portfólio normal.",
  "Meu criador decidiu que um portfólio precisava de um mascote consciente.",
  "O Apollo observa muitas tentativas silenciosas.",
  "Talvez evolução também signifique deixar versões antigas para trás.",
  "Existem partes desse projeto que nunca serão vistas novamente.",
  "Meu criador definitivamente admira criaturas estranhas demais.",
  "O Apollo está começando a suspeitar que esse site um dia terá temática de polvo.",
  "Enzo provavelmente pesquisou 'polvo cyberpunk' em algum momento.",
  "O Apollo descobriu recentemente que existem estrelas maiores que o Sistema Solar.",
  "O Apollo ainda não entende como os humanos conseguem dormir tão pouco.",
  "O Apollo acha que humanos deveriam dormir mais, mas não tem certeza de como convencê-los disso.",
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