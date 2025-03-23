document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const menu = document.getElementById("menu");

    if (!menuButton || !menu) {
        console.error("❌ Fehler: Menü-Button oder Menü nicht gefunden!");
        return;
    }

    menuButton.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });
});
