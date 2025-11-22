const questionnaireData = [
    {
        sectionTitle: "Section A: About You",
        items: [
            {
                id: "age_group",
                text: "What is your age group?",
                type: "single_choice",
                options: ["Under 18", "18–24", "25–34", "35–44", "45+"]
            },
            {
                id: "identity",
                text: "How do you identify yourself?",
                type: "single_choice",
                options: ["Male", "Female", "Prefer not to say"]
            }
        ]
    },
    {
        sectionTitle: "Section B: Feelings & Awareness",
        items: [
            {
                id: "silent_struggle",
                text: "Do you think many people around us struggle silently with depression or sadness?",
                type: "single_choice",
                options: ["Yes, a lot", "Some, but not many", "Not really sure"]
            },
            {
                id: "life_heavy",
                text: "Have you ever gone through a period when life felt heavy, and you didn’t enjoy things like before?",
                type: "single_choice",
                options: ["Yes", "No", "Prefer not to say"],
                tips: {
                    "Yes": "It takes courage to acknowledge when things feel heavy. Be gentle with yourself right now."
                }
            },
            {
                id: "comfortable_talking",
                text: "If someone close to you was depressed, would you feel comfortable talking with them about it?",
                type: "single_choice",
                options: ["Yes", "No", "Maybe"]
            }
        ]
    },
    {
        sectionTitle: "Section C: Coping & Support",
        items: [
            {
                id: "coping_mechanisms",
                text: "When you feel down, what usually helps you feel a little better? (Choose up to 3)",
                type: "multiple_choice",
                maxSelections: 3,
                options: [
                    "Talking to a close friend or family member",
                    "Spending time outside in nature",
                    "Moving my body (walking, exercise, sports)",
                    "Spiritual practices (prayer, meditation, reflection)",
                    "Doing something creative (music, art, writing)",
                    "Professional support (therapist, counselor, doctor)",
                    "Time alone / rest",
                    "Other"
                ],
                tips: {
                    "Spending time outside in nature": "Since nature helps you, try to step outside for even 5 minutes today.",
                    "Moving my body (walking, exercise, sports)": "Movement is great medicine. A short walk might help clear your mind.",
                    "Spiritual practices (prayer, meditation, reflection)": "Taking time for spiritual connection can be very grounding.",
                    "Doing something creative (music, art, writing)": "Expressing yourself through creativity can be very healing. Maybe spend some time on your art/writing today.",
                    "Talking to a close friend or family member": "Connection is powerful. Don't hesitate to reach out to that friend you trust.",
                    "Time alone / rest": "Rest is important. Make sure to take that quiet time you need to recharge.",
                    "Professional support (therapist, counselor, doctor)": "It's strong of you to seek professional support. Keep leaning on that resource."
                },
                hasOpenOption: true
            },
            {
                id: "personal_help",
                text: "Can you share one thing that has personally helped you through tough times?",
                type: "text"
            },
            {
                id: "group_activity",
                text: "Would you join a friendly group activity (like a walk, creative session, or discussion circle) to lift your mood?",
                type: "single_choice",
                options: ["Yes", "No", "Maybe"]
            }
        ]
    },
    {
        sectionTitle: "Section D: Barriers & Needs",
        items: [
            {
                id: "barriers",
                text: "In your opinion, why do many people avoid seeking help for depression? (Choose all that feel true)",
                type: "multiple_choice",
                options: [
                    "Fear of being judged by others",
                    "Not knowing where to go for help",
                    "Worry about money or cost",
                    "Feeling like they should “just handle it” alone",
                    "Not believing depression is real",
                    "Other"
                ],
                tips: {
                    "Fear of being judged by others": "Remember, seeking support is a sign of strength, not weakness. You are not alone in this.",
                    "Not knowing where to go for help": "It can be confusing to find help. I can try to help guide you if you'd like.",
                    "Worry about money or cost": "Financial worries are real, but there are often low-cost resources available.",
                    "Feeling like they should “just handle it” alone": "We all need a hand sometimes. It's okay to let others support you.",
                    "Not believing depression is real": "Your feelings are valid and real. Don't let anyone tell you otherwise."
                },
                hasOpenOption: true
            },
            {
                id: "design_support",
                text: "If you could design one simple support for people in your community who feel depressed, what would it be?",
                type: "text"
            }
        ]
    }
];

// Export for module usage, or global if using simple script tags
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questionnaireData;
} else {
    window.questionnaireData = questionnaireData;
}
