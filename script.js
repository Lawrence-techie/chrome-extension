document.getElementById("checkButton").addEventListener("click", () => {
    const text = document.getElementById("textArea").value;

    // Debugging: Check if chrome.runtime is available
    if (!chrome.runtime || !chrome.runtime.sendMessage) {
        console.error("chrome.runtime or sendMessage is not available.");
        document.getElementById("result").textContent = "Error: Cannot communicate with the extension.";
        return;
    }

    chrome.runtime.sendMessage({ text }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError.message);
        } else {
            console.log("Response received:", response);
            const resultMessage = response.contains_curse_words
                ? "Contains curse words!"
                : "No curse words found.";
            document.getElementById("result").textContent = resultMessage;
        }
    });
});