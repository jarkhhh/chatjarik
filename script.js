let sendButton = document.getElementById('sendButton');
let messageInput = document.getElementById('messageInput');
let messageList = document.getElementById('messageList');
let username ="";
username=localStorage.getItem("username");
if(username === null){
    username = prompt('Enter your username');
    localStorage.setItem('username', username);
}

let otherMessage = `<div class="othermsg">
                <h1>User2</h1>
                <p>Hey, how are you?</p>
                </div>`;
messageList.innerHTML += otherMessage;
sendButton.addEventListener('click', function() {
    
    let message = messageInput.value;
    messageInput.value = '';
    sendMessage(username, message);
    let messageElement = `<div class="msg">
                <h1>${username}</h1>
                <p>${message}</p>
                </div>`;
    messageList.innerHTML += messageElement;
});

  getMessages().then(messages => {
      messageList.innerHTML = '';
      messages.forEach(message => {
          if(message.user === username){
              let messageElement = `<div class="msg">
              <h1>${message.user}</h1>
              <p>${message.message}</p>
              </div>`;
              messageList.innerHTML += messageElement;
              return;
          }
          let messageElement = `<div class="othermsg">
              <h1>${message.user}</h1>
              <p>${message.message}</p>
              </div>`;
          messageList.innerHTML += messageElement;
      });
  }
);


async function sendMessage(username, message) {
    await fetch("https://worker.jaroslav-maksimov-1012.workers.dev/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: username, message: message }),
    });
  }
  
  async function getMessages() {
    const res = await fetch("https://worker.jaroslav-maksimov-1012.workers.dev/messages");
    const messages = await res.json();
    console.log(messages);
    return messages
  }
  
