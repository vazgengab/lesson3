// var clickCount = 0;
// function clickHandler(evt){
//    clickCount++;
//    console.log(evt);
//    var str = "Thanks for clicking " + clickCount;
//    this.innerText = str;
// }

// var p = document.getElementById("pElement");
// p.addEventListener("click", clickHandler);

// function bodyClick(evt){
//     console.log("Clicked at X: " + evt.pageX + ", Y: " + evt.pageY);
//  }
//  window.onclick = bodyClick;

//  function windowLoad() {
//     console.log("Window is loaded");
//  }
//  window.onload = windowLoad;

//  function click(evt) {
//     console.log(evt.pageX, evt.pageY);
//  }
//  window.onclick = click;

//  function keydown(evt) {
//     console.log("You printed " + evt.key);
//  }
//  window.onkeydown = keydown;



function main() {
    var socket = io();
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    var del = document.getElementById('del');

    function handleSubmit(evt) {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }

    function handleDelete() {
        socket.emit("delete message");
    }
    button.onclick = handleSubmit;
    del.onclick = handleDelete;

    function handleMessage(msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
    }

    function DeleteFromDom(old) {
        var old = document.getElementsByTagName("p");
        console.log(old);
        for (var i in old) {
            if (old.length > 0) {
                chatDiv.removeChild(old[i]);
            }
        }
    }

    socket.on('display message', handleMessage);
    socket.on('delete from your message', DeleteFromDom);
}

window.onload = main;

