document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav ul li a").forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let sectionId = this.getAttribute("onclick").match(/'([^']+)'/);
            if (sectionId) {
                showSection(sectionId[1]);
            }
        });
    });
});

function showSection(id) {
    let section = document.getElementById(id);
    if (!section) {
        console.warn(`Warnung: Die Sektion mit der ID "${id}" wurde nicht gefunden.`);
        return;
    }
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    section.classList.remove("hidden");
}

function enlargeImage(img) {
    img.style.transform = img.style.transform === "scale(1.5)" ? "scale(1)" : "scale(1.5)";
}

document.addEventListener("DOMContentLoaded", function () {
    calculateTable();
});

function calculateTable() {
    // Berechnung der Tabelle basierend auf den Ergebnissen
    console.log("Tabelle aktualisiert");
}
