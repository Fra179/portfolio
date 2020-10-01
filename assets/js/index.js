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
    if(isLsSupported()) {
        var currentTheme = localStorage.currentTheme;
        if(!currentTheme) {
            localStorage.currentTheme = "default";
            currentTheme = "default";
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
        document.getElementById("default-theme").disabled = false;
        document.getElementById("dark-theme").disabled = true;
        document.getElementById("footer-switchtheme").innerHTML = "";
    }

    // HitCounter Updater
    var req = new XMLHttpRequest();
    req.open("GET", "https://hitcounter.pythonanywhere.com/count?url=francescodb.me", true);
    req.send(null);
    
    // Calculate and update age
    var age = document.getElementById("age");
    if (age) {
        age.innerHTML = getAge();
    }
};
