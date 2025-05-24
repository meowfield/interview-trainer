// DOM elements
const elements = {
    logoText: document.getElementById('logoText'),
    heroTitle: document.getElementById('heroTitle'),
    heroSubtitle: document.getElementById('heroSubtitle'),
    labelSystemPrompt: document.getElementById('labelSystemPrompt'),
    labelUserInfo: document.getElementById('labelUserInfo'),
    labelJobDescription: document.getElementById('labelJobDescription'),
    labelAdditionalContext: document.getElementById('labelAdditionalContext'),
    generateButtonText: document.getElementById('generateButtonText'),
    statusText: document.getElementById('statusText'),
    footerText: document.getElementById('footerText'),
    systemPrompt: document.getElementById('systemPrompt'),
    userInfo: document.getElementById('userInfo'),
    jobDescription: document.getElementById('jobDescription'),
    additionalContext: document.getElementById('additionalContext'),
    generateButton: document.getElementById('generateButton'),
    statusIndicator: document.getElementById('statusIndicator'),
    langToggle: document.getElementById('langToggle'),
    themeToggle: document.getElementById('themeToggle'),
    themeIcon: document.getElementById('themeIcon')
};

// Language management
function getCurrentLang() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE);
    return CONFIG.SUPPORTED_LANGUAGES.includes(stored) ? stored : CONFIG.DEFAULT_LANGUAGE;
}

function setLanguage(lang) {
    if (!CONFIG.SUPPORTED_LANGUAGES.includes(lang)) {
        console.warn(`Unsupported language: ${lang}`);
        lang = CONFIG.DEFAULT_LANGUAGE;
    }

    try {
        localStorage.setItem(CONFIG.STORAGE_KEYS.LANGUAGE, lang);
        const t = translations[lang];
        
        if (!t) {
            throw new Error(`Translation not found for language: ${lang}`);
        }
        
        elements.logoText.textContent = t.logoText;
        elements.heroTitle.textContent = t.heroTitle;
        elements.heroSubtitle.textContent = t.heroSubtitle;
        elements.labelSystemPrompt.textContent = t.labelSystemPrompt;
        elements.labelUserInfo.textContent = t.labelUserInfo;
        elements.labelJobDescription.textContent = t.labelJobDescription;
        elements.labelAdditionalContext.textContent = t.labelAdditionalContext;
        elements.generateButtonText.textContent = t.generateButtonText;
        elements.statusText.textContent = t.statusText;
        elements.footerText.textContent = t.footerText;
        
        elements.systemPrompt.placeholder = t.placeholders.systemPrompt;
        elements.userInfo.placeholder = t.placeholders.userInfo;
        elements.jobDescription.placeholder = t.placeholders.jobDescription;
        elements.additionalContext.placeholder = t.placeholders.additionalContext;
        
        elements.langToggle.textContent = lang === 'en' ? 'RU' : 'EN';
        document.documentElement.lang = lang;
        
        // Update system prompt if it's currently using the default prompt
        const currentSystemPrompt = elements.systemPrompt.value.trim();
        const previousLang = lang === 'en' ? 'ru' : 'en';
        
        // Check if current prompt matches the default prompt of the previous language
        if (!currentSystemPrompt || currentSystemPrompt === systemPrompts[previousLang]) {
            elements.systemPrompt.value = systemPrompts[lang];
        }
    } catch (error) {
        console.error('Error setting language:', error);
    }
}

// Theme management
function getCurrentTheme() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
    if (stored && CONFIG.THEMES.includes(stored)) {
        return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
        elements.themeIcon.innerHTML = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
        `;
    } else {
        elements.themeIcon.innerHTML = `
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        `;
    }
}

// Copy to clipboard with modern API
async function copyToClipboard(text) {
    if (!text || typeof text !== 'string') {
        throw new Error('Invalid text provided for copying');
    }

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers or non-secure contexts
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (!successful) {
                throw new Error('Fallback copy method failed');
            }
        }
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        throw err;
    }
}

// Show status indicator
function showStatus() {
    elements.statusIndicator.classList.add('show');
    setTimeout(() => {
        elements.statusIndicator.classList.remove('show');
    }, CONFIG.STATUS_DISPLAY_TIME);
}

// Validate form data
function validateFormData(data) {
    const errors = [];
    const currentLang = getCurrentLang();
    const t = translations[currentLang];

    if (!data.userInfo || data.userInfo.length < CONFIG.VALIDATION.MIN_USER_INFO_LENGTH) {
        errors.push(`${t.labelUserInfo}: Minimum ${CONFIG.VALIDATION.MIN_USER_INFO_LENGTH} characters required`);
    }

    if (!data.jobDescription || data.jobDescription.length < CONFIG.VALIDATION.MIN_JOB_DESCRIPTION_LENGTH) {
        errors.push(`${t.labelJobDescription}: Minimum ${CONFIG.VALIDATION.MIN_JOB_DESCRIPTION_LENGTH} characters required`);
    }

    // Check maximum length for all fields
    Object.entries(data).forEach(([key, value]) => {
        if (value && value.length > CONFIG.VALIDATION.MAX_FIELD_LENGTH) {
            errors.push(`Field too long: Maximum ${CONFIG.VALIDATION.MAX_FIELD_LENGTH} characters allowed`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Show error messages
function showErrors(errors) {
    const errorMessage = errors.join('\n');
    alert(errorMessage);
}

// Generate and copy prompt
async function generatePrompt() {
    try {
        const formData = {
            systemPrompt: elements.systemPrompt.value.trim(),
            userInfo: elements.userInfo.value.trim(),
            jobDescription: elements.jobDescription.value.trim(),
            additionalContext: elements.additionalContext.value.trim()
        };

        // Validate form data
        const validation = validateFormData(formData);
        if (!validation.isValid) {
            showErrors(validation.errors);
            return;
        }

        // Show loading state
        elements.generateButton.classList.add('loading');

        // Simulate processing time for better UX
        await new Promise(resolve => setTimeout(resolve, CONFIG.LOADING_SIMULATION_TIME));

        const currentLang = getCurrentLang();
        let finalPrompt = formData.systemPrompt || systemPrompts[currentLang];
        finalPrompt += `\n\n<user_profile_data>\n${formData.userInfo}\n</user_profile_data>`;
        finalPrompt += `\n\n<job_description_data>\n${formData.jobDescription}\n</job_description_data>`;
        
        if (formData.additionalContext) {
            finalPrompt += `\n\n<additional_context_data>\n${formData.additionalContext}\n</additional_context_data>`;
        }

        const success = await copyToClipboard(finalPrompt);
        
        if (success) {
            showStatus();
        } else {
            throw new Error('Failed to copy to clipboard');
        }
    } catch (error) {
        console.error('Error generating prompt:', error);
        alert('An error occurred while generating the prompt. Please try again.');
    } finally {
        elements.generateButton.classList.remove('loading');
    }
}

// Event listeners
elements.langToggle.addEventListener('click', () => {
    const currentLang = getCurrentLang();
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    setLanguage(newLang);
});

elements.themeToggle.addEventListener('click', () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

elements.generateButton.addEventListener('click', generatePrompt);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        generatePrompt();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(getCurrentLang());
    setTheme(getCurrentTheme());
    
    // Set default system prompt if empty
    const currentLang = getCurrentLang();
    if (!elements.systemPrompt.value) {
        elements.systemPrompt.value = systemPrompts[currentLang];
    }
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.THEME)) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});