// background.ts
let running = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    running = true;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "start" });
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        });
      }
    });
  } else if (message.action === "stop") {
    running = false;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "stop" });
      }
    });

  } else if (message.action === "connectionSent"&& running) {
    // Forward the message to the popup
    chrome.runtime.sendMessage({ action: "connectionSent" });
  }
});
