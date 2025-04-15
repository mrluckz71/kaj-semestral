// LOGIN
// Saves the login state in local storage to users travel list
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "admin" && password === "admin") {
        localStorage.setItem("loggedIn", true);
        window.location.href = "TravelListPage.jsx";
    } else {
        alert("Incorrect username or password!");
    }
});

// // Logout
// document.getElementById("logout").addEventListener("click", function () {
//     localStorage.removeItem("loggedIn");
//     window.location.href = "Login.jsx";
// });