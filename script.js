document.addEventListener("DOMContentLoaded", function() {
    let menuButton = document.getElementById("menu-button");
    let menu = document.getElementById("menu");

    // Standardmäßig verstecken (falls noch nicht definiert)
    menu.style.display = "none";

    menuButton.addEventListener("click", function() {
        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "block";  // Menü anzeigen
        } else {
            menu.style.display = "none";   // Menü verstecken
        }
    });
});
