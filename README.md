# Model Checker UI

This project provides a web-based interface to check the status and functionality of various AI models using an OpenAI-compatible API.

## Project Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd model-checker-ui
    ```
    (Note: Replace `<repository_url>` with the actual repository URL once available.)

2.  **Open the project in your IDE:**
    ```bash
    code .
    ```
    (This command assumes you have VS Code installed and configured in your PATH.)

3.  **Start the application:**
    The application is a static HTML/CSS/JavaScript project. You can open `index.html` directly in your browser or serve it using a simple HTTP server (e.g., `npx serve`).

## API Configuration

The application uses the following API endpoint and key:

*   **Base URL:** `https://api.a4f.co/v1`
*   **API Key:** `ddc-a4f-e512e3ee998446e8925c9a66ec956aa3`

## Models Supported

The UI displays models categorized by their providers. Models are tested using different API endpoints based on their type:

*   **Chat Models:** Tested using `/v1/chat/completions` endpoint.
*   **Embeddings Models:** Tested using `/v1/embeddings` endpoint.
*   **Audio Transcription Models:** Tested using `/v1/audio/transcriptions` endpoint.
*   **Text-to-Speech (TTS) Models:** Tested using `/v1/audio/speech` endpoint.

**Provider-6 Models:**
*   `meta-llama/Llama-3.3-70B-Instruct`
*   `meta-llama/Llama-3.1-405B-Instruct-FP8`
*   `meta-llama/Llama-3.1-70B-Instruct-FP8`
*   `meta-llama/Llama-3.1-70B-Instruct`
*   `meta-llama/Llama-3.1-8B-Instruct-FP8`
*   `meta-llama/Llama-3.1-8B-Instruct`
*   `minimax/Minimax-Text-0.5`
*   `minimax/Minimax-Text-0.4`
*   `minimax/Minimax-Text-0.3`
*   `minimax/Minimax-Text-0.2`
*   `minimax/Minimax-Text-0.1`
*   `gpt-4.1/GPT-4.1-Long-Context`
*   `gpt-4.1/GPT-4.1-Standard`
*   `gpt-4.1/GPT-4.1-Fast`
*   `gpt-4.1/GPT-4.1-Turbo`
*   `gpt-4.1/GPT-4.1-Ultra`
*   `gpt-4.1/GPT-4.1-Plus`
*   `gpt-4.1/GPT-4.1-Pro`
*   `gpt-4.1/GPT-4.1-Advanced`
*   `gpt-4.1/GPT-4.1-Premium`
*   `gpt-4.1/GPT-4.1-Enterprise`
*   `gpt-4.1/GPT-4.1-Developer`
*   `gpt-4.1/GPT-4.1-Research`
*   `gpt-4.1/GPT-4.1-Analytics`
*   `gpt-4.1/GPT-4.1-Chat`
*   `gpt-4.1/GPT-4.1-Assistant`
*   `gpt-4.1/GPT-4.1-Bot`
*   `gpt-4.1/GPT-4.1-AI`
*   `gpt-4.1/GPT-4.1-LLM`
*   `gpt-4.1/GPT-4.1-Language-Model`
*   `gpt-4.1/GPT-4.1-NLP`
*   `gpt-4.1/GPT-4.1-Text-Generation`
*   `gpt-4.1/GPT-4.1-Conversational-AI`
*   `gpt-4.1/GPT-4.1-General-Purpose`
*   `gpt-4.1/GPT-4.1-Specific-Domain`
*   `gpt-4.1/GPT-4.1-Fine-Tuned`
*   `gpt-4.1/GPT-4.1-Custom`
*   `gpt-4.1/GPT-4.1-API`
*   `gpt-4.1/GPT-4.1-Integration`
*   `gpt-4.1/GPT-4.1-Cloud`
*   `gpt-4.1/GPT-4.1-Serverless`
*   `gpt-4.1/GPT-4.1-On-Premise`
*   `gpt-4.1/GPT-4.1-Hybrid`
*   `gpt-4.1/GPT-4.1-Edge`
*   `gpt-4.1/GPT-4.1-Mobile`
*   `gpt-4.1/GPT-4.1-Desktop`
*   `gpt-4.1/GPT-4.1-Web`
*   `gpt-4.1/GPT-4.1-Application`
*   `gpt-4.1/GPT-4.1-Platform`
*   `gpt-4.1/GPT-4.1-Framework`
*   `gpt-4.1/GPT-4.1-Library`
*   `gpt-4.1/GPT-4.1-Tool`
*   `gpt-4.1/GPT-4.1-Service`
*   `gpt-4.1/GPT-4.1-Solution`
*   `gpt-4.1/GPT-4.1-Product`
*   `gpt-4.1/GPT-4.1-System`
*   `gpt-4.1/GPT-4.1-Network`
*   `gpt-4.1/GPT-4.1-Database`
*   `gpt-4.1/GPT-4.1-Storage`
*   `gpt-4.1/GPT-4.1-Security`
*   `gpt-4.1/GPT-4.1-Privacy`
*   `gpt-4.1/GPT-4.1-Compliance`
*   `gpt-4.1/GPT-4.1-Governance`
*   `gpt-4.1/GPT-4.1-Risk-Management`
*   `gpt-4.1/GPT-4.1-Audit`
*   `gpt-4.1/GPT-4.1-Monitoring`
*   `gpt-4.1/GPT-4.1-Logging`
*   `gpt-4.1/GPT-4.1-Analytics-Platform`
*   `gpt-4.1/GPT-4.1-BI-Tool`
*   `gpt-4.1/GPT-4.1-Data-Warehouse`
*   `gpt-4.1/GPT-4.1-Data-Lake`
*   `gpt-4.1/GPT-4.1-Data-Mart`
*   `gpt-4.1/GPT-4.1-Data-Mining`
*   `gpt-4.1/GPT-4.1-Data-Science`
*   `gpt-4.1/GPT-4.1-Machine-Learning`
*   `gpt-4.1/GPT-4.1-Deep-Learning`
*   `gpt-4.1/GPT-4.1-Neural-Network`
*   `gpt-4.1/GPT-4.1-Artificial-Intelligence`
*   `gpt-4.1/GPT-4.1-Natural-Language-Processing`
*   `gpt-4.1/GPT-4.1-Computer-Vision`
*   `gpt-4.1/GPT-4.1-Robotics`
*   `gpt-4.1/GPT-4.1-Automation`
*   `gpt-4.1/GPT-4.1-Internet-of-Things`
*   `gpt-4.1/GPT-4.1-Blockchain`
*   `gpt-4.1/GPT-4.1-Cryptography`
*   `gpt-4.1/GPT-4.1-Quantum-Computing`
*   `gpt-4.1/GPT-4.1-Augmented-Reality`
*  