document.addEventListener("DOMContentLoaded", function () {
    let dropdown = document.querySelector(".dropbtn");
    let menu = document.querySelector(".dropdown-content");

    dropdown.addEventListener("click", function () {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target) && !menu.contains(event.target)) {
            menu.style.display = "none";
        }
    });

    document.querySelectorAll(".dropdown-content a").forEach(link => {
        link.addEventListener("click", function () {
            document.querySelectorAll("section.hidden").forEach(sec => sec.style.display = "none");
            let target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.style.display = "block";
            }
        });
    });
});
