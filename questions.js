const questionnaireData = {
    "en": [
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
    ],
    "ru": [
        {
            sectionTitle: "Раздел А: О вас",
            items: [
                {
                    id: "age_group",
                    text: "Ваша возрастная группа?",
                    type: "single_choice",
                    options: ["До 18", "18–24", "25–34", "35–44", "45+"]
                },
                {
                    id: "identity",
                    text: "Как вы себя идентифицируете?",
                    type: "single_choice",
                    options: ["Мужчина", "Женщина", "Предпочитаю не говорить"]
                }
            ]
        },
        {
            sectionTitle: "Раздел Б: Чувства и Осознанность",
            items: [
                {
                    id: "silent_struggle",
                    text: "Как вы думаете, многие ли люди вокруг нас молча страдают от депрессии или грусти?",
                    type: "single_choice",
                    options: ["Да, многие", "Некоторые, но не много", "Не уверен(а)"]
                },
                {
                    id: "life_heavy",
                    text: "Бывали ли у вас периоды, когда жизнь казалась тяжелой, и вы не получали удовольствия от привычных вещей?",
                    type: "single_choice",
                    options: ["Да", "Нет", "Предпочитаю не говорить"],
                    tips: {
                        "Да": "Признать, что тяжело — это смелый шаг. Будьте бережны к себе сейчас."
                    }
                },
                {
                    id: "comfortable_talking",
                    text: "Если бы кто-то из близких был в депрессии, вам было бы комфортно поговорить с ним об этом?",
                    type: "single_choice",
                    options: ["Да", "Нет", "Возможно"]
                }
            ]
        },
        {
            sectionTitle: "Раздел В: Справляться и Поддержка",
            items: [
                {
                    id: "coping_mechanisms",
                    text: "Когда вам грустно, что обычно помогает почувствовать себя немного лучше? (Выберите до 3)",
                    type: "multiple_choice",
                    maxSelections: 3,
                    options: [
                        "Разговор с близким другом или членом семьи",
                        "Время на природе",
                        "Движение (прогулка, спорт)",
                        "Духовные практики (молитва, медитация)",
                        "Творчество (музыка, рисование, письмо)",
                        "Профессиональная помощь (психолог, врач)",
                        "Время в одиночестве / отдых",
                        "Другое"
                    ],
                    tips: {
                        "Время на природе": "Природа лечит. Попробуйте выйти на улицу хотя бы на 5 минут сегодня.",
                        "Движение (прогулка, спорт)": "Движение — лучшее лекарство. Короткая прогулка может прояснить ум.",
                        "Духовные практики (молитва, медитация)": "Духовная связь может дать сильную опору.",
                        "Творчество (музыка, рисование, письмо)": "Творчество исцеляет. Уделите немного времени этому сегодня.",
                        "Разговор с близким другом или членом семьи": "Связь с людьми важна. Не стесняйтесь написать другу, которому доверяете.",
                        "Время в одиночестве / отдых": "Отдых важен. Найдите время для тишины и восстановления.",
                        "Профессиональная помощь (психолог, врач)": "Обратиться за помощью — это сила. Продолжайте опираться на этот ресурс."
                    },
                    hasOpenOption: true
                },
                {
                    id: "personal_help",
                    text: "Можете поделиться одной вещью, которая лично вам помогла в трудные времена?",
                    type: "text"
                },
                {
                    id: "group_activity",
                    text: "Присоединились бы вы к дружеской активности (прогулка, творчество, обсуждение), чтобы поднять настроение?",
                    type: "single_choice",
                    options: ["Да", "Нет", "Возможно"]
                }
            ]
        },
        {
            sectionTitle: "Раздел Г: Барьеры и Потребности",
            items: [
                {
                    id: "barriers",
                    text: "Как вы думаете, почему многие избегают обращения за помощью при депрессии? (Выберите все подходящие)",
                    type: "multiple_choice",
                    options: [
                        "Страх осуждения",
                        "Незнание, куда обратиться",
                        "Беспокойство о деньгах",
                        "Чувство, что нужно «справиться самому»",
                        "Неверие, что депрессия реальна",
                        "Другое"
                    ],
                    tips: {
                        "Страх осуждения": "Помните, поиск поддержки — это признак силы, а не слабости. Вы не одни.",
                        "Незнание, куда обратиться": "Найти помощь бывает сложно. Я постараюсь подсказать вам.",
                        "Беспокойство о деньгах": "Финансовые вопросы реальны, но часто есть доступные ресурсы.",
                        "Чувство, что нужно «справиться самому»": "Нам всем иногда нужна рука помощи. Это нормально.",
                        "Неверие, что депрессия реальна": "Ваши чувства валидны и реальны. Не позволяйте никому убедить вас в обратном."
                    },
                    hasOpenOption: true
                },
                {
                    id: "design_support",
                    text: "Если бы вы могли создать одну простую вещь для поддержки людей с депрессией в вашем сообществе, что бы это было?",
                    type: "text"
                }
            ]
        }
    ],
    "uz": [
        {
            sectionTitle: "A Bo'lim: Siz haqingizda",
            items: [
                {
                    id: "age_group",
                    text: "Yoshingiz nechada?",
                    type: "single_choice",
                    options: ["18 dan kichik", "18–24", "25–34", "35–44", "45+"]
                },
                {
                    id: "identity",
                    text: "Jinsingiz?",
                    type: "single_choice",
                    options: ["Erkak", "Ayol", "Aytishni xohlamayman"]
                }
            ]
        },
        {
            sectionTitle: "B Bo'lim: Hissiyotlar va Anglash",
            items: [
                {
                    id: "silent_struggle",
                    text: "Sizningcha, atrofimizdagi ko'p odamlar depressiya yoki g'amginlik bilan jimjit kurashadimi?",
                    type: "single_choice",
                    options: ["Ha, ko'pchilik", "Ba'zilar, lekin ko'p emas", "Ishonchim komil emas"]
                },
                {
                    id: "life_heavy",
                    text: "Hayotingiz og'irlashgan va oldingidek narsalardan zavqlanmay qolgan davr bo'lganmi?",
                    type: "single_choice",
                    options: ["Ha", "Yo'q", "Aytishni xohlamayman"],
                    tips: {
                        "Ha": "Qiyinchilikni tan olish jasorat talab qiladi. Hozir o'zingizga nisbatan mehribon bo'ling."
                    }
                },
                {
                    id: "comfortable_talking",
                    text: "Agar yaqiningiz tushkunlikka tushgan bo'lsa, u bilan bu haqda gaplashish sizga qulay bo'larmidi?",
                    type: "single_choice",
                    options: ["Ha", "Yo'q", "Balki"]
                }
            ]
        },
        {
            sectionTitle: "C Bo'lim: Yengish va Qo'llab-quvvatlash",
            items: [
                {
                    id: "coping_mechanisms",
                    text: "Kayfiyatingiz tushganda, nima sizga yordam beradi? (3 tagacha tanlang)",
                    type: "multiple_choice",
                    maxSelections: 3,
                    options: [
                        "Yaqin do'st yoki oila a'zosi bilan gaplashish",
                        "Tabiat qo'ynida vaqt o'tkazish",
                        "Harakat qilish (yurish, sport)",
                        "Ruhiy amaliyotlar (ibodat, meditatsiya)",
                        "Ijodkorlik (musiqa, san'at, yozish)",
                        "Professional yordam (psixolog, shifokor)",
                        "Yolg'iz qolish / dam olish",
                        "Boshqa"
                    ],
                    tips: {
                        "Tabiat qo'ynida vaqt o'tkazish": "Tabiat shifo beradi. Bugun hech bo'lmasa 5 daqiqa tashqariga chiqing.",
                        "Harakat qilish (yurish, sport)": "Harakat — eng yaxshi dori. Qisqa sayr fikringizni tiniqlashtirishi mumkin.",
                        "Ruhiy amaliyotlar (ibodat, meditatsiya)": "Ruhiy bog'lanish kuchli tayanch bo'lishi mumkin.",
                        "Ijodkorlik (musiqa, san'at, yozish)": "Ijodkorlik davolaydi. Bugun bunga ozgina vaqt ajrating.",
                        "Yaqin do'st yoki oila a'zosi bilan gaplashish": "Insonlar bilan aloqa muhim. Ishongan do'stingizga yozishdan tortinmang.",
                        "Yolg'iz qolish / dam olish": "Dam olish muhim. Tinchlanish va tiklanish uchun vaqt toping.",
                        "Professional yordam (psixolog, shifokor)": "Yordam so'rash — bu kuchlilik belgisi. Bu manbaga tayanishda davom eting."
                    },
                    hasOpenOption: true
                },
                {
                    id: "personal_help",
                    text: "Qiyin paytlarda shaxsan sizga yordam bergan biror narsani aytib bera olasizmi?",
                    type: "text"
                },
                {
                    id: "group_activity",
                    text: "Kayfiyatni ko'tarish uchun do'stona guruh mashg'ulotlariga (sayr, ijod, suhbat) qo'shilgan bo'larmidingiz?",
                    type: "single_choice",
                    options: ["Ha", "Yo'q", "Balki"]
                }
            ]
        },
        {
            sectionTitle: "D Bo'lim: To'siqlar va Ehtiyojlar",
            items: [
                {
                    id: "barriers",
                    text: "Sizningcha, nima uchun ko'p odamlar depressiya paytida yordam so'rashdan qochishadi? (Mos keladiganini tanlang)",
                    type: "multiple_choice",
                    options: [
                        "Boshqalar hukm qilishidan qo'rqish",
                        "Qayerga murojaat qilishni bilmaslik",
                        "Pul yoki narx haqida qayg'urish",
                        "«O'zim hal qilishim kerak» degan his",
                        "Depressiya haqiqiy ekanligiga ishonmaslik",
                        "Boshqa"
                    ],
                    tips: {
                        "Boshqalar hukm qilishidan qo'rqish": "Yordam so'rash — zaiflik emas, kuchlilik belgisidir. Siz yolg'iz emassiz.",
                        "Qayerga murojaat qilishni bilmaslik": "Yordam topish qiyin bo'lishi mumkin. Men sizga yo'l ko'rsatishga harakat qilaman.",
                        "Pul yoki narx haqida qayg'urish": "Moliyaviy muammolar haqiqiy, lekin ko'pincha arzon manbalar mavjud.",
                        "«O'zim hal qilishim kerak» degan his": "Hammamizga ba'zan yordam kerak bo'ladi. Bu normal holat.",
                        "Depressiya haqiqiy ekanligiga ishonmaslik": "Sizning his-tuyg'ularingiz haqiqiy. Boshqalar sizni aksiga ishontirishiga yo'l qo'ymang."
                    },
                    hasOpenOption: true
                },
                {
                    id: "design_support",
                    text: "Agar siz hamjamiyatingizda tushkunlikka tushgan odamlar uchun bitta oddiy yordam turini yarata olsangiz, u nima bo'lar edi?",
                    type: "text"
                }
            ]
        }
    ]
};

// Export for module usage, or global if using simple script tags
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questionnaireData;
} else {
    window.questionnaireData = questionnaireData;
}
