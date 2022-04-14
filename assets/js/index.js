function isLsSupported() {
    try {
        localStorage.setItem("check", "check");
        localStorage.removeItem("check");
        return true;
    } catch(e) {
        return false;
    }
}


function switchTheme() {
    if(isLsSupported()) {
        var currentTheme = localStorage.currentTheme;
        if(currentTheme === "default") {
            localStorage.currentTheme = "dark";
        }
        else if(currentTheme === "dark") {
            localStorage.currentTheme = "default";
        }
        location.reload();
    }
}


function getAge() {
    var today = new Date();
    var birthDate = new Date("September 17, 2004");
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


window.onload = function() {
    // Theme
    if(isLsSupported()) {
        var currentTheme = localStorage.currentTheme;
        if(!currentTheme) {
            localStorage.currentTheme = "dark";
            currentTheme = "dark";
        }
        if(currentTheme === "default") {
            document.getElementById("default-theme").disabled = false;
            document.getElementById("dark-theme").disabled = true;
        }
        else if(currentTheme === "dark") {
            document.getElementById("dark-theme").disabled = false;
            document.getElementById("default-theme").disabled = true;
        }
    }
    else {
        document.getElementById("dark-theme").disabled = false;
        document.getElementById("default-theme").disabled = true;
        document.getElementById("footer-switchtheme").innerHTML = "";
    }

    // HitCounter Updater
    var hitcounter = document.getElementById("hitcounter");
    if (hitcounter) {
        fetch(
            'https://hitcounter.francescodb.me/count?url=francescodb.me',
            {
                'method': 'GET',
                'credentials': 'include',
            }
        ).then((response) => {
            if (response.status !== 200) {
                console.log("There was a problem with the counter.")
                return;
            }

            response.text().then((text) => {
                hitcounter.innerText = text;
            });
        });
    }
    
    // Calculate and update age
    var age = document.getElementById("age");
    if (age) {
        age.innerHTML = getAge();
    }
}
