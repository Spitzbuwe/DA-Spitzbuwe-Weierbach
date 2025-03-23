document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".dropbtn");
    const menu = document.querySelector(".dropdown-content");

    if (!menuButton || !menu) {
        console.error("❌ Fehler: Menü-Button oder Menü nicht gefunden!");
        return;
    }

    menuButton.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });
});

// Funktion zum Anzeigen einzelner Abschnitte
function showOnly(sectionId) {
    let sections = ["spieler", "galerie", "sponsoren-list", "spieltag", "ligatabelle", "sonstiges"];
    sections.forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            element.style.display = (id === sectionId) ? "block" : "none";
        }
    });
}
