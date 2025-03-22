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
});
