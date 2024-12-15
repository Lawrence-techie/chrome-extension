document.addEventListener("input", (event) => {
    if (event.target.tagName === "TEXTAREA" || event.target.type === "text") {
        chrome.runtime.sendMessage({ text: event.target.value }, (response) => {
            if (response.contains_curse_words) {
                event.target.style.borderColor = "red";
                alert("Please avoid using offensive language.");
            }
        });
    }
});
