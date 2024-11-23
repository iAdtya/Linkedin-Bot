// document.getElementById('start').addEventListener('click', () => {
//   chrome.runtime.sendMessage({ action: 'start' });
// });

// document.getElementById('stop').addEventListener('click', () => {
//   chrome.runtime.sendMessage({ action: 'stop' });
// });

// chrome.runtime.onMessage.addListener((message) => {
//   if (message.action === 'incrementCounter') {
//     const counterElement = document.getElementById('counter');
//     let count = parseInt(counterElement.innerText, 10);
//     count += 1;
//     counterElement.innerText = count.toString().padStart(2, '0');
//   }
// });