function httpPOST(url, payload){
	var r = new XMLHttpRequest();
	r.open("POST", url, false);
	r.setRequestHeader("Content-Type", "application/json");
	var d = JSON.stringify(payload);
	r.send(d);
	return r.responseText;
}

var userid;
var password;

window.addEventListener("load", function () {
	function sendMessage() {
		var date = new Date();
		var r = new XMLHttpRequest();
		r.addEventListener("error", function(event) {
			alert("Error");
		});
		r.open("POST", "/");
		var content = document.getElementById("content").value;
		r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		if(userid == null){
			alert("You are not logged in");
		} else if(password == null) {
			alert("You are not logged in");
		}
		const data = "content=" + content + "&id=" + userid + "&time=" + date.toISOString() + "&password=" + password;
		r.send(data);
	}
	function login() {
		var email = document.getElementById("email").value;
		var pass = document.getElementById("password").value;

		var r = new XMLHttpRequest();

		r.addEventListener("load", function(event) {
			userid = JSON.parse(event.target.responseText).id;
			password = pass;
		});
		r.addEventListener("error", function(event) {
			alert("Error");
		});

		r.open("POST", "/login");
		r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		const data = "email=" + email + "&password=" + pass;
		r.send(data);
	}
	const _login = document.getElementById("login");
	_login.addEventListener("submit", function(event) {
		event.preventDefault();
		login();
	});
	const _sendMessage = document.getElementById("messagesend");
	_sendMessage.addEventListener("submit", function(event) {
		event.preventDefault();
		sendMessage();
	});
	
});

const Messages = {
	data() {
		return {
			items: JSON.parse(httpPOST("/json", {index: 1, amount: 100})).messages
		}
	},
	methods: {
		pollData () {
			items: setInterval(() => {
				this.items = JSON.parse(httpPOST("/json", {index: 1, amount: 100})).messages
			}, 3000)
		}
	},
	beforeUnmount: function (){
		clearInterval(items)
	},
	created: function () {
		this.pollData()
	}
}

console.log(JSON.parse(httpPOST("/json", {index: 1, amount: 100})).messages);
Vue.createApp(Messages).mount("#messages");
var messages = document.getElementById("messages");
messages.scrollTop = messages.scrollHeight;
