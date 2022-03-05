import * as htmlP from "./easyHtml.js";

const chatInput = htmlP.elemById("chat-input");
const chatDiv = htmlP.elemById("chat-container");
const chatButton = htmlP.elemById("chat-submit");

const nameInput = htmlP.elemById("username-input");
const nameButton = htmlP.elemById("username-submit");
const nameDiv = htmlP.elemById("username-container");
const nameDescr = htmlP.elemById("username-description");
const nameOnline = htmlP.elemById("username-online");

let nameSet = false;
let name;

function getName() {
  name = nameInput.value;
  if (nameInput.value != "") {
    nameDiv.remove();
  }
  nameSet = true;
  startRefreshName();
}

function sendMsg(msg) {
  if (msg != "") {
    chatInput.value = "";
    chatDiv.innerHTML += "<b>" + name + ":</b>" + "<br>" + msg + "<br><br>";
    htmlP.setStor("chat", chatDiv.innerHTML);
  } else {
  }
}

function loadMsg() {
  let msg = htmlP.getStor("chat");
  chatDiv.innerHTML = msg;
  refreshNames();
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

function refreshNames() {
  if (htmlP.getStor("loadUsers")) {
    htmlP.setStor("names", htmlP.getStor("names").push(name));
  } else if (!htmlP.getStor("loadUsers")) {
      // kp wollte hier iwas hinmachen, leider vergessen
  }
}

function startRefreshName() {
  if (htmlP.getStor("loadUsers") == true) {
    refreshNames();
  }
  htmlP.setStor("loadUsers", true);
  htmlP.setStor("names", [name]);
  setTimeout(() => {
    htmlP.setStor("loadUsers", false);
  }, 100);
}

function resetChat() {
  chatInput.value = "";
  chatDiv.innerHTML += "";
  htmlP.setStor("chat", chatDiv.innerHTML);
}

startChat();
nameButton.addEventListener("click", getName);
nameInput.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    getName();
  }
});
chatButton.addEventListener("click", clickButton);
chatInput.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    clickButton();
  }
});

window.onstorage = loadMsg;
