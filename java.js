document.addEventListener('keyup', myHandler);

function myHandler(event) {
    //event.keyCode + = 80 and minus = 77
    // = means you give a variable a value; var i = 2 means i is 2
    // == means you compare the value of two variables; i == 2 means you want to know if i is 2
    // 2 == 2 is true and "2" == 2 is true as well
    // === means you want to compare both the value and the type of two variables
    // 2 === "2" is not true 2 === 2 is true
    var ballon = document.getElementById("ballon");
    var currentSizeOfBallonAsString = window.getComputedStyle(ballon, null).getPropertyValue("font-size");
    var currentSizeOfBallonWithoutPx = currentSizeOfBallonAsString.replace("px", "");
    var currentSizeOfBallonAsInteger = parseInt(currentSizeOfBallonWithoutPx);
    if (event.keyCode == 107)
    {
        currentSizeOfBallonAsInteger += 15;
        if (currentSizeOfBallonAsInteger > 60)
        {
            ballon.innerHTML = "💥";
            //innerHtml is to change an existing html
            removeEventListener();
            return ;
        }
        ballon.style.fontSize = currentSizeOfBallonAsInteger + "px";
    }
    else if (event.keyCode == 109)
    {
        currentSizeOfBallonAsInteger -= 15;
        if (currentSizeOfBallonAsInteger <= 0)
        {
            ballon.innerHTML = "Done";
            removeEventListener();
            return ;
        }
        else {
            ballon.style.fontSize = currentSizeOfBallonAsInteger + "px";
        }
    }
}

function removeEventListener()
{
    document.removeEventListener("keyup", myHandler);
}
