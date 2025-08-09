let isAuthenticated = false;
        let currentUser = { name: 'Fintech User', email: 'user@fintechhub.com', role: 'investor', avatar: 'FT' };

        // Page Navigation
        const pages = document.querySelectorAll('.page');
        const navLinks = document.querySelectorAll('.nav-link');
        const authLinks = document.querySelectorAll('.auth-link');

        function showPage(pageId) {
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }

        function updateAuthState() {
            if (isAuthenticated) {
                document.getElementById('mainHeader').style.display = 'block';
                document.getElementById('mainSidebar').style.display = 'block';
                document.getElementById('mainContent').style.display = 'block';
                document.getElementById('login').style.display = 'none';
                document.getElementById('signup').style.display = 'none';
                document.getElementById('userName').textContent = currentUser.name;
                document.getElementById('userRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
                document.getElementById('userAvatar').textContent = currentUser.avatar;
                document.getElementById('profileName').textContent = currentUser.name;
                document.getElementById('profileRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
                document.getElementById('profileEmail').textContent = currentUser.email;
                document.getElementById('profileAvatar').textContent = currentUser.avatar;
                showPage('dashboard');
            } else {
                document.getElementById('mainHeader').style.display = 'none';
                document.getElementById('mainSidebar').style.display = 'none';
                document.getElementById('mainContent').style.display = 'none';
                showPage('login');
            }
        }

        // Login
        document.getElementById('loginBtn').addEventListener('click', () => {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            if (email && password) {
                isAuthenticated = true;
                currentUser.email = email;
                updateAuthState();
            } else {
                alert('Please fill in all fields.');
            }
        });

        // Signup
        document.getElementById('signupBtn').addEventListener('click', () => {
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const role = document.getElementById('signupRole').value;
            if (name && email && password && role) {
                isAuthenticated = true;
                currentUser = {
                    name,
                    email,
                    role,
                    avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
                };
                updateAuthState();
            } else {
                alert('Please fill in all fields.');
            }
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            isAuthenticated = false;
            updateAuthState();
        });

        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                showPage(pageId);
                if (window.innerWidth <= 768) {
                    sidebar.classList.add('collapsed');
                    sidebar.classList.remove('mobile-open');
                    sidebarToggle.innerHTML = '<i class="fas fa-arrow-right"></i>';
                }
            });
        });

        authLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                showPage(pageId);
            });
        });

        // Sidebar Toggle
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            sidebar.classList.toggle('mobile-open');
            sidebarToggle.innerHTML = sidebar.classList.contains('collapsed') ? '<i class="fas fa-arrow-right"></i>' : '<i class="fas fa-arrow-left"></i>';
        });

        // Role-Based Dashboard
        const dashboardGrid = document.getElementById('dashboardGrid');
        if (currentUser.role === 'admin') {
            dashboardGrid.innerHTML += `
                <div class="dashboard-card">
                    <div class="card-header">
                        <div class="card-title">Platform Transactions</div>
                        <div class="card-icon"><i class="fas fa-exchange-alt"></i></div>
                    </div>
                    <div class="card-value">1,234</div>
                    <div class="card-trend"><i class="fas fa-arrow-up"></i> 10% today</div>
                </div>`;
        } else if (currentUser.role === 'analyst') {
            dashboardGrid.innerHTML += `
                <div class="dashboard-card">
                    <div class="card-header">
                        <div class="card-title">Market Trends</div>
                        <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                    </div>
                    <div class="card-value">5</div>
                    <div class="card-trend"><i class="fas fa-arrow-up"></i> 2 new</div>
                </div>`;
        }

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            themeToggle.querySelector('i').classList.toggle('fa-moon');
            themeToggle.querySelector('i').classList.toggle('fa-sun');
        });

        // Notification Panel
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPanel = document.getElementById('notificationPanel');
        notificationBtn.addEventListener('click', () => {
            notificationPanel.classList.toggle('show');
        });

        // Accessibility Panel
        const accessibilityToggle = document.getElementById('accessibilityToggle');
        const accessibilityPanel = document.getElementById('accessibilityPanel');
        accessibilityToggle.addEventListener('click', () => {
            accessibilityPanel.classList.toggle('show');
        });

        const highContrastToggle = document.getElementById('highContrastToggle');
        highContrastToggle.addEventListener('click', () => {
            highContrastToggle.classList.toggle('active');
            document.body.classList.toggle('high-contrast');
        });

        const largeTextToggle = document.getElementById('largeTextToggle');
        largeTextToggle.addEventListener('click', () => {
            largeTextToggle.classList.toggle('active');
            document.body.classList.toggle('large-text');
        });

        const ttsToggle = document.getElementById('ttsToggle');
        ttsToggle.addEventListener('click', () => {
            ttsToggle.classList.toggle('active');
            if (ttsToggle.classList.contains('active')) {
                const text = document.querySelector('.page.active').innerText;
                const utterance = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(utterance);
            } else {
                window.speechSynthesis.cancel();
            }
        });

        const languageSelect = document.getElementById('languageSelect');
        languageSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        });

        // Smart Search
        const smartSearch = document.getElementById('smartSearch');
        const searchResults = document.getElementById('searchResults');
        smartSearch.addEventListener('input', (e) => {
            const query = e.target.value;
            if (query.length > 2) {
                searchResults.style.display = 'block';
                searchResults.innerHTML = `<p>Searching for: ${query}</p><p>Suggestions: Stock Analysis, Budget Tips</p>`;
            } else {
                searchResults.style.display = 'none';
            }
        });

        // Voice Search
        const voiceSearchBtn = document.getElementById('voiceSearchBtn');
        voiceSearchBtn.addEventListener('click', () => {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                smartSearch.value = transcript;
                searchResults.style.display = 'block';
                searchResults.innerHTML = `<p>Voice search: ${transcript}</p>`;
            };
            recognition.start();
        });

        // Chatbot
        const chatInput = document.getElementById('chatInput');
        const sendMessage = document.getElementById('sendMessage');
        const chatMessages = document.getElementById('chatMessages');
        const voiceChat = document.getElementById('voiceChat');

        // Replace Gemini API config and function with DeepSeek API
        const TOGETHER_API_KEY = '5727e4493f4ed1c16d4c5eabae5ffe034efb8161f1299d220adfb4063a95ed51'; // <-- Replace with your actual Together API key

        const FINBOT_SYSTEM_PROMPT = `
            You are FinBot, a helpful financial assistant.
            Answer all finance-related questions clearly and concisely.
            If asked about mutual funds, stocks, budgeting, investing, or financial concepts, provide a brief explanation and practical advice.
            If asked for a stock price or live market data, explain that you cannot provide real-time prices, but offer guidance on how to find them.
            Format your response using bullet points or short paragraphs for readability.
            If relevant, include examples or steps.
            Always be polite and professional.
            Give answers in 5 lines only.
            `;

        async function getDeepSeekResponse(userMessage) {
            const url = "https://api.together.xyz/v1/chat/completions";
            const body = {
                model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
                messages: [
                    {
                        role: "system",
                        content: FINBOT_SYSTEM_PROMPT
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            };

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${TOGETHER_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });
                const data = await response.json();
                return data.choices?.[0]?.message?.content || "Sorry, no answer available.";
            } catch (error) {
                return "Sorry, DeepSeek couldn't connect to the service. Please try again later.";
            }
        }

        // Chatbot send logic (replace Gemini call with DeepSeek)
        sendMessage.addEventListener('click', async () => {
            const message = chatInput.value;
            if (message) {
                chatMessages.innerHTML += `
                    <div class="message user">
                        <div class="message-bubble">${message}</div>
                    </div>`;
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;

                chatMessages.innerHTML += `
                    <div class="message bot">
                        <div class="message-bubble">FinBot is thinking...</div>
                    </div>`;
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Get DeepSeek AI response
                const text = await getDeepSeekResponse(message);

                // Remove loading indicator
                const botMessages = chatMessages.querySelectorAll('.message.bot');
                if (botMessages.length > 0) {
                    botMessages[botMessages.length - 1].remove();
                }

                chatMessages.innerHTML += `
                    <div class="message bot">
                        <div class="message-bubble">${text}</div>
                    </div>`;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });

        // Chart
        const ctx = document.getElementById('portfolioChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Portfolio Value',
                    data: [10000, 10500, 11000, 10800, 12345],
                    borderColor: 'rgba(30, 58, 138, 1)',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(30, 58, 138, 0.2)',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: false }
                }
            }
        });

        // Report Generation
        const generateReport = document.getElementById('generateReport');
        generateReport.addEventListener('click', () => {
            alert('Financial report generated! (PDF/CSV/XLSX placeholder)');
        });

        // Edit Profile (Placeholder)
        document.getElementById('editProfile').addEventListener('click', () => {
            alert('Edit profile functionality coming soon!');
        });

        // Initialize
        updateAuthState();

// Function to render messages
function renderMessages() {
    messageContainer.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}`;
        const bubbleElement = document.createElement('div');
        bubbleElement.className = 'message-bubble';
        bubbleElement.textContent = message.text;
        messageElement.appendChild(bubbleElement);
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
            text: "Hello! Ask me about investments, markets, or budgeting.",
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
            "You are a finance assistant. Answer the following question about investments, markets, or budgeting:",
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
            text: "I'm having trouble connecting to the finance service. Please try again in a moment.",
            sender: 'bot'
        });
        renderMessages();
    } finally {
        isLoading = false;
        sendButton.disabled = false;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    testConnection();

    inputElement.addEventListener('input', (e) => {
        inputMessage = e.target.value;
    });

    sendButton.addEventListener('click', handleSendMessage);

    // Handle Enter key press
    inputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(e);
        }
    });
});


const insights = [
    { title: "Stock Market Trends 2025", content: "Analysis of current stock market trends and predictions for 2025." },
    { title: "Investment Strategies", content: "Diversification and long-term investment strategies for beginners." },
    { title: "Cryptocurrency Outlook", content: "Future of Bitcoin and Ethereum in the financial market." },
    { title: "Retirement Planning", content: "How to plan for a secure financial future." },
    { title: "Real Estate Investments", content: "Guide to investing in real estate in 2025." }
];

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('smartSearch');
    const searchResults = document.getElementById('searchResults');
    const voiceSearchBtn = document.getElementById('voiceSearchBtn');

    // Text search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length === 0) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }

        const filteredInsights = insights.filter(insight =>
            insight.title.toLowerCase().includes(query) ||
            insight.content.toLowerCase().includes(query)
        );

        displayResults(filteredInsights);
    });

    // Voice search functionality
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        voiceSearchBtn.addEventListener('click', () => {
            recognition.start();
            voiceSearchBtn.classList.add('active');
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            const filteredInsights = insights.filter(insight =>
                insight.title.toLowerCase().includes(transcript.toLowerCase()) ||
                insight.content.toLowerCase().includes(transcript.toLowerCase())
            );
            displayResults(filteredInsights);
            voiceSearchBtn.classList.remove('active');
        };

        recognition.onend = () => {
            voiceSearchBtn.classList.remove('active');
        };

        recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
            voiceSearchBtn.classList.remove('active');
        };
    } else {
        voiceSearchBtn.style.display = 'none'; // Hide voice button if not supported
    }

    // Display search results
    function displayResults(results) {
        searchResults.innerHTML = '';
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <h3 style="margin: 0; font-size: 1.1rem;">${result.title}</h3>
                    <p style="margin: 0.2rem 0; color: #666;">${result.content}</p>
                `;
                searchResults.appendChild(resultItem);
            });
        }
        searchResults.style.display = 'block';
    }

    // Hide results when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchResults.contains(event.target) && !searchInput.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
});
