// chatbot.js
// Initialize messages array and state variables
let messages = [];
let inputMessage = '';
let isOpen = false;
let isLoading = false;

// Replace useState with DOM references
const messageContainer = document.getElementById('message-container');
const inputElement = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const toggleButton = document.getElementById('toggle-chatbot');

// API Configuration
const API_KEY = 'AIzaSyAGIjnD6lFtk771FiapiHJhtBFk9shC-zk'; // Replace with your actual API key or use environment variable
if (!API_KEY) {
    console.error('Missing Gemini API key');
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    apiVersion: "v1",
    generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
    }
});

// Function to render messages
function renderMessages() {
    messageContainer.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}-message`;
        messageElement.textContent = message.text;
        messageContainer.appendChild(messageElement);
    });
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Function to test API connection
async function testConnection() {
    try {
        console.log('Testing API connection...');
        const prompt = "You are a finance assistant. Reply with a brief greeting.";
        const result = await model.generateContent([prompt]);
        const response = await result.response;
        const text = response.text();
        console.log('API test response:', text);

        messages = [{
            text: "Hello! I'm your Finance Assistant. Ask me anything about finance!",
            sender: 'bot'
        }];
        renderMessages();
    } catch (error) {
        console.error('API Connection Error:', error);
        messages = [{
            text: `Connection Error: Please make sure you have the correct API configuration and permissions.`,
            sender: 'bot'
        }];
        renderMessages();
    }
}

// Function to handle sending messages
async function handleSendMessage(e) {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    messages.push({ text: inputMessage, sender: 'user' });
    renderMessages();
    inputElement.value = '';
    inputMessage = '';
    isLoading = true;
    sendButton.disabled = true;

    try {
        const prompt = [
            "You are a cooking assistant. Answer the following question about cooking or recipes:",
            inputMessage
        ];
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) {
            throw new Error('Empty response from AI');
        }

        messages.push({
            text: text.trim(),
            sender: 'bot'
        });
        renderMessages();
    } catch (error) {
        console.error('ChatBot Error:', error);
        messages.push({
            text: "I'm having trouble connecting to the recipe service. Please try again in a moment.",
            sender: 'bot'
        });
        renderMessages();
    } finally {
        isLoading = false;
        sendButton.disabled = false;
    }
}

// Function to toggle chatbot visibility
function toggleChatbot() {
    isOpen = !isOpen;
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = isOpen ? 'block' : 'none';
    toggleButton.textContent = isOpen ? 'Close Chat' : 'Open Chat';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    testConnection();

    inputElement.addEventListener('input', (e) => {
        inputMessage = e.target.value;
    });

    sendButton.addEventListener('click', handleSendMessage);

    toggleButton.addEventListener('click', toggleChatbot);

    // Handle Enter key press
    inputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(e);
        }
    });
});