const express = require('express');
const path = require('path');
const { OpenAIAPI } = require('./openai');

// Comment out the line that disables TLS verification
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; // REMOVE THIS FOR PRODUCTION

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/getChatbotResponse', async (req, res) => {
    const userMessage = req.body.userMessage;

    // Use OpenAI API to generate a response
    const chatbotResponse = await OpenAIAPI.generateResponse(userMessage);

    // Send the response back to the client
    res.json({ chatbotResponse });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
