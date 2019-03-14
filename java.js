function getemails(){
    var jsonResponse = JSON.parse(this.responseText);
    var i = 0;
    var myDiv;
    var emailArray = [];


    myDiv = document.getElementById("div1");


    while (i < jsonResponse.length)
    {
        emailArray.push(jsonResponse[i].email);
        i++;
        /*var textNode = document.createTextNode(jsonResponse[i].email);
        myDiv.appendChild(textNode);
        myDiv.innerHTML += "<br>";*/
    }
    i = 0;
    //Alphabetical order
    emailArray.sort();
    while (i < emailArray.length)
    {
        var textNode = document.createTextNode(emailArray[i]);
        myDiv.appendChild(textNode);
        myDiv.innerHTML += "<br>";
        i++;
    }
}

//var - created the variable
var xhttp = new XMLHttpRequest();
//load - we want this function after the page loads "get emails"
xhttp.addEventListener("load", getemails )
//get - recieving the data from the https address
xhttp.open("GET", "https://jsonplaceholder.typicode.com/users")
//send - final, send the request
xhttp.send ();

fetch("https://jsonplaceholder.typicode.com/users")
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    var i = 0;
    var myDiv;
    myDiv = document.getElementById("div2");
    var usernameArray = [];

    while (i < myJson.length)
    {
        usernameArray.push(myJson[i].username);
        i++;
    }
    //SORT ARRAY
    usernameArray = sortByLength(usernameArray);
    i = 0;
    while (i < usernameArray.length)
    {
        var textNode = document.createTextNode(usernameArray[i]);
        myDiv.appendChild(textNode);
        myDiv.innerHTML += "<br>";
        i++;
    }
});

function sortByLength(unsorted)
{
    var sorted = [];
    while (unsorted.length > 0)
    {
       var minimum = 0
       var username = ""
       var i = 0;
       while (i < unsorted.length)
       {
           //if the length is less than the minimum
            if (unsorted[i].length < minimum || minimum == 0)
            {
                //remember its length 
                minimum = unsorted[i].length;
                //rememeber the username as the shortest one
                username = unsorted[i]
            }
            //push username to sorted 
            i++;
        }
        sorted.push(username);
        var indexToRemove = unsorted.indexOf(username);
        unsorted.splice(indexToRemove , 1);
    }
    return sorted;
}


