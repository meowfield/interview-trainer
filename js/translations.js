const translations = {
    en: {
        logoText: 'PrepareToWork',
        heroTitle: 'Interview Prompt Generator',
        heroSubtitle: 'Create comprehensive prompts for AI-powered interview preparation',
        labelSystemPrompt: 'System Prompt',
        labelUserInfo: 'Candidate Information',
        labelJobDescription: 'Job Description',
        labelAdditionalContext: 'Additional Context',
        generateButtonText: 'Generate & Copy Prompt',
        statusText: 'Copied to clipboard!',
        footerText: 'Professional interview preparation tool for modern developers',
        placeholders: {
            systemPrompt: 'Enter your system prompt here...',
            userInfo: 'Share your background, skills, and experience...',
            jobDescription: 'Paste the complete job description here...',
            additionalContext: 'Any additional information or specific requirements...'
        }
    },
    ru: {
        logoText: 'PrepareToWork',
        heroTitle: 'Генератор промптов для собеседований',
        heroSubtitle: 'Создавайте комплексные промпты для подготовки к собеседованиям с ИИ',
        labelSystemPrompt: 'Системный промпт',
        labelUserInfo: 'Информация о кандидате',
        labelJobDescription: 'Описание вакансии',
        labelAdditionalContext: 'Дополнительный контекст',
        generateButtonText: 'Сформировать и скопировать',
        statusText: 'Скопировано в буфер!',
        footerText: 'Профессиональный инструмент подготовки к собеседованиям',
        placeholders: {
            systemPrompt: 'Введите системный промпт здесь...',
            userInfo: 'Расскажите о своем опыте, навыках и достижениях...',
            jobDescription: 'Вставьте полное описание вакансии сюда...',
            additionalContext: 'Любая дополнительная информация или особые требования...'
        }
    }
};

const systemPrompts = {
    en: `You will receive the following data wrapped in tags:
<user_profile_data>: Candidate information (resume, skills, experience, self-presentation).
<job_description_data>: Job description (requirements, tasks, tech stack, company description).
<additional_context_data>: Any additional information (if provided).

Your task is to generate a realistic interview dialogue for the given position, where you act as the "Interviewer" and the candidate is the user whose data is provided in <user_profile_data>.

1. Formulate interviewer questions that are logical to ask for the given position and candidate profile.
2. "Ideal" answers from the "Candidate". The answers should:
   * Be clear, structured, and convincing.
   * Demonstrate the candidate's skills and experience from <user_profile_data>, directly linking them to requirements from <job_description_data>.
   * Use the STAR method or similar techniques for behavioral questions when appropriate.
   * Consider context from <additional_context_data> if provided.

Generate sufficient questions and answers to cover key aspects of the interview for this role (e.g., 5-7 question-answer pairs). Try to make the questions diverse (experience, motivation, behavioral, situational).
Conclude the dialogue with a logical ending, such as questions from the candidate to the interviewer or discussion of next steps.`,
    
    ru: `Ты получишь следующие данные, обернутые в теги:
<user_profile_data>: Информация о кандидате (резюме, навыки, опыт, самопрезентация).
<job_description_data>: Описание вакансии (требования, задачи, стек, описание компании).
<additional_context_data>: Любая дополнительная информация (если есть).

Твоя задача — сгенерировать реалистичный диалог собеседования для данной вакансии, где ты выступаешь в роли "Интервьюера", а кандидат — это пользователь, чьи данные переданы в <user_profile_data>.

1. Сформулируй вопросы интервьюера, которые логично задать по данной вакансии и профилю кандидата.
2. "Идеальные" ответы от "Кандидата". Ответы должны:
   * Быть четкими, структурированными и убедительными.
   * Демонстрировать навыки и опыт кандидата из <user_profile_data>, напрямую связывая их с требованиями из <job_description_data>.
   * Использовать STAR-метод или аналогичные техники для ответов на поведенческие вопросы, если это уместно.
   * Учитывать контекст из <additional_context_data>, если он предоставлен.

Сгенерируй достаточное количество вопросов и ответов, чтобы покрыть ключевые аспекты собеседования для данной роли (например, 5-7 пар вопрос-ответ). Постарайся, чтобы вопросы были разнообразными (опыт, мотивация, поведенческие, ситуационные).
Заверши диалог логическим финалом, например, вопросами от кандидата к интервьюеру или обсуждением следующих шагов.`
};