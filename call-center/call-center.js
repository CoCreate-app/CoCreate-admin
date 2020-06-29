/* Meme */

/*var memes = [
	'Dude, you smashed my turtle saying "I\'M Rumbiiha swaibu!"',
	'Dude, you grabed seven oranges and yelled "I GOT THE DRAGON BALLS!"',
	'Dude, you threw my hamster across the room and said "PIKACHU I CHOOSE YOU!"',
	'Dude, you congratulated a potato for getting a part in Toy Story',
	'Dude, you were hugging an old man with a beard screaming "DUMBLEDORE YOU\'RE ALIVE!"',
	'Dude, you were cutting all my pinapples yelling "SPONGEBOB! I KNOW YOU\'RE THERE!"',
];*/

var memes1 = [
	'Здравствуйте! А можно подключить WhatsApp к amoCRM?',
	'Да, теперь можно! Вам нужен сервис Wazzup',
	'А что это такое?',
	'Это “надстройка” для WhatsApp Web, чтобы интегрировать его в amoCRM',
	'(задумчивый смайл) И что, все функции WhatsApp будут в Амо?',
	'Именно! Отправляйте сообщения, файлы, фотографии.',
	'Если у вас уже есть номер клиента - напишите ему первым в WhatsApp из amoCRM.',
	'А диалоги сохраняются?',
	'Все диалоги будут записаны в сделке',
	'Наверное, сложно настроить всё это?',
	'Настройка займет 10 минут. А пользоваться будет так же легко, как другими мессенджерами в Амо.',
	'Круто! А триал-версия есть?',
	'Бесплатный пробный период - три дня.',
	'Звучит заманчиво. Надо попробовать!',
	'Окей, пишите, если что! (смайл)'
];

var memes2 = [
	'Здравствуйте! А вы знаете, что теперь из amoCRM можно написать клиентам в WhatsApp?',
	'Ого, прогресс не стоит на месте! А как это сделать?',
	'С помощью сервиса Wazzup. Это “коннектор” меду WhatsApp и amoCRM',
	'И что же он умеет?',
	'С Wazzup вам доступны все функции мессенджера! Отправляйте сообщения. файлы, фото прямо из amoCRM',
	'А написать клиенту первым?',
	'Без проблем. Для начала диалога нужен только телефонный номер в карточке.',
	'И что нужно сделать, чтобы установить такой сервис? Это что, новый модуль amoCRM?',
	'Wazzup - отдельный сервис. Зарегистрируйтесь, и вы сможете с ним работать. С amoCRM делать ничего не нужно, только настроить интеграцию.',
	'А сложно ее настраивать?',
	'Занимает 10 минут. На сайте Wazzup есть подробные инструкции.',
	'Спасибо! А сервис платный?',
	'Да. Но время, сэкономленное для вас и клиентов, стоит этих затрат (смайл ;))',
	'Хммм (задумчивый смайл) А хотя бы пробная версия есть?',
	'Бесплатный пробный период - три дня.',
	'Тогда почему бы и не попробовать (смайл)',
	'Окей, пишите, если что! (смайл)'
];
var allmemes = [memes1, memes2];

var allmemesrandom = Math.floor(Math.random()*(allmemes.length));

console.log('mems random number: ' + Math.floor(Math.random()*(allmemes.length)));

var memes = allmemes[allmemesrandom];

/*var random = document.querySelector('#random');

random.innerHTML = memes[Math.floor(Math.random() * memes.length)];*/

/* Time */

var deviceTime = document.querySelector('.status-bar .time');
var messageTime = document.querySelectorAll('.message .time');

deviceTime.innerHTML = moment().format('h:mm');

setInterval(function() {
	deviceTime.innerHTML = moment().format('h:mm');
}, 1000);

for (var i = 0; i < messageTime.length; i++) {
	messageTime[i].innerHTML = moment().format('h:mm A');
}

/* Message */

var form = document.querySelector('.conversation-compose');
var conversation = document.querySelector('.conversation-container');

form.addEventListener('submit', newMessage);

function newMessage(e) {
	var input = e.target.input;

	if (input.value) {
		var message = buildMessage(input.value);
		conversation.appendChild(message);
		animateMessage(message);
	}

	input.value = '';
	conversation.scrollTop = conversation.scrollHeight;

	e.preventDefault();
}

function buildMessage(text) {
	var element = document.createElement('div');

	element.classList.add('message', 'sent');

	element.innerHTML = text +
		'<span class="metadata">' +
			'<span class="time">' + moment().format('h:mm A') + '</span>' +
			'<span class="tick tick-animation">' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
			'</span>' +
		'</span>';

	return element;
}

/*function animateMessage(message) {
	setTimeout(function() {
		var tick = message.querySelector('.tick');
		tick.classList.remove('tick-animation');
	}, 500);
}*/

function animateMessage(message) {
	setTimeout(function() {
		var tick = message.querySelector('.tick');
		if (tick) {
			tick.classList.remove('tick-animation');
		}
	}, 500);
}

function buildSentMessage(text) {
	var element = document.createElement('div');

	element.classList.add('message', 'sent');

	element.innerHTML = text +
		'<span class="metadata">' +
			'<span class="time">' + moment().format('h:mm A') + '</span>' +
			'<span class="tick tick-animation">' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
			'</span>' +
		'</span>';

	return element;
}

//alert('newAutoMessage');
//function newAutoSentMessage(e) {
//function newAutoSentMessage() {
function newAutoSentMessage(i) {
	//var input = e.target.input;

	//if (input.value) {
		//var message = buildSentMessage(memes[Math.floor(Math.random() * memes.length)]);
		var message = buildSentMessage(memes[i]);
		conversation.appendChild(message);
		animateMessage(message);
	//}

	//input.value = '';
	conversation.scrollTop = conversation.scrollHeight;

	//e.preventDefault();
}

//alert('buildReceivedMessage');
function buildReceivedMessage(text) {
	var element = document.createElement('div');

	element.classList.add('message', 'received');
	element.innerHTML = text +
		'<span class="metadata">'
		'<span class="time">' + moment().format('h:mm A') + '</span>' +
		'</span>';

	return element;
}

//alert('newAutoReceivedMessage');
//function newAutoReceivedMessage(e) {
//function newAutoReceivedMessage() {
function newAutoReceivedMessage(i) {
	//var input = e.target.input;

	//if (input.value) {
		//var message = buildReceivedMessage(memes[Math.floor(Math.random() * memes.length)]);
		var message = buildReceivedMessage(memes[i]);
		conversation.appendChild(message);
		animateMessage(message);
	//}

	//input.value = '';
	conversation.scrollTop = conversation.scrollHeight;

	//e.preventDefault();
}

//alert('newAutoSentMessage Start');
//newAutoSentMessage();
//alert('newAutoSentMessage End');

//alert('newAutoReceivedMessage Start');
//newAutoReceivedMessage();
//alert('newAutoReceivedMessage End');

/*var i = 0;
while(i < 10) {
	setTimeout(newAutoSentMessage(), 2000);
	setTimeout(newAutoReceivedMessage(), 3000);
	i++;
}*/

/*(function theLoop (i) {
  setTimeout(function () {
    //alert("Cheese!");
    if (--i) {          // If i > 0, keep going
      theLoop(i);       // Call the loop again, and pass it the current value of i
    }
  }, 3000);
})(10);*/

/*(function theLoop (i) {
  setTimeout(function () {
    //alert("Cheese!");
	newAutoSentMessage();
    if (--i) {          // If i > 0, keep going
      theLoop(i);       // Call the loop again, and pass it the current value of i
    }
  }, 3000);
})(10);*/


/*(function theLoop (i) {
  setTimeout(function () {
    //alert("Cheese!");
	console.log('i: ' + (memes.length - i) + '; message: ' + memes[memes.length - i]);
	if (i % 2 == 0) {
		newAutoSentMessage(memes.length - i);
	} else {
		newAutoReceivedMessage(memes.length - i);
	}
    if (--i) {          // If i > 0, keep going
      theLoop(i);       // Call the loop again, and pass it the current value of i
    }
  }, (Math.floor(Math.random() * 6) + 1) * 1000);
//})(10);
})(memes.length);
//})(100);*/

console.log('Test Start');
(function theLoop (i) {
  setTimeout(function () {
    //alert("Cheese!");
	console.log('i: ' + (memes.length - i) + '; message: ' + memes[memes.length - i]);
	if (i % 2 == 0) {
		newAutoReceivedMessage(memes.length - i);
	} else {
		newAutoSentMessage(memes.length - i);
	}
    if (--i <= 0) {          // If i > 0, keep going
		i = memes.length;
		conversation.innerHTML = '';
	}
	theLoop(i);
  }, (Math.floor(Math.random() * 10) + 3) * 1000);
//})(10);
})(memes.length);
//})(100);
console.log('Test End');


/*for (var i = 0; i < 10; i++) {

setTimeout(function() {
	newAutoSentMessage();
}, 2000);
	sleep(2000);
setTimeout(function() {
	newAutoReceivedMessage();
}, 3000);
	sleep(3000);
}*/