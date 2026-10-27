async function sendMessage() {

    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Show user message
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);

    input.value = "";

    // Show thinking message
    const botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.textContent = "Thinking...";
    chatBox.appendChild(botMessage);

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        botMessage.textContent = data.response;

    } catch (error) {

        botMessage.textContent =
            "Sorry, I couldn't connect to the server.";

        console.error(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}