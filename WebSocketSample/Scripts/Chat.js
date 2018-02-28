﻿var webSocket;
var nickName;

function doConnect() {
    nickName = document.getElementById("nickName");
    var connectDiv = document.getElementById("connectDiv");
    var messageDiv = document.getElementById("messageInputDiv");
    self.webSocket = new WebSocket("ws://localhost/api/chat?nickName=" + nickName.value);
    self.webSocket.onopen = function () {
        appendHistory("Connected!");
        connectDiv.style.visibility = "hidden";
        messageDiv.style.visibility = "visible";
    }
    self.webSocket.onerror = function () {
        console.log("web socket error");
    }

    self.webSocket.onmessage = function (event) {
        appendHistory(event.data);
    }

    self.webSocket.onclose = function () {
        appendHistory("Disconnected!");
    }
}

function doSend() {
    var message = document.getElementById("message");
    self.webSocket.send(message.value);
    appendHistory(nickName.value + " Says: " + message.value);
}

function doClose() {
    self.webSocket.close();
}

function appendHistory(msg) {
    var outputElement = document.getElementById("outputDiv");
    var itemDiv = document.createElement("div");
    itemDiv.innerText = msg;

    outputElement.appendChild(itemDiv);
}