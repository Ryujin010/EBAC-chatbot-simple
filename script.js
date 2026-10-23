// ===== Objeto con las respuestas predefinidas =====

const responses = {
    'hola': '¡Hola! ¿Cómo estás?',
    'adios': '¡Adiós! Que tengas un buen día.',
    'como estas': 'Estoy bien, gracias por preguntar.',
    'que puedes hacer': 'Puedo responder a tus preguntas básicas.'
};

// ===== Referencias a los elementos del HTML =====

const messagesContainer = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// ===== Función para agregar un mensaje al chat =====
// sender puede ser 'user' o 'bot'

function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);

    // Baja automáticamente hasta el último mensaje

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ===== Función que genera la respuesta del chatbot =====

function getBotResponse(userMessage) {
    // Normalizamos: minúsculas, sin espacios extra ni signos de puntuación

    const normalized = userMessage
        .toLowerCase()
        .trim()
        .replace(/[¿?¡!.,]/g, '');

    // Si existe en el objeto, devolvemos su respuesta

    if (responses[normalized]) {
        return responses[normalized];
    }

    // Respuesta por defecto si no entiende el mensaje

    return 'Lo siento, no entiendo tu mensaje. Prueba con: hola, adiós, cómo estás o qué puedes hacer.';
}

// ===== Función que se ejecuta al enviar un mensaje =====

function sendMessage() {
    const message = userInput.value.trim();

    // Si el campo está vacío, no hacemos nada

    if (message === '') {
        return;
    }

    // 1. Mostrar el mensaje del usuario

    addMessage(message, 'user');

    // 2. Limpiar el campo y devolver el foco

    userInput.value = '';
    userInput.focus();

    // 3. Generar y mostrar la respuesta del bot

    const botReply = getBotResponse(message);
    addMessage(botReply, 'bot');
}

// ===== Eventos =====
// Clic en el botón

sendButton.addEventListener('click', sendMessage);

// Tecla Enter dentro del input

userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// ===== Mensaje de bienvenida =====

addMessage('¡Hola! Soy tu chatbot. Escríbeme "hola" para empezar.', 'bot');