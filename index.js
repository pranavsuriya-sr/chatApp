import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, remove, onChildAdded, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBoPMXdQNe5H_p4pbyRP3VUcbzd10TNM_s",
    authDomain: "my-test-project-b60d9.firebaseapp.com",
    databaseURL: "https://my-test-project-b60d9-default-rtdb.firebaseio.com",
    projectId: "my-test-project-b60d9",
    storageBucket: "my-test-project-b60d9.appspot.com",
    messagingSenderId: "873407531073",
    appId: "1:873407531073:web:2e07d78cba1f71eb105ec0",
    measurementId: "G-GP98ML0S4Y"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// variables
var msgTxt = document.getElementById('msgTxt');
var sender;
if(sessionStorage.getItem('sender'))
{
    sender = sessionStorage.getItem('sender');
} 
else 
{
    sender = prompt('PLEASE ENTER YOUR NAME');
    sessionStorage.setItem('sender',sender);
}

// TO SEND MESSAGES
module.sendMsg = function sendMsg()
{
    var msg = textMsg.value;
    var timestamp = new Date().getTime();
    set(ref(db,"messages/"+timestamp),{
                msg : msg,
                sender : sender
            })

            textMsg.value="";
}

// TO RECEIVE MSG
onChildAdded(ref(db,"messages"), (data)=>{
if(data.val().sender == sender)
{
    messages.innerHTML += "<div style=justify-content:end class=outer id="+data.key+"><div id=inner class=meSelf>you  <br>"+data.val().msg+"</div><button id=dltMsg onclick=module.dltMsg("+data.key+")>🗑</button></div>";
} 
else 
{
    messages.innerHTML += "<div class=outer id="+data.key+"><div id=inner class=notMes>"+data.val().sender+"  <br>"+data.val().msg+"</div></div>";
}
})




// TO DELETE MSG
module.dltMsg = function dltMsg(key)
{
    remove(ref(db,"messages/"+key));
}

// WHEN MSG IS DELETED
onChildRemoved(ref(db,"messages"),(data)=>{
            var msgBox = document.getElementById(data.key);
            messages.removeChild(msgBox);
        })