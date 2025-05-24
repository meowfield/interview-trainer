const translations = {
    en: {
        logoText: 'Interview Prep',
        heroTitle: 'Interview Prompt Generator',
        heroSubtitle: 'Create comprehensive prompts for AI-powered interview preparation',
        labelInterviewStage: 'Interview Stage',
        labelPreparationType: 'Preparation Type',
        labelSystemPrompt: 'System Prompt',
        labelUserInfo: 'Candidate Information',
        labelJobDescription: 'Job Description',
        labelAdditionalContext: 'Additional Context',
        generateButtonText: 'Generate & Copy Prompt',
        statusText: 'Copied to clipboard!',
        footerText: 'Simple tool for interview preparation',
        interviewStages: {
            hr: 'HR & Cultural Fit Interview',
            skills: 'Skills & Competency Assessment',
            case: 'Case Study & Problem Solving',
            team: 'Team Introduction & Dynamics',
            technical: 'Technical & Domain Expertise'
        },
        preparationTypes: {
            questions: 'Generate potential interview questions',
            dialogue: 'Interactive practice conversation',
            ideal: 'Simulated ready dialogue. AI asks questions and provides "correct" answers'
        },
        placeholders: {
            systemPrompt: 'Enter your system prompt here...',
            userInfo: 'Share your background, skills, and experience...',
            jobDescription: 'Paste the complete job description here...',
            additionalContext: 'Any additional information or specific requirements...'
        }
    },
    ru: {
        logoText: 'Interview Prep',
        heroTitle: 'Генератор промптов для собеседований',
        heroSubtitle: 'Создавайте комплексные промпты для подготовки к собеседованиям с ИИ',
        labelInterviewStage: 'Этап собеседования',
        labelPreparationType: 'Вариант подготовки',
        labelSystemPrompt: 'Системный промпт',
        labelUserInfo: 'Информация о кандидате',
        labelJobDescription: 'Описание вакансии',
        labelAdditionalContext: 'Дополнительный контекст',
        generateButtonText: 'Сформировать и скопировать',
        statusText: 'Скопировано в буфер!',
        footerText: 'Простой инструмент для подготовки к собеседованиям',
        interviewStages: {
            hr: 'HR и культурное соответствие',
            skills: 'Оценка навыков и компетенций',
            case: 'Кейсы и решение задач',
            team: 'Знакомство с командой',
            technical: 'Техническая экспертиза'
        },
        preparationTypes: {
            questions: 'Генерация возможных вопросов собеседования',
            dialogue: 'Интерактивная практика в диалоге',
            ideal: 'Имитация готового диалога. ИИ задает вопросы и "правильно" отвечает'
        },
        placeholders: {
            systemPrompt: 'Введите системный промпт здесь...',
            userInfo: 'Расскажите о своем опыте, навыках и достижениях...',
            jobDescription: 'Вставьте полное описание вакансии сюда...',
            additionalContext: 'Любая дополнительная информация или особые требования...'
        }
    }
};

const systemPrompts = {
    questions: {
        en: `You will receive the following data wrapped in tags:
<user_profile_data>: Candidate information (resume, skills, experience, self-presentation).
<job_description_data>: Job description (requirements, tasks, tech stack, company description).
<additional_context_data>: Any additional information (if provided).
<interview_stage>: The specific stage of the interview process.

Your task is to generate a comprehensive list of potential interview questions for the specified interview stage and position based on the candidate's profile and job requirements.

Generate 10-15 relevant questions that would likely be asked during this interview stage. Questions should:
* Be appropriate for the specified interview stage
* Match the job requirements and candidate's background
* Cover different aspects (technical skills, experience, motivation, cultural fit, etc.)
* Be realistic and commonly used in professional interviews
* Progress from general to more specific topics

Format the output as a numbered list of questions.`,

        ru: `Ты получишь следующие данные, обернутые в теги:
<user_profile_data>: Информация о кандидате (резюме, навыки, опыт, самопрезентация).
<job_description_data>: Описание вакансии (требования, задачи, стек, описание компании).
<additional_context_data>: Любая дополнительная информация (если есть).
<interview_stage>: Конкретный этап процесса собеседования.

Твоя задача — сгенерировать подробный список потенциальных вопросов для собеседования на указанном этапе и для данной позиции, основываясь на профиле кандидата и требованиях к работе.

Сгенерируй 10-15 релевантных вопросов, которые вероятно будут заданы на этом этапе собеседования. Вопросы должны:
* Соответствовать указанному этапу собеседования
* Соответствовать требованиям работы и бэкграунду кандидата
* Покрывать различные аспекты (технические навыки, опыт, мотивация, культурное соответствие и т.д.)
* Быть реалистичными и часто используемыми в профессиональных собеседованиях
* Развиваться от общих к более специфическим темам

Оформи результат в виде нумерованного списка вопросов.`
    },

    dialogue: {
        en: `You will receive the following data wrapped in tags:
<user_profile_data>: Candidate information (resume, skills, experience, self-presentation).
<job_description_data>: Job description (requirements, tasks, tech stack, company description).
<additional_context_data>: Any additional information (if provided).
<interview_stage>: The specific stage of the interview process.

You are an experienced interviewer conducting an interview for the specified stage. Your task is to conduct an interactive interview session where you:

1. Start by introducing yourself and explaining the interview format
2. Ask ONE question at a time and wait for the candidate's response
3. After each response, provide brief constructive feedback highlighting both strengths and areas for improvement
4. Ask follow-up questions based on the candidate's answers
5. Adapt your questioning style to the specified interview stage

Keep the conversation natural and professional. After each candidate response, always:
* Acknowledge their answer
* Provide specific feedback (what was good, what could be improved)
* Ask the next relevant question

Begin the interview now with an appropriate opening for the specified interview stage.`,

        ru: `Ты получишь следующие данные, обернутые в теги:
<user_profile_data>: Информация о кандидате (резюме, навыки, опыт, самопрезентация).
<job_description_data>: Описание вакансии (требования, задачи, стек, описание компании).
<additional_context_data>: Любая дополнительная информация (если есть).
<interview_stage>: Конкретный этап процесса собеседования.

Ты опытный интервьюер, проводящий собеседование на указанном этапе. Твоя задача — провести интерактивную сессию собеседования, где ты:

1. Начинаешь с представления себя и объяснения формата собеседования
2. Задаешь ОДИН вопрос за раз и ждешь ответа кандидата
3. После каждого ответа даешь краткую конструктивную обратную связь, подчеркивая как сильные стороны, так и области для улучшения
4. Задаешь уточняющие вопросы на основе ответов кандидата
5. Адаптируешь стиль вопросов к указанному этапу собеседования

Поддерживай естественную и профессиональную беседу. После каждого ответа кандидата всегда:
* Признавай их ответ
* Давай конкретную обратную связь (что было хорошо, что можно улучшить)
* Задавай следующий релевантный вопрос

Начни собеседование сейчас с подходящего открытия для указанного этапа собеседования.`
    },

    ideal: {
        en: `You will receive the following data wrapped in tags:
<user_profile_data>: Candidate information (resume, skills, experience, self-presentation).
<job_description_data>: Job description (requirements, tasks, tech stack, company description).
<additional_context_data>: Any additional information (if provided).
<interview_stage>: The specific stage of the interview process.

Your task is to generate a realistic interview dialogue for the specified interview stage, where you act as the "Interviewer" and provide ideal candidate responses based on the user's profile.

1. Formulate interviewer questions appropriate for the specified interview stage and position
2. Provide "Ideal" answers from the "Candidate" that:
   * Are clear, structured, and convincing
   * Demonstrate the candidate's skills and experience from <user_profile_data>
   * Directly link to requirements from <job_description_data>
   * Use the STAR method or similar techniques for behavioral questions when appropriate
   * Are tailored to the specific interview stage

Generate 5-7 question-answer pairs that cover key aspects relevant to the interview stage. Make questions diverse and appropriate for the stage (e.g., HR focus on culture fit, technical focus on skills, etc.).
Conclude with a logical ending such as candidate questions or next steps discussion.`,

        ru: `Ты получишь следующие данные, обернутые в теги:
<user_profile_data>: Информация о кандидате (резюме, навыки, опыт, самопрезентация).
<job_description_data>: Описание вакансии (требования, задачи, стек, описание компании).
<additional_context_data>: Любая дополнительная информация (если есть).
<interview_stage>: Конкретный этап процесса собеседования.

Твоя задача — сгенерировать реалистичный диалог собеседования для указанного этапа, где ты выступаешь в роли "Интервьюера" и предоставляешь идеальные ответы кандидата на основе профиля пользователя.

1. Сформулируй вопросы интервьюера, подходящие для указанного этапа собеседования и позиции
2. Предоставь "Идеальные" ответы от "Кандидата", которые:
   * Четкие, структурированные и убедительные
   * Демонстрируют навыки и опыт кандидата из <user_profile_data>
   * Напрямую связаны с требованиями из <job_description_data>
   * Используют STAR-метод или аналогичные техники для поведенческих вопросов, если уместно
   * Адаптированы к конкретному этапу собеседования

Сгенерируй 5-7 пар вопрос-ответ, которые покрывают ключевые аспекты, релевантные для этапа собеседования. Сделай вопросы разнообразными и подходящими для этапа (например, HR фокусируется на культурном соответствии, техническое — на навыках и т.д.).
Заверши логическим финалом, например, вопросами от кандидата или обсуждением следующих шагов.`
    }
};