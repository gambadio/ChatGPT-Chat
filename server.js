const express = require('express'); 
const { OpenAIApi, Configuration } = require('openai'); 
const bodyParser = require('body-parser'); 
const path = require('path');

const app = express(); app.use(bodyParser.json()); app.use(express.static(path.join(__dirname, 'public')));

const OPENAI_API_KEY = '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'; const configuration = new Configuration({ apiKey: OPENAI_API_KEY }); const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

app.post('/api/chat', async (req, res) => { const userMessage = req.body.message;

try {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: userMessage,
            },
        ],
        temperature: 0.7,
        max_tokens: 100,
        n: 1,
    });

    const gptResponse = response.data.choices[0].message.content.trim();
    res.json({ message: gptResponse });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing the request' });
}
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
