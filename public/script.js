document.getElementById('send-button').addEventListener('click', async () => { const userInput = document.getElementById('user-input'); const chatMessages = document.getElementById('chat-messages');

    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;
    
    // Display the user's message
    chatMessages.innerHTML += `<div class="user-message">${userMessage}</div>`;
    
    // Send the message to the backend and get the GPT response
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });
    
        const data = await response.json();
        const gptMessage = data.message;
    
        // Display the GPT response
        chatMessages.innerHTML += `<div class="gpt-message">${gptMessage}</div>`;
    } catch (error) {
        console.error(error);
    }
    
    // Clear the user input and scroll to the bottom of the chat
    userInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    });