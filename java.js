
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBIlVE7aXATWIS_Y6NkAQKNM5YXhsUNUVA",
    authDomain: "homework6-34af7.firebaseapp.com",
    databaseURL: "https://homework6-34af7.firebaseio.com",
    projectId: "homework6-34af7",
    storageBucket: "homework6-34af7.appspot.com",
    messagingSenderId: "850819103015"
  };
  firebase.initializeApp(config);


var addToListInput = document.getElementById("addToTodoList");
var addToListButton = document.getElementById("addToTodoListButton");

addToListButton.addEventListener("click", function() {addToList(addToListInput.value)})

function addToList(value)
{
    if (value || value.length != 0)
    {
        firebase.database().ref('todolist/' + value).set({
            name : value
        }, function(error) {
            if (error) {
                console.log(error);
            } else {
                location.reload();
            }
        });
    }
    else
        location.reload();
}

function getList()
{
    var ul = document.getElementById("todo");

    firebase.database().ref('todolist').once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            var li = document.createElement("LI");
            var checkbox = document.createElement("INPUT");

            checkbox.setAttribute("type", "checkbox");
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(data.val().name));

            checkbox.addEventListener("change", function(){removeFromTodolist(data.val().name, true)});

            var button = document.createElement("BUTTON");
            button.appendChild(document.createTextNode("Edit"));

            button.addEventListener("click", function() {editMode(data.val().name, li)});

            li.appendChild(button);
            ul.appendChild(li);
        });
    });
}

function removeFromTodolist(name, refresh)
{
    firebase.database().ref('todolist/' + name).remove(
        function(error) {
        if (error) {
            console.log(error);
        } else {
            if (refresh == true)
                location.reload();
        }
    });
}

function editMode(name, li)
{
    var ul = document.getElementById("todo");
    li.textContent = "";

    var checkbox = document.createElement("INPUT");

    checkbox.setAttribute("type", "checkbox");
    li.appendChild(checkbox);

    var input = document.createElement("INPUT");

    li.appendChild(input);

    checkbox.addEventListener("change", function(){removeFromTodolist(name, true)});

    var button = document.createElement("BUTTON");
    button.appendChild(document.createTextNode("Save"));

    button.addEventListener("click", function() {saveEdit(name, input.value)});

    li.appendChild(button);
    ul.appendChild(li);
}

function saveEdit(name, newName)
{
    removeFromTodolist(name, false);
    addToList(newName);
}