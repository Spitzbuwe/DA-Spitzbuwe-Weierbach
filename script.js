document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript wurde geladen.");

    function showOnly(sectionId) {
    let sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.style.display = (section.id === sectionId) ? "block" : "none";
    });
}

    
    window.showOnly = showOnly; // Damit showOnly global verfügbar ist

    // Dropdown-Menü Funktion
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("mouseenter", function () {
            this.querySelector(".dropdown-content").classList.add("visible");
        });
        dropdown.addEventListener("mouseleave", function () {
            this.querySelector(".dropdown-content").classList.remove("visible");
        });
    });
});

