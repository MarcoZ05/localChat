import * as htmlP from "../../../_export/easyHtml.js"

const chatInput = htmlP.elemById("chat-input")
const chatDiv = htmlP.elemById("chat-container")
const chatButton = htmlP.elemById("chat-submit")

const nameInput = htmlP.elemById("username-input")
const nameButton = htmlP.elemById("username-submit")
const nameDiv = htmlP.elemById("username-container")
const nameDescr = htmlP.elemById("username-description")

let name;   

function getName() {
    name = nameInput.value
    if(nameInput.value != ""){
        nameDiv.remove()
        htmlP.cLog(nameInput.value)
        
    }
    htmlP.cLog("w")
}

function sendMsg(msg) {
    if(msg != ""){
        chatInput.value = ""
        chatDiv.innerHTML += "<b>" + name + ":</b>" +"<br>"+ msg + "<br><br>"
        htmlP.setStor("chat",chatDiv.innerHTML)
        htmlP.cLog("Message sent!!")
    }else{
        htmlP.cLog("Message not valide!")
    }
}

function loadMsg() {
    let msg = htmlP.getStor("chat")
    
    chatDiv.innerHTML = msg;
    
    htmlP.cLog("Load Messages done!")
}

function startChat() {
    if(htmlP.getStor("chat") != null){
        loadMsg()
    }else{
        htmlP.getStor("chat","")
    }
}

function clickButton() {
    sendMsg(chatInput.value)
}

function resetChat() {
    chatInput.value = ""
    chatDiv.innerHTML += ""
    htmlP.setStor("chat",chatDiv.innerHTML)
    htmlP.cLog("Messages deleted!")
}

startChat();
nameButton.addEventListener("click",getName)
chatButton.addEventListener("click",clickButton)
window.onstorage = loadMsg
