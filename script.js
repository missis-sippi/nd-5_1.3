const ChatApp = require('./chat');

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat = new ChatApp('---------vk');


let chatOnMessage = (message) => {
  console.log(message);
};

let prepareForAnswer = () => {
	console.log('Готовлюсь к ответу...');
};

let chatClosed = () => {
	console.log('Чат вконтакте закрылся :( ');
};


webinarChat.on('message', chatOnMessage);
webinarChat.on('message', prepareForAnswer);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);
vkChat.setMaxListeners(2);
vkChat.on('message', prepareForAnswer);
vkChat.once('close', chatClosed);

// Закрыть вконтакте
setTimeout( ()=> {
	console.log('Закрываю вконтакте...');
	vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
	console.log('Закрываю фейсбук, все внимание — вебинару!');
	facebookChat.removeListener('message', chatOnMessage);
}, 15000 );


// Закрыть вебинар
setTimeout( ()=> {
  console.log('Закрываю вебинар');
  webinarChat.removeListener('message', chatOnMessage);
  //через 30 секунд отписывает chatOnMessage от вебинара webinarChat
  webinarChat.removeListener('message', prepareForAnswer);
}, 30000 );