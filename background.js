chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const text = request.text || "";
    if (!text.trim()) {
        console.error("No text provided in the request.");
        sendResponse({ contains_curse_words: false });
        return true;
    }

    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer "API KEY", // Replace with valid OpenAI API key
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Does the following text contain offensive words? "${text}" Respond with yes or no.`,
            max_tokens: 5
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data); // Debugging: Log the full response
        if (!data.choices || data.choices.length === 0) {
            throw new Error("Invalid response: No choices found.");
        }
        const responseText = data.choices[0].text.trim();
        sendResponse({ contains_curse_words: responseText.toLowerCase() === "yes" });
    })
    .catch(error => {
        console.error("Error during API call:", error.message);
        sendResponse({ contains_curse_words: false });
    });

    return true; // Indicates the response will be sent asynchronously
});
