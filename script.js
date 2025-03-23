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

    calculateTable();
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

function calculateTable() {
    console.log("Tabelle aktualisiert");
}
