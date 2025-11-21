document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startChatBtn = document.getElementById('start-chat-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatSection = document.getElementById('chat-section');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Questionnaire Elements
    const questionnaireSection = document.getElementById('questionnaire-section');
    const closeQuestionnaireBtn = document.getElementById('close-questionnaire-btn');
    const questionnaireContent = document.getElementById('questionnaire-content');
    const nextStepBtn = document.getElementById('next-step-btn');
    const prevStepBtn = document.getElementById('prev-step-btn');

    // State
    let isChatOpen = false;
    let currentSectionIndex = 0;
    let userAnswers = {};

    // Event Listeners
    startChatBtn.addEventListener('click', startQuestionnaire);
    closeChatBtn.addEventListener('click', closeChat);
    closeQuestionnaireBtn.addEventListener('click', closeQuestionnaire);
    chatForm.addEventListener('submit', handleSendMessage);

    nextStepBtn.addEventListener('click', handleNextStep);
    prevStepBtn.addEventListener('click', handlePrevStep);

    // Questionnaire Logic
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
        const section = questionnaireData[index];
        questionnaireContent.innerHTML = '';

        // Progress Bar
        const progressContainer = document.createElement('div');
        progressContainer.classList.add('progress-container');
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        const progress = ((index + 1) / questionnaireData.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressContainer.appendChild(progressBar);
        questionnaireContent.appendChild(progressContainer);

        // Section Title
        const title = document.createElement('h4');
        title.textContent = section.sectionTitle;
        title.style.color = 'var(--primary-dark)';
        title.style.marginBottom = '1.5rem';
        title.style.fontSize = '1.1rem';
        title.style.fontWeight = '700';
        title.style.textTransform = 'uppercase';
        title.style.letterSpacing = '0.05em';
        questionnaireContent.appendChild(title);

        // Questions
        section.items.forEach(item => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');

            const questionText = document.createElement('div');
            questionText.classList.add('question-text');
            questionText.textContent = item.text;
            questionBlock.appendChild(questionText);

            if (item.type === 'single_choice' || item.type === 'multiple_choice') {
                const optionsContainer = document.createElement('div');
                optionsContainer.classList.add('options-container');

                item.options.forEach(option => {
                    const label = document.createElement('label');
                    label.classList.add('option-label');

                    const input = document.createElement('input');
                    input.type = item.type === 'single_choice' ? 'radio' : 'checkbox';
                    input.name = item.id;
                    input.value = option;

                    // Restore previous answer if exists
                    if (userAnswers[item.id]) {
                        if (Array.isArray(userAnswers[item.id])) {
                            if (userAnswers[item.id].includes(option)) input.checked = true;
                        } else {
                            if (userAnswers[item.id] === option) input.checked = true;
                        }
                    }

                    label.appendChild(input);
                    label.appendChild(document.createTextNode(option));
                    optionsContainer.appendChild(label);
                });

                if (item.hasOpenOption) {
                    // Simple implementation for "Other" - just a text input that appears if selected
                    // For now, let's just add it as a text area below if needed, or keep it simple
                }

                questionBlock.appendChild(optionsContainer);
            } else if (item.type === 'text') {
                const textarea = document.createElement('textarea');
                textarea.classList.add('text-input');
                textarea.name = item.id;
                textarea.placeholder = "Type your answer here...";
                if (userAnswers[item.id]) textarea.value = userAnswers[item.id];
                questionBlock.appendChild(textarea);
            }

            questionnaireContent.appendChild(questionBlock);
        });

        // Update Buttons
        prevStepBtn.style.display = index === 0 ? 'none' : 'block';
        nextStepBtn.innerHTML = index === questionnaireData.length - 1 ? 'Start Chat <i class="fa-solid fa-check"></i>' : 'Next <i class="fa-solid fa-arrow-right"></i>';
    }

    function handleNextStep() {
        // Save current answers
        saveCurrentAnswers();

        // Validate answers for current section
        if (!validateSection(currentSectionIndex)) {
            alert("Please answer all questions before proceeding.");
            return;
        }

        if (currentSectionIndex < questionnaireData.length - 1) {
            currentSectionIndex++;
            renderSection(currentSectionIndex);
        } else {
            // Submit and Start Chat
            completeQuestionnaire();
        }
    }

    function validateSection(index) {
        const section = questionnaireData[index];
        for (const item of section.items) {
            // Check if answer exists
            if (!userAnswers[item.id] || (Array.isArray(userAnswers[item.id]) && userAnswers[item.id].length === 0)) {
                return false;
            }
        }
        return true;
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
                const selected = document.querySelector(`input[name="${item.id}"]:checked`);
                if (selected) userAnswers[item.id] = selected.value;
            } else if (item.type === 'multiple_choice') {
                const selected = document.querySelectorAll(`input[name="${item.id}"]:checked`);
                userAnswers[item.id] = Array.from(selected).map(cb => cb.value);
            } else if (item.type === 'text') {
                const text = document.querySelector(`textarea[name="${item.id}"]`);
                if (text) userAnswers[item.id] = text.value;
            }
        });
    }

    function completeQuestionnaire() {
        closeQuestionnaire();
        openChat();

        // Generate summary for AI
        const summary = formatAnswersForAI(userAnswers);

        // Add initial AI message based on context
        setTimeout(() => {
            const initialResponse = generateInitialAIResponse(userAnswers);
            addMessage(initialResponse, 'ai');
        }, 500);
    }

    function formatAnswersForAI(answers) {
        // In a real app, this would be sent to the backend
        console.log("User Answers:", answers);
        return JSON.stringify(answers);
    }

    function generateInitialAIResponse(answers) {
        // Simple personalization based on answers
        const name = "friend"; // We didn't ask for name, but could
        let greeting = "Hello! I've reviewed your answers. ";

        if (answers.life_heavy === 'Yes') {
            greeting += "I see that things have been feeling heavy lately. I'm here to support you through that. ";
        }

        if (answers.coping_mechanisms && answers.coping_mechanisms.includes('Talking to a close friend or family member')) {
            greeting += "It's great that you find comfort in talking to others. Think of me as another friend here to listen. ";
        }

        greeting += "How are you feeling right in this moment?";
        return greeting;
    }

    // Chat Functions
    function openChat() {
        chatSection.classList.remove('hidden');
        isChatOpen = true;
        userInput.focus();
        // Clear previous messages if any (optional, or keep history)
        chatMessages.innerHTML = '';
    }

    function closeChat() {
        chatSection.classList.add('hidden');
        isChatOpen = false;
    }

    function handleSendMessage(e) {
        e.preventDefault();
        const message = userInput.value.trim();

        if (message) {
            // Add user message
            addMessage(message, 'user');
            userInput.value = '';

            // Simulate AI thinking and response
            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                const aiResponse = getMockAIResponse(message);
                addMessage(aiResponse, 'ai');
            }, 1500);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.textContent = text;

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        timeDiv.textContent = 'Just now';

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);

        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.id = 'typing-indicator';
        indicatorDiv.classList.add('message', 'ai-message');
        indicatorDiv.innerHTML = `
            <div class="message-content" style="padding: 0.5rem 1rem;">
                <i class="fa-solid fa-ellipsis fa-fade"></i>
            </div>
        `;
        chatMessages.appendChild(indicatorDiv);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Mock AI Logic (Simple keyword matching for now)
    function getMockAIResponse(input) {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Hi there! It's good to see you. How are you feeling right now?";
        } else if (lowerInput.includes('sad') || lowerInput.includes('depressed') || lowerInput.includes('down')) {
            return "I'm sorry to hear you're feeling that way. It takes courage to share that. Would you like to talk about what's making you feel this way?";
        } else if (lowerInput.includes('stress') || lowerInput.includes('anxious') || lowerInput.includes('exam')) {
            return "School can be incredibly stressful. Remember to take deep breaths. Have you taken any breaks today?";
        } else if (lowerInput.includes('tired') || lowerInput.includes('sleep')) {
            return "Rest is so important for your mind. Maybe it's time to disconnect for a bit and recharge?";
        } else if (lowerInput.includes('thank')) {
            return "You're very welcome. I'm always here if you need to chat.";
        } else {
            return "I hear you. Tell me more about that. I'm here to listen and support you.";
        }
    }
});
