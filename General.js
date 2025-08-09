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
        sendMessage.addEventListener('click', () => {
            const message = chatInput.value;
            if (message) {
                chatMessages.innerHTML += `
                    <div class="message user">
                        <div class="message-bubble">${message}</div>
                    </div>`;
                chatMessages.innerHTML += `
                    <div class="message bot">
                        <div class="message-bubble">Analyzing: ${message}. Try asking about stock trends or budgeting!</div>
                    </div>`;
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });

        voiceChat.addEventListener('click', () => {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                chatInput.value = transcript;
                sendMessage.click();
            };
            recognition.start();
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


        //////// Try :

        // App State
let state = {
    page: 'landing',
    user: null,
    isDarkTheme: false,
    language: 'en',
    highContrast: false,
    largeText: false
};

// Translations
const translations = {
    en: {
        heroTitle: "Students Lack Financial Literacy",
        heroSubtitle: "Finspire makes finance fun, interactive, and personal.",
        getStarted: "Get Started",
        login: "Login",
        problem: "The Challenge",
        solution: "Our Solution"
    }
};

// Render
function render() {
    const app = document.getElementById('app');
    const t = translations[state.language];

    document.body.classList.toggle('dark-theme', state.isDarkTheme);
    document.body.classList.toggle('high-contrast', state.highContrast);
    document.body.classList.toggle('large-text', state.largeText);

    if (state.page === 'landing') {
        app.innerHTML = `
            <header class="p-4 bg-card animate-slide-in-bottom">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <i class="fas fa-wallet text-3xl text-[var(--color-warm-yellow)]"></i>
                        <span class="text-2xl font-bold text-primary">Finspire</span>
                    </div>
                    <div class="flex gap-4">
                        <button class="btn-primary" onclick="setState({page:'signup'})">${t.getStarted}</button>
                        <button class="btn-secondary" onclick="setState({page:'login'})">${t.login}</button>
                    </div>
                </div>
            </header>
            <section class="p-6 text-center animate-slide-in-bottom">
                <h1 class="text-4xl font-bold text-white mb-4">${t.heroTitle}</h1>
                <p class="text-xl text-white mb-6">${t.heroSubtitle}</p>
                <img src="https://undraw.co/api/illustrations/finance" alt="Finance Illustration" width="300" />
            </section>
            <section class="p-6 bg-card animate-slide-in-bottom">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-semibold text-primary">${t.problem}</h3>
                        <p class="text-secondary">Many students lack basic financial knowledge, leading to poor money management.</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-primary">${t.solution}</h3>
                        <p class="text-secondary">Finspire offers interactive tools, gamified lessons, and AI advice to make learning fun.</p>
                    </div>
                </div>
            </section>
        `;
    }
}

// State Updater
function setState(newState) {
    state = { ...state, ...newState };
    render();
}

// Initial Render
render();
