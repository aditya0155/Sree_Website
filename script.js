// Define the list of models and their providers
const models = [
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
    "provider-2/o3",
    "provider-2/glm-4.5",
    "provider-2/glm-4.5-air",
    "provider-2/gpt-4.1",
    "provider-2/gpt-4o",
    "provider-2/gpt-4o-mini",
    "provider-2/gpt-4o-mini-transcribe",
    "provider-2/gpt-5-mini",
    "provider-2/gpt-5-nano",
    "provider-2/kimi-k2"
];

document.addEventListener('DOMContentLoaded', () => {
    const checkModelsBtn = document.getElementById('checkModelsBtn');
    const modelStatusDiv = document.getElementById('modelStatus');
    const baseUrlInput = document.getElementById('baseUrl');
    const apiKeyInput = document.getElementById('apiKey');

    // Store model data (status, counts, retry timers)
    const modelData = {};

    checkModelsBtn.addEventListener('click', checkAllModels);

    function checkAllModels() {
        const baseUrl = baseUrlInput.value.trim();
        const apiKey = apiKeyInput.value.trim();

        if (!baseUrl || !apiKey) {
            alert('Please provide both Base URL and API Key.');
            return;
        }

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

        statusIndicator.className = 'model-status-indicator status-checking';
        modelInfo.status = 'checking';
        if (modelInfo.retryTimer) {
            clearTimeout(modelInfo.retryTimer);
            modelInfo.retryTimer = null;
        }

        try {
            // Use the chat completions endpoint to test the model
            const response = await fetch(`${baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: modelFullName,
                    messages: [{ role: "user", content: "Hello, are you working?" }],
                    max_tokens: 5
                })
            });

            if (response.ok) {
                statusIndicator.className = 'model-status-indicator status-working';
                modelInfo.status = 'working';
                modelInfo.passed++;
            } else {
                console.error(`Error checking ${modelFullName}:`, response.status, await response.text());
                statusIndicator.className = 'model-status-indicator status-not-working';
                modelInfo.status = 'not-working';
                modelInfo.failed++;
                // Retry failed models every 3 seconds
                modelInfo.retryTimer = setTimeout(() => checkModelStatus(baseUrl, apiKey, modelFullName), 3000);
            }
        } catch (error) {
            console.error(`Network error checking ${modelFullName}:`, error);
            statusIndicator.className = 'model-status-indicator status-not-working';
            modelInfo.status = 'not-working';
            modelInfo.failed++;
            // Retry failed models every 3 seconds
            modelInfo.retryTimer = setTimeout(() => checkModelStatus(baseUrl, apiKey, modelFullName), 3000);
        } finally {
            modelCountsSpan.textContent = `(Passed: ${modelInfo.passed}, Failed: ${modelInfo.failed})`;
        }
    }
});