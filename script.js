document.addEventListener("DOMContentLoaded", function () {
    // Dropdown-Menü Funktion
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

// Bildergalerie Vergrößerung
function enlargeImage(event) {
    if (event.target.tagName === 'IMG') {
        let imgSrc = event.target.src;
        let overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';

        let img = document.createElement('img');
        img.src = imgSrc;
        img.style.maxWidth = '80%';
        img.style.maxHeight = '80%';
        img.style.border = '5px solid white';
        img.style.borderRadius = '10px';

        overlay.appendChild(img);
        overlay.addEventListener('click', function () {
            document.body.removeChild(overlay);
        });

        document.body.appendChild(overlay);
    }
}
