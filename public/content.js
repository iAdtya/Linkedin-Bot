// content.ts
(function () {
  let isRunning = true;

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function sendConnections() {
    while (isRunning) {
      const buttons = Array.from(document.querySelectorAll("button")).filter(
        (btn) => btn.innerText === "Connect"
      );

      for (const button of buttons) {
        if (!isRunning) break;

        // Skip if button is not visible
        if (!button.offsetParent) continue;

        try {
          button.click();
          console.log("Clicked Connect");
          // Notify that a connection was successfully sent
          await delay(
            // Math.random() * (10000 - 5000) + 5000
            1000
          );
          
          const sendButton = document.querySelector(
            'button[aria-label="Send without a note"]'
          );
          
          if (sendButton) {
            sendButton.click();
            console.log("Clicked Send without a note");
            chrome.runtime.sendMessage({ action: "connectionSent" });
          } else {
            console.error("Send button not found");
          }
          
        } catch (error) {
          console.error("Failed to send connection:", error);
        }
      }

      // If no more buttons are found, wait before checking again
      await delay(5000);
    }
  }

  // Listen for stop message
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "stop") {
      isRunning = false;
    }
  });

  sendConnections();
})();
