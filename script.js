// Bilder per Klick vergrößern
document.querySelectorAll(".zoom").forEach(img => {
    img.addEventListener("click", () => {
        if (img.style.transform === "scale(2)") {
            img.style.transform = "scale(1)";
        } else {
            img.style.transform = "scale(2)";
        }
    });
});

// Sanfter Scroll-Effekt für die Navigation
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: "smooth" });
    });
});
