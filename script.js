document.addEventListener("DOMContentLoaded", function() {
    let menuButton = document.getElementById("menu-button");
    let menu = document.getElementById("menu");

    menuButton.addEventListener("click", function() {
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    });
});
