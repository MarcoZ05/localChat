import * as htmlP from "./easyHtml.js";

// zuweisen aller html elemente
const chatInput = htmlP.elemById("chat-input");
const chatDiv = htmlP.elemById("chat-container");
const chatButton = htmlP.elemById("chat-submit");

const nameInput = htmlP.elemById("username-input");
const nameButton = htmlP.elemById("username-submit");
const nameDiv = htmlP.elemById("username-container");
const nameDescr = htmlP.elemById("username-description");
const nameOnline = htmlP.elemById("username-online");

// initialisierung wichtiger globaler variablen
let nameSet = false;
let name;

// checkt bei einreichen des namens und startet den chat
function getName() {
  name = nameInput.value;
  if (nameInput.value != "" && storToArr(nameInput.value, false)[1] == null) {
    nameDiv.remove();
    loadMsg();
    nameSet = true;
  }
}

// checkt bei einreichen der nachricht und schickt sie ab
function sendMsg(msg) {
  if (msg != "") {
    chatInput.value = "";
    chatDiv.innerHTML += "<b>" + name + ":</b>" + "<br>" + msg + "<br><br>";
    htmlP.setStor("chat", chatDiv.innerHTML);
  } else {
  }
}

// läd nachrichten aus dem localStorage
function loadMsg() {
  let msg = htmlP.getStor("chat");
  chatDiv.innerHTML = msg;
  startRefreshName();
}

// name wird in localstorage gebracht um onlineNames zu refreshen
function refreshNames() {
  if (htmlP.getStor("loadUsers")) {
    htmlP.setStor("names", htmlP.getStor("names") + "%" + name);
  } else if (!htmlP.getStor("loadUsers")) {
    // kp wollte hier iwas hinmachen, leider vergessen
  }
}

// satrtet das refreshen der namen auf alle clients (not working)
function startRefreshName() {
  if (htmlP.getStor("loadUsers") == true) {
    refreshNames();
  }
  htmlP.setStor("loadUsers", true);
  htmlP.setStor("names", [name]);
  setTimeout(() => {
    htmlP.setStor("loadUsers", false);
    storToArr(htmlP.getStor("names"), nameOnline);
  }, 100);
}

// localstorage(names) in ein array umgewandelt und geg. auch ausgegeben
function storToArr(str, output) {
  let arr = [""];
  let j = 0;
  for (let i = 0; i != str.length; i++) {
    if (str[i] == "%") {
      j++;
    } else {
      arr[j] += str[i];
    }
  }
  htmlP.cLog(arr);
  if (output != false) {
    output.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
      if (i != 0) {
        output.innerHTML += ", ";
      }
      output.innerHTML += arr[i];
      htmlP.cLog(arr);
    }
  } else {
    return arr;
  }
}

// dev function zum reseten des Chats
function resetChat() {
  chatInput.value = "";
  chatDiv.innerHTML += "";
  htmlP.setStor("chat", chatDiv.innerHTML);
}

// zuweisen von funktionen an Eventlistener
nameButton.addEventListener("click", getName);
nameInput.addEventListener("keypress", function (event) {
  htmlP.cLog(event.key);
  if (event.key == "Enter") {
    getName;
    htmlP.cLog(event.key);
  }
});
chatButton.addEventListener("click", () => {
  sendMsg(chatInput.value);
});
chatInput.addEventListener("keyup", (event) => {
  htmlP.cLog("www");
  if (event.key == "Enter") {
    sendMsg(chatInput.value);
  }
});

window.addEventListener("storage", loadMsg);
