document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const menu = document.getElementById("menu");

    // Überprüfung, ob die Elemente existieren
    if (!menuButton || !menu) {
        console.error("❌ Fehler: Menü-Button oder Menü nicht gefunden!");
        return;
    }

    // Menü-Button klickbar machen
    menuButton.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });
});
