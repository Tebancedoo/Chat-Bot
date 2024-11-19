class OpenAIAPI {
    static async generateResponse(userMessage, conversationHistory = []) {
        const apiKey = process.env.OPENAI_API_KEY;
        const endpoint = 'https://api.openai.com/v1/chat/completions';

        if (!apiKey) {
            console.error("API key not set!");
            return 'API key not set!';
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-1106",
                messages: conversationHistory.concat([{ role: 'user', content: userMessage }]),
                max_tokens: 150
            }),
        });

        const responseData = await response.json();

        // Log the entire API response for debugging
        console.log(responseData);

        // Ensure the choices array exists and is not empty
        if (responseData && responseData.choices && responseData.choices.length > 0) {
            const message = responseData.choices[0].message?.content; // Access the message content correctly
            if (message) {
                return message;
            } else {
                console.error('Error: No valid message content found.');
                return 'Sorry, I couldn\'t understand that.';
            }
        } else {
            console.error('Error: No valid response from OpenAI API');
            return 'Sorry, I couldn\'t understand that.';
        }
    }
}

module.exports = { OpenAIAPI };
