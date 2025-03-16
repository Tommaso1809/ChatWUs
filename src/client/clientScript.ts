const socket = io();
        const userColors = {};

        function getUsernameColor(username) {
            if (!userColors[username]) {
                const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
                userColors[username] = colors[Math.floor(Math.random() * colors.length)];
            }
            return userColors[username];
        }

        document.getElementById('sendMessage').addEventListener('click', () => {
            const usernameInput = document.getElementById('usernameInput');
            const messageInput = document.getElementById('messageInput');
            
            if (!usernameInput.value.trim()) {
                alert('Please enter your name before sending a message');
                usernameInput.focus();
                return;
            }
            
            if (!messageInput.value.trim()) {
                alert('Please enter a message');
                messageInput.focus();
                return;
            }
            
            const message = {
                user: usernameInput.value,
                text: messageInput.value
            };
            socket.emit('message', message);
            messageInput.value = '';
        });

        socket.on('message', (msg) => {
            const messagesList = document.getElementById('messages');
            const listItem = document.createElement('li');
            
            // Create username element
            const usernameSpan = document.createElement('span');
            usernameSpan.textContent = `${msg.user}:`;
            usernameSpan.style.color = getUsernameColor(msg.user);
            usernameSpan.classList.add('username');
            
            // Create message content element
            const messageDiv = document.createElement('div');
            messageDiv.textContent = msg.text;
            messageDiv.classList.add('message-text');
            
            // Append elements to list item
            listItem.appendChild(usernameSpan);
            listItem.appendChild(messageDiv);
            
            messagesList.appendChild(listItem);
        });