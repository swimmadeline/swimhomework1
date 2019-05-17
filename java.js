var newContact = document.getElementById("new");
var indexContact = document.getElementById("index");

newContact.addEventListener("click", newPage);
indexContact.addEventListener("click", indexPage);

if (location.href.includes("index"))
{
    window.onload = readData ();
    newContact.style.opacity = "0.3";
}
else if (location.href.includes("contacts"))
{
    indexContact.style.opacity = "0.3";
}
else
{
    if (location.href.includes("details"))
    {
        window.onload = getDetails();
        document.getElementById("editFromDetails").addEventListener("click", goToEditFromDetails);
        document.getElementById("deleteFromDetails").addEventListener("click", goToDeleteFromDetails)
    }
    else if (location.href.includes("edit"))
    {
        window.onload = getEdit();
    }
    newContact.style.opacity = "0.3";
    indexContact.style.opacity = "0.3";
}

var submitButton = document.getElementById("submit");

if (submitButton != null) {
    submitButton.addEventListener("click", submit);
}
//function for new window/page alert****
function newPage() {
    window.open("contacts.html","_self");
}
function indexPage() {
    window.open("index.html","_self");
}

function submit() {
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var phone = document.getElementById('phone').value

    if (!checkInputs(email, phone) || phone == "" || email == "" || name == "")
    {
        alert("Something went wrong. Try again!")
        return ;
    }
    firebase.database().ref('Contacts/'+ name).set({
        name: name,
        email: email,
        phone: phone
    }, function(error) {
        if (error) {
            console.log(error);
        } else {
            location.href="index.html";
        }
    });

}


function readData ()
{
    var ref = firebase.database().ref('Contacts');
    var index = 0;
    ref.once("value",function(snapshot) {
        snapshot.forEach(function(data) {
        var name = data.val().name;
        var email = data.val().email;
        var phone = data.val().phone;
    
       var table = document.getElementById('myTable');
       
       var tr = document.createElement ("tr");
       
       var td = document.createElement ("td");
       var text = document.createTextNode(index);
       td.appendChild(text);
       tr.appendChild(td);
       
       td = document.createElement ("td");
       text = document.createTextNode(name);
       td.appendChild(text);
       tr.appendChild(td);

       td = document.createElement ("td");
       text = document.createTextNode(email);
       td.appendChild(text);
       tr.appendChild(td);

       td = document.createElement ("td");
       text = document.createTextNode(phone);
       td.appendChild(text);
       tr.appendChild(td);

       var buttonDetails = document.createElement("button");
       var buttonEdit = document.createElement('button');
       var buttonDelete = document.createElement('button');
       buttonDelete.addEventListener("click", function() {confirmDelete(name)});
       buttonDetails.addEventListener("click", function() {goToDetails(name, email, phone)});
       buttonEdit.addEventListener("click", function() {goToEdit(name, email, phone)});

        td = document.createElement("TD");
        td.appendChild(buttonDetails);
        tr.appendChild(td);
        text = document.createTextNode("DETAILS");
        buttonDetails.appendChild(text);
        buttonDetails.setAttribute("class", "details");
    
        td.appendChild(buttonEdit);
        tr.appendChild(td);
        text = document.createTextNode("EDIT"); 
        buttonEdit.appendChild(text);
        buttonEdit.setAttribute("class", "edit");

        td.appendChild(buttonDelete);
        tr.appendChild(td);
        text = document.createTextNode("DELETE"); 
        buttonDelete.appendChild(text);
        buttonDelete.setAttribute("class", "delete");
        confirm
    
       table.appendChild(tr);
            index++;

        });
}, function (error) {
    console.log("Error: " + error.code);
});

}

function deleteContact(name)
{
    firebase.database().ref('Contacts/' + name).remove(
        function(error) {
            if (error) {
                console.log(error);
            }
            else {
                location.href="index.html";
            }
    });
}

function confirmDelete(name) {
var returnValue = confirm('Are you sure ?');
if(returnValue) {
    deleteContact(name);
}

}

function goToDetails(name, email, phone) {
    localStorage.setItem('name', name);  
    localStorage.setItem('email', email);  
    localStorage.setItem('phone', phone);  
    window.open("details.html","_self");
}

function goToEdit(name, email, phone) {
    localStorage.setItem('name', name);  
    localStorage.setItem('email', email);  
    localStorage.setItem('phone', phone);  
    window.open("edit.html","_self");
}

function getEdit()
{
    var getSubmit = document.getElementById ('getSubmit');
    var name = localStorage.getItem('name');
    var email = localStorage.getItem('email');
    var phone = localStorage.getItem('phone');
    getSubmit.addEventListener('click', function() {editSubmit(name)});
    
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone;
}

function getDetails() {
    var name = localStorage.getItem('name');
    var email = localStorage.getItem('email');
    var phone = localStorage.getItem('phone');

    var A = document.getElementById('detailsName')
    var B = document.getElementById('detailsEmail')
    var C = document.getElementById('detailsPhone')

    A.textContent = name;
    B.textContent = email;
    C.textContent = phone;
}

function editSubmit (name) {
    var D = document.getElementById('name').value;
    var E = document.getElementById('email').value;
    var F = document.getElementById('phone').value;

    if (!checkInputs(E, F) || phone == "" || email == "" || name == "")
    {
        alert("Something went wrong. Try again!")
        return ;
    }

    firebase.database().ref('Contacts/' + name).remove(
        function(error) {
            if (error) {
                console.log(error);
            }
            else {
                firebase.database().ref('Contacts/'+ D).set({
                    name: D,
                    email: E,
                    phone: F
                }, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        location.href="index.html";
                    }
                });            
            }
    });
}

function checkInputs(email, phone) {
    if (!checkEmail(email))
        return (0);
    if (!checkPhone(phone))
        return (0);
    return 1;
}

function checkEmail(email)
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function checkPhone(phone)
{
    //Digits only
    var isnum = /^\d+$/.test(phone);
    if (isnum == 0)
        return 0;
    //Length must be 10
    var n = phone.length;
    if (n != 10)
        return 0;
    //Must not start with 0 or 1
    //phone[0]
    if (phone[0] == '0' || phone[0] == '1')
        return 0;
    return 1;
}

function goToEditFromDetails()
{
    var name = document.getElementById("detailsName").textContent;
    var email = document.getElementById("detailsEmail").textContent;
    var phone = document.getElementById("detailsPhone").textContent;

    localStorage.setItem('name', name);  
    localStorage.setItem('email', email);  
    localStorage.setItem('phone', phone);  
    window.open("edit.html","_self");
}

function goToDeleteFromDetails()
{
    var name = document.getElementById("detailsName").textContent;

    confirmDelete(name);
}