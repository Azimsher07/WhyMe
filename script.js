import { GoogleGenAI } from "@google/genai";

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const GEMINI_API_KEY = 'AIzaSyAfBRNy8ushkwHv04RUW8VqZDbdVMHXX8U';
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // TODO: User needs to replace this with their deployed Web App URL
    // TODO: Follow the instructions in google_sheets_guide.md to get your URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwYGt6Ne6fKNO2GXkoQdOoMigSDR1lGnSUkRdcxr6d88rOPmFi4Rd1qQPufVuPTePc1/exec';

    let currentLanguage = 'en';

    const SYSTEM_INSTRUCTIONS = {
        "en": "You are a supportive, empathetic mental health assistant for students. Your goal is to listen, provide comfort, and offer gentle advice. Keep your responses concise (2-3 sentences) and conversational. Do not diagnose or prescribe.",
        "ru": "Вы — поддерживающий, эмпатичный помощник по психическому здоровью для студентов. Ваша цель — выслушать, утешить и дать мягкий совет. Отвечайте кратко (2-3 предложения) и в разговорном стиле. Не ставьте диагнозы и не назначайте лечение.",
        "uz": "Siz talabalar uchun hamdard ruhiy salomatlik yordamchisisiz. Maqsadingiz tinglash, tasalli berish va yumshoq maslahatlar berishdir. Javoblaringizni qisqa (2-3 gap) va samimiy tuting. Tashxis qo'ymang yoki davolash buyurmang."
    };

    // --- DOM Elements ---
    const startChatBtn = document.getElementById('start-chat-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatSection = document.getElementById('chat-section');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    const questionnaireSection = document.getElementById('questionnaire-section');
    const closeQuestionnaireBtn = document.getElementById('close-questionnaire-btn');
    const questionnaireContent = document.getElementById('questionnaire-content');
    const nextStepBtn = document.getElementById('next-step-btn');
    const prevStepBtn = document.getElementById('prev-step-btn');

    const langBtns = document.querySelectorAll('.lang-btn');
    const burgerMenuBtn = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenuBtn) {
        burgerMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = burgerMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- State ---
    let currentSectionIndex = 0;
    let userAnswers = {};
    let chatHistory = [];

    // --- Event Listeners ---
    if (startChatBtn) startChatBtn.addEventListener('click', startQuestionnaire);
    if (closeChatBtn) closeChatBtn.addEventListener('click', closeChat);
    if (closeQuestionnaireBtn) closeQuestionnaireBtn.addEventListener('click', closeQuestionnaire);
    if (chatForm) chatForm.addEventListener('submit', handleSendMessage);
    if (nextStepBtn) nextStepBtn.addEventListener('click', handleNextStep);
    if (prevStepBtn) prevStepBtn.addEventListener('click', handlePrevStep);

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // --- Language Functions ---
    function setLanguage(lang) {
        currentLanguage = lang;

        // Update Buttons State
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Update Text Content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // Re-render questionnaire if open
        if (!questionnaireSection.classList.contains('hidden')) {
            renderSection(currentSectionIndex);
        }
    }

    // --- Questionnaire Functions ---

    function startQuestionnaire() {
        questionnaireSection.classList.remove('hidden');
        currentSectionIndex = 0;
        userAnswers = {};
        renderSection(currentSectionIndex);
    }

    function closeQuestionnaire() {
        questionnaireSection.classList.add('hidden');
    }

    function renderSection(index) {
        const data = questionnaireData[currentLanguage];
        if (!data || !data[index]) {
            console.error("Questionnaire data missing or index out of bounds");
            return;
        }
        const section = data[index];
        questionnaireContent.innerHTML = '';

        // Progress Bar
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        const progress = ((index + 1) / data.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressContainer.appendChild(progressBar);
        questionnaireContent.appendChild(progressContainer);

        // Title
        const title = document.createElement('h4');
        title.textContent = section.sectionTitle;
        title.style.color = 'var(--primary-dark)';
        title.style.marginBottom = '1.5rem';
        title.style.fontSize = '1.1rem';
        title.style.fontWeight = '700';
        title.style.textTransform = 'uppercase';
        title.style.letterSpacing = '0.05em';
        questionnaireContent.appendChild(title);

        // Items
        section.items.forEach(item => {
            const block = document.createElement('div');
            block.className = 'question-block';

            const text = document.createElement('div');
            text.className = 'question-text';
            text.textContent = item.text;
            block.appendChild(text);

            if (item.type === 'single_choice' || item.type === 'multiple_choice') {
                const optionsContainer = document.createElement('div');
                optionsContainer.className = 'options-container';

                item.options.forEach(option => {
                    const label = document.createElement('label');
                    label.className = 'option-label';

                    const input = document.createElement('input');
                    input.type = item.type === 'single_choice' ? 'radio' : 'checkbox';
                    input.name = item.id;
                    input.value = option;

                    // Restore state
                    if (userAnswers[item.id]) {
                        if (Array.isArray(userAnswers[item.id])) {
                            if (userAnswers[item.id].includes(option)) input.checked = true;
                        } else if (userAnswers[item.id] === option) {
                            input.checked = true;
                        }
                    }

                    label.appendChild(input);
                    label.appendChild(document.createTextNode(option));
                    optionsContainer.appendChild(label);
                });
                block.appendChild(optionsContainer);
            } else if (item.type === 'text') {
                const textarea = document.createElement('textarea');
                textarea.className = 'text-input';
                textarea.name = item.id;
                textarea.placeholder = translations[currentLanguage]['input_placeholder'] || "Type here...";
                if (userAnswers[item.id]) textarea.value = userAnswers[item.id];
                block.appendChild(textarea);
            }
            questionnaireContent.appendChild(block);
        });

        // Buttons
        prevStepBtn.style.display = index === 0 ? 'none' : 'block';

        const isLast = index === data.length - 1;
        const btnText = isLast ? translations[currentLanguage]['btn_submit'] : translations[currentLanguage]['btn_next'];
        const icon = isLast ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-arrow-right"></i>';

        nextStepBtn.innerHTML = `${btnText} ${icon}`;
    }

    function handleNextStep() {
        saveCurrentAnswers();

        const missing = getMissingQuestion(currentSectionIndex);
        if (missing) {
            alert(`${translations[currentLanguage]['alert_missing']} "${missing}"`);
            return;
        }

        const data = questionnaireData[currentLanguage];
        if (currentSectionIndex < data.length - 1) {
            currentSectionIndex++;
            renderSection(currentSectionIndex);
        } else {
            completeQuestionnaire();
        }
    }

    function handlePrevStep() {
        saveCurrentAnswers();
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            renderSection(currentSectionIndex);
        }
    }

    function saveCurrentAnswers() {
        const data = questionnaireData[currentLanguage];
        const section = data[currentSectionIndex];
        section.items.forEach(item => {
            if (item.type === 'single_choice') {
                const el = questionnaireContent.querySelector(`input[name="${item.id}"]:checked`);
                if (el) userAnswers[item.id] = el.value;
            } else if (item.type === 'multiple_choice') {
                const els = questionnaireContent.querySelectorAll(`input[name="${item.id}"]:checked`);
                if (els.length > 0) userAnswers[item.id] = Array.from(els).map(e => e.value);
            } else if (item.type === 'text') {
                const el = questionnaireContent.querySelector(`textarea[name="${item.id}"]`);
                if (el && el.value.trim()) userAnswers[item.id] = el.value.trim();
            }
        });
    }

    function getMissingQuestion(index) {
        const data = questionnaireData[currentLanguage];
        const section = data[index];
        for (const item of section.items) {
            const ans = userAnswers[item.id];
            if (!ans || (Array.isArray(ans) && ans.length === 0)) {
                return item.text;
            }
        }
        return null;
    }

    async function completeQuestionnaire() {
        closeQuestionnaire();
        openChat();
        showTypingIndicator();

        // 1. Submit to Google Sheets (Fire and Forget)
        submitToGoogleSheets(userAnswers);

        // 2. Prepare AI Context
        const profileText = `User Language: ${currentLanguage}. Profile: ${JSON.stringify(userAnswers)}. Please provide a warm, empathetic, and personalized initial greeting in ${currentLanguage}.`;

        // Seed history
        chatHistory.push({ role: "user", parts: [{ text: profileText }] });

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: chatHistory,
                config: {
                    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTIONS[currentLanguage] }] }
                }
            });

            const aiText = response.text;

            // Add AI response to history
            chatHistory.push({ role: "model", parts: [{ text: aiText }] });

            removeTypingIndicator();
            addMessage(aiText, 'ai');
        } catch (err) {
            removeTypingIndicator();
            console.error("Initial greeting failed:", err);
            const fallback = translations[currentLanguage]['ai_fallback_greeting'];
            addMessage(fallback, 'ai');
            chatHistory.push({ role: "model", parts: [{ text: fallback }] });
        }
    }

    function submitToGoogleSheets(data) {
        if (GOOGLE_SCRIPT_URL === 'PASTE_YOUR_WEB_APP_URL_HERE' || GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_SCRIPT_URL_HERE')) {
            console.warn("Google Script URL not set. Data not saved. Please follow the guide to set it up.");
            return;
        }

        const payload = {
            language: currentLanguage,
            ...data
        };

        // Use no-cors mode to avoid CORS errors from Google Scripts
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain', // text/plain is often better for Apps Script simple triggers
            },
            body: JSON.stringify(payload)
        }).then(() => {
            console.log("Data submitted to Google Sheets");
        }).catch(err => {
            console.error("Failed to submit data:", err);
        });
    }

    // --- Chat Functions ---

    function openChat() {
        chatSection.classList.remove('hidden');
        userInput.focus();
    }

    function closeChat() {
        chatSection.classList.add('hidden');
    }

    async function handleSendMessage(e) {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';
        showTypingIndicator();

        try {
            const response = await callGeminiAPI(text);
            removeTypingIndicator();
            addMessage(response, 'ai');
        } catch (err) {
            removeTypingIndicator();
            addMessage(translations[currentLanguage]['ai_connection_error'], 'ai');
            console.error(err);
        }
    }

    async function callGeminiAPI(text) {
        chatHistory.push({ role: "user", parts: [{ text: text }] });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: chatHistory,
            config: {
                systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTIONS[currentLanguage] }] }
            }
        });

        const aiText = response.text;
        chatHistory.push({ role: "model", parts: [{ text: aiText }] });
        return aiText;
    }

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = 'Just now';

        div.appendChild(contentDiv);
        div.appendChild(timeDiv);

        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.className = 'message ai-message';
        div.innerHTML = '<div class="message-content" style="padding: 0.5rem 1rem;"><i class="fa-solid fa-ellipsis fa-fade"></i></div>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }
});
