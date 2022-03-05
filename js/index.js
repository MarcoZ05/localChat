import * as htmlP from "./easyHtml.js";

const chatContainer = document.getElementById("chatContainer");

const chatForm = document.getElementById("messageForm");
const chatInput = document.getElementById("messageInput");

const userModel = document.getElementById("user");
const userForm = document.getElementById("userForm");

let name;

userForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  // set name
  const nameInput = document.getElementById("usernameInput");
  name = nameInput.value;
  // close model
  userModel.classList.add("hidden");
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  sendMsg(chatInput.value);
});

function sendMsg(msg) {
  if (msg != "") {
    chatInput.value = "";
    chatContainer.innerHTML +=
      "<span><b>" + name + ":</b>" + "<br>" + msg + "<br><br>";

    localStorage.setItem("chat", chatContainer.innerHTML);
  } else {
  }
}

function loadMsg() {
  let msg = htmlP.getStor("chat");

  chatContainer.innerHTML = msg;
}

function startChat() {
  if (htmlP.getStor("chat") != null) {
    loadMsg();
  }
}

function clickButton() {
  sendMsg(chatInput.value);
}

function refreshOnlineNames() {
  // lade wenn name eingegeben (getName), localstorage load true => jeder client schickt name ins array ein
}

function resetChat() {
  chatInput.value = "";
  chatContainer.innerHTML += "";
  htmlP.setStor("chat", chatContainer.innerHTML);
}

startChat();

window.onstorage = loadMsg;
