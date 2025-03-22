document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const menu = document.getElementById("menu");

    if (!menuButton || !menu) {
        console.error("Menü-Elemente nicht gefunden!");
        return;
    }

    menuButton.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });
});
