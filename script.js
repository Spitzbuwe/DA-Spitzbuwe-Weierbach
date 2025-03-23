document.addEventListener("DOMContentLoaded", function () {
    // Event Listener für Menü-Klicks
    document.querySelectorAll("nav ul li a").forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let sectionId = this.getAttribute("onclick")?.match(/'([^']+)'/);
            if (sectionId) {
                showSection(sectionId[1]);
            }
        });
    });

    // Event Listener für Dropdown-Menü (öffnet erst beim Klick)
    document.querySelectorAll(".menu-item > a").forEach(menu => {
        menu.addEventListener("click", function (event) {
            event.preventDefault();
            let dropdown = this.nextElementSibling;
            if (dropdown) {
                dropdown.classList.toggle("show");
            }
        });
    });

    // Klick außerhalb des Dropdown-Menüs schließt es
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".menu-item")) {
            document.querySelectorAll(".dropdown").forEach(dropdown => {
                dropdown.classList.remove("show");
            });
        }
    });
});

// Funktion zum Anzeigen der gewünschten Sektion
function showSection(id) {
    let section = document.getElementById(id);
    if (!section) {
        console.warn(`Warnung: Die Sektion mit der ID "${id}" wurde nicht gefunden.`);
        return;
    }

    // Alle anderen Sektionen ausblenden
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    
    // Gewählte Sektion anzeigen
    section.classList.remove("hidden");
}
