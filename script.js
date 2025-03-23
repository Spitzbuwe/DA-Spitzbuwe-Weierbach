document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".dropbtn");
    const menuContent = document.querySelector(".dropdown-content");

    if (menuButton && menuContent) {
        menuButton.addEventListener("click", function () {
            menuContent.classList.toggle("hidden");
        });
    } else {
        console.error("❌ Fehler: Menü-Button oder Menü nicht gefunden!");
    }
});

function showOnly(sectionId) {
    let sections = ["spieler", "galerie", "sponsoren-list", "spieltag", "ligatabelle", "sonstiges", "aktuelles", "adresse", "kontakt"];
    sections.forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            element.style.display = (id === sectionId) ? "block" : "none";
        }
    });
}
