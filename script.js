document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript geladen.");

    // Funktion zum Anzeigen bestimmter Sektionen
    window.showOnly = function (sectionId) {
        let sections = document.querySelectorAll("section");
        sections.forEach(section => {
            section.style.display = (section.id === sectionId) ? "block" : "none";
        });
    };

    // Galerie Bilder vergrößern
    document.querySelectorAll(".gallery img").forEach(img => {
        img.addEventListener("click", function () {
            let overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.zIndex = "1000";

            let imgClone = document.createElement("img");
            imgClone.src = this.src;
            imgClone.style.maxWidth = "80%";
            imgClone.style.maxHeight = "80%";
            imgClone.style.border = "5px solid white";
            imgClone.style.borderRadius = "10px";

            overlay.appendChild(imgClone);
            overlay.addEventListener("click", function () {
                document.body.removeChild(overlay);
            });

            document.body.appendChild(overlay);
        });
    });

    // Ligatabelle automatisch sortieren
    function sortTable() {
        let table = document.getElementById("ligatabelle
