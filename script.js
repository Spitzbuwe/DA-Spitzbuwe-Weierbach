document.addEventListener("DOMContentLoaded", function () {
    // Globale Funktion für die Navigation definieren
    window.showSection = function (id) {
        let section = document.getElementById(id);
        if (!section) {
            console.warn(`Warnung: Die Sektion mit der ID "${id}" wurde nicht gefunden.`);
            return;
        }

        // Alle Sektionen ausblenden
        document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
        
        // Angeforderte Sektion anzeigen
        section.classList.remove("hidden");
    };

    // Dropdown-Menü klickbar machen
    document.querySelectorAll(".menu-item > a").forEach(menu => {
        menu.addEventListener("click", function (event) {
            event.preventDefault();
            let dropdown = this.nextElementSibling;
            if (dropdown) {
                dropdown.classList.toggle("show");
            }
        });
    });

    // Klick außerhalb des Dropdowns schließt es
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".menu-item")) {
            document.querySelectorAll(".dropdown").forEach(dropdown => {
                dropdown.classList.remove("show");
            });
        }
    });
});
