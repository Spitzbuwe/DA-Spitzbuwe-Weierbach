document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const menuList = document.getElementById("menuList");
    const sections = document.querySelectorAll("section.hidden");

    menuButton.addEventListener("click", function () {
        menuList.classList.toggle("hidden");
    });

    menuList.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            sections.forEach(section => section.classList.add("hidden"));
            const targetId = event.target.getAttribute("href").substring(1);
            document.getElementById(targetId).classList.remove("hidden");
            menuList.classList.add("hidden");
        }
    });
});
