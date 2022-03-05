import * as htmlP from "./easyHtml.js";

const chatInput = htmlP.elemById("chat-input");
const chatDiv = htmlP.elemById("chat-container");
const chatButton = htmlP.elemById("chat-submit");

const nameInput = htmlP.elemById("username-input");
const nameButton = htmlP.elemById("username-submit");
const nameDiv = htmlP.elemById("username-container");
const nameDescr = htmlP.elemById("username-description");
const nameOnline = htmlP.elemById("username-online");

let nameArr;
let name;

function getName() {
  name = nameInput.value;
  if (nameInput.value != "") {
    nameDiv.remove();
  }
}

function sendMsg(msg) {
  if (msg != "") {
    chatInput.value = "";
    chatDiv.innerHTML +=
      "<span><b>" + name + ":</b>" + "<br>" + msg + "<br><br>";

    localStorage.setItem("chat", chatDiv.innerHTML);
  } else {
  }
}

function loadMsg() {
  let msg = htmlP.getStor("chat");

  chatDiv.innerHTML = msg;
}

function startChat() {
  if (htmlP.getStor("chat") != null) {
    loadMsg();
  } else {
    htmlP.getStor("chat", "");
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
  chatDiv.innerHTML += "";
  htmlP.setStor("chat", chatDiv.innerHTML);
}

startChat();
nameButton.addEventListener("click", getName);
nameInput.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    getName();
  }
});
chatButton.addEventListener("click", clickButton);
chatInput.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    clickButton();
  }
});

window.onstorage = loadMsg;
