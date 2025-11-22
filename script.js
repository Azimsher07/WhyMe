document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const GEMINI_API_KEY = 'AIzaSyBBiLaMkV_9L_pcWiVCDQlYuP524uScmE0';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    const SYSTEM_INSTRUCTION = "You are a supportive, empathetic mental health assistant for students. Your goal is to listen, provide comfort, and offer gentle advice. Keep your responses concise (2-3 sentences) and conversational. Do not diagnose or prescribe.";

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
        if (!questionnaireData || !questionnaireData[index]) {
            console.error("Questionnaire data missing or index out of bounds");
            return;
        }
        const section = questionnaireData[index];
        questionnaireContent.innerHTML = '';

        // Progress Bar
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        const progress = ((index + 1) / questionnaireData.length) * 100;
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
                textarea.placeholder = "Type your answer here...";
                if (userAnswers[item.id]) textarea.value = userAnswers[item.id];
                block.appendChild(textarea);
            }
            questionnaireContent.appendChild(block);
        });

        // Buttons
        prevStepBtn.style.display = index === 0 ? 'none' : 'block';
        nextStepBtn.innerHTML = index === questionnaireData.length - 1 ?
            'Start Chat <i class="fa-solid fa-check"></i>' :
            'Next <i class="fa-solid fa-arrow-right"></i>';
    }

    function handleNextStep() {
        saveCurrentAnswers();

        const missing = getMissingQuestion(currentSectionIndex);
        if (missing) {
            alert(`Please answer: "${missing}"`);
            return;
        }

        if (currentSectionIndex < questionnaireData.length - 1) {
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
        const section = questionnaireData[currentSectionIndex];
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
        const section = questionnaireData[index];
        for (const item of section.items) {
            const ans = userAnswers[item.id];
            if (!ans || (Array.isArray(ans) && ans.length === 0)) {
                return item.text;
            }
        }
        return null;
    }

    function completeQuestionnaire() {
        closeQuestionnaire();
        openChat();

        // Initial AI Message
        setTimeout(() => {
            const greeting = generateInitialGreeting(userAnswers);
            addMessage(greeting, 'ai');

            // Seed history
            chatHistory = [
                { role: "user", parts: [{ text: `User Profile: ${JSON.stringify(userAnswers)}` }] },
                { role: "model", parts: [{ text: greeting }] }
            ];
        }, 500);
    }

    function generateInitialGreeting(answers) {
        let msg = "Hello! I'm here to listen. ";
        if (answers.life_heavy === 'Yes') msg += "I know things have been heavy lately. ";
        msg += "How are you feeling right now?";
        return msg;
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
            addMessage("I'm having trouble connecting. Please try again.", 'ai');
            console.error(err);
        }
    }

    async function callGeminiAPI(text) {
        chatHistory.push({ role: "user", parts: [{ text: text }] });

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: chatHistory,
                system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] }
            })
        });

        const data = await response.json();
        if (!data.candidates || !data.candidates[0].content) throw new Error("Invalid API response");

        const aiText = data.candidates[0].content.parts[0].text;
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
