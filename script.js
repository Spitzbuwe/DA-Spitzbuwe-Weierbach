document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript wurde geladen.");

    // Funktion zum Anzeigen bestimmter Sektionen
    function showOnly(sectionId) {
        let sections = ["spieler", "galerie", "sponsoren-list", "spieltag", "ligatabelle", "sonstiges", "aktuelles", "adresse", "kontakt"];
        sections.forEach(id => {
            let element = document.getElementById(id);
            if (element) {
                element.style.display = (id === sectionId) ? "block" : "none";
            }
        });
    }
    
    // Dropdown-Menü Funktion
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });
});
