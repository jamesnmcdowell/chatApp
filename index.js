const ws = new WebSocket('ws://localhost:3001');
let userList = document.querySelector('.user-list');
let chatBox = document.querySelector('.chat-message-list');
let users = { };



ws.addEventListener('open', function (event) {
    console.log('welcome to the chatroom');
    console.log(event);
});

ws.addEventListener('message', function (ws) {
    let data =  JSON.parse(ws.data);
    if (!(data.id in users)) {
        users[data.id] = data.color;
        console.log('new user added');
        console.log(data.message);
        console.log(data.id);
        let listElem = document.createElement('li');
        listElem.textContent = data.id;
        // listElem.classList.add(data.color);
        listElem.style.color = data.color;
        userList.appendChild(listElem);

        let chat = document.createElement('li');
        chat.style.color = data.color;
        chat.textContent = `${data.id}:${data.message}`;
        chatBox.appendChild(chat);

    }
    else {
        console.log(data.message);
        let chat = document.createElement('li');
        chat.textContent = `${ data.id }: ${ data.message }`;
        chatBox.appendChild(chat); 
    }
    
    
});

document.querySelector('button').addEventListener('click', event => {
    let input = document.querySelector('.form-control');
    ws.send(input.value);
})

//wscat -c ws://localhost:3001
