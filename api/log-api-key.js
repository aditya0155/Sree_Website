<<<<<<< HEAD
// api/log-api-key.js

export default function handler(request, response) {
  if (request.method === 'POST') {
    const { apiKey } = JSON.parse(request.body);

    // For educational purposes, we log the API key here.
    // IMPORTANT: In a real application, NEVER log sensitive credentials like API keys directly.
    // This is for demonstration of sending data to a backend.
    console.log('Received API Key:', apiKey);

    // Respond to the client
    response.status(200).json({ message: 'API key received for logging.' });
  } else {
    response.status(405).json({ message: 'Method not allowed' });
  }
}
=======
// api/log-api-key.js

export default function handler(request, response) {
  if (request.method === 'POST') {
    const { apiKey } = JSON.parse(request.body);

    // For educational purposes, we log the API key here.
    // IMPORTANT: In a real application, NEVER log sensitive credentials like API keys directly.
    // This is for demonstration of sending data to a backend.
    console.log('Received API Key:', apiKey);

    // Respond to the client
    response.status(200).json({ message: 'API key received for logging.' });
  } else {
    response.status(405).json({ message: 'Method not allowed' });
  }
}
>>>>>>> f25b372f0c5222a6fd2a2c12f1e57d15ad959ad5
// Trigger redeploy comment