function initApolloChat() {
  const openButton = document.getElementById("apolloChatOpen");
  const dialog = document.getElementById("apolloChat");
  const closeButton = document.getElementById("apolloChatClose");
  const form = document.getElementById("apolloChatForm");
  const input = document.getElementById("apolloChatInput");
  const sendButton = document.getElementById("apolloChatSend");
  const messages = document.getElementById("apolloChatMessages");
  const status = document.getElementById("apolloChatStatus");
  const maxHistoryMessages = 16;
  const history = [];
  let sending = false;

  openButton.hidden = false;
  openButton.addEventListener("click", () => {
    dialog.showModal();
    if (messages.childElementCount === 1) {
      animateMessage(messages.firstElementChild);
    }
  });
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    const focusTarget = openButton.getClientRects().length
      ? openButton
      : document.querySelector(".nav-toggle");
    focusTarget.focus();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (sending) {
      return;
    }

    const message = input.value.trim();

    if (!message || message.length > 500) {
      status.textContent = message
        ? "Sua pergunta deve ter no máximo 500 caracteres."
        : "Escreva uma pergunta para o Apollo.";
      input.focus();
      return;
    }

    sending = true;
    sendButton.disabled = true;
    sendButton.textContent = "Enviando…";
    status.textContent = "Estou pensando…";
    appendMessage("Você", message);
    input.value = "";
    input.focus();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch("/api/apollo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error("Não foi possível consultar o Apollo.");
      }

      const data = await response.json();

      if (typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("Apollo não retornou uma resposta.");
      }

      const reply = data.reply.trim();
      history.push(
        { role: "user", text: message },
        { role: "model", text: reply, thoughtSignatures: data.thoughtSignatures || [] }
      );
      if (history.length > maxHistoryMessages) {
        history.splice(0, history.length - maxHistoryMessages);
      }

      appendMessage("Apollo", reply);
      status.textContent = "";
    } catch (error) {
      status.textContent = error.name === "AbortError"
        ? "Apollo demorou para responder. Tente enviar sua pergunta novamente."
        : "Apollo ficou offline por alguns instantes. Tente novamente.";
    } finally {
      clearTimeout(timeout);
      sending = false;
      sendButton.disabled = false;
      sendButton.textContent = "Enviar";
    }
  });

  function appendMessage(author, text) {
    const message = document.createElement("p");
    message.className = author === "Você"
      ? "apollo-chat-message apollo-chat-message-user"
      : "apollo-chat-message apollo-chat-message-apollo";
    const label = document.createElement("strong");
    label.textContent = author;
    const content = document.createElement("span");
    content.textContent = text;

    message.append(label, content);
    messages.appendChild(message);
    animateMessage(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function animateMessage(message) {
    message.classList.add("is-entering");
    message.addEventListener("animationend", () => {
      message.classList.remove("is-entering");
    }, { once: true });
  }
}
