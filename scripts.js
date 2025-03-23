document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav ul li a").forEach(item => {
        item.addEventListener("click", function () {
            let sectionId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showSection(sectionId);
        });
    });
});

function showSection(id) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

function enlargeImage(img) {
    img.style.transform = img.style.transform === "scale(1.5)" ? "scale(1)" : "scale(1.5)";
}
