
function retrieveMessage(content) {
    const messages = localStorage.getItem(content);
    
    if (messages) {
        return JSON.parse(messages);
    } else {
        return [];
    }
}


function storeContent(content, messages) {
    localStorage.setItem(content, JSON.stringify(messages));
}

document.addEventListener('DOMContentLoaded', function () {
    const messageContent1 = document.getElementById('messageContent');
    const messageContent2 = document.getElementById('messageContent2');
    
    const textUser1 = document.getElementById('textUser1');
    const textUser2 = document.getElementById('textUser2');

    const nameUser1 = document.getElementById('nameUser1');
    const nameUser2 = document.getElementById('nameUser2');
    
    const userBtn1 = document.querySelector('#user1 button');
    const userBtn2 = document.querySelector('#user2 button');
    
    userBtn1.addEventListener('click', function () {
        const message = textUser1.value;
        if (message) {
            const messages = retrieveMessage('user1Messages');
            messages.push({ sender: `${nameUser1.value}`, message });
            storeContent('user1Messages', messages);
            
            appendMessage(messageContent1, `${nameUser1.value}`, message);
            appendMessage(messageContent2, `${nameUser1.value}`, message);
            
            textUser1.value = '';
        }
    });
    
    userBtn2.addEventListener('click', function () {
        const message = textUser2.value;
        if (message) {
            const messages = retrieveMessage('user2Messages');
            messages.push({ sender: `${nameUser2.value}`, message });
            storeContent('user2Messages', messages);
            
            appendMessage(messageContent2,  `${nameUser2.value}`, message);
            appendMessage(messageContent1,  `${nameUser2.value}`, message);
            
            textUser2.value = '';
        }
    });
    
    retrieveMessage('user1Messages').forEach(({ sender, message }) => {
        appendMessage(messageContent1, sender, message);
        appendMessage(messageContent2, sender, message);
    });
    
    retrieveMessage('user2Messages').forEach(({ sender, message }) => {
        appendMessage(messageContent2, sender, message);
        appendMessage(messageContent1, sender, message);
    });
});

function appendMessage(container, sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    // messageElement.style.color = 'blue'
    container.appendChild(messageElement);
}
