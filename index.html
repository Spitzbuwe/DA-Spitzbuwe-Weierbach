document.addEventListener("DOMContentLoaded", function () {
    // Funktion zum Anzeigen der gewünschten Sektion
    window.showSection = function (id) {
        document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
        let section = document.getElementById(id);
        if (section) section.classList.remove("hidden");
    };

    // Dropdown-Menü nur beim Klick öffnen
    document.querySelectorAll(".menu-item > a").forEach(menu => {
        menu.addEventListener("click", function (event) {
            event.preventDefault();
            let dropdown = this.nextElementSibling;
            if (dropdown && dropdown.classList.contains("dropdown")) {
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

    // Funktion zum Vergrößern der Bilder in der Galerie
    window.enlargeImage = function (event) {
        if (event.target.tagName === "IMG") {
            let imgSrc = event.target.src;
            let overlay = document.createElement("div");
            overlay.classList.add("image-overlay");
            overlay.innerHTML = `<img src="${imgSrc}" class="large-image">
                                 <span class="close-btn" onclick="this.parentElement.remove()">✖</span>`;
            document.body.appendChild(overlay);
        }
    };

    // Besucherzähler (Lokal gespeichert)
    let count = localStorage.getItem("visitorCount") || 0;
    count++;
    localStorage.setItem("visitorCount", count);
    document.getElementById("visitor-count").innerText = count;
});
