document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const menu = document.getElementById("menu");

    if (!menuButton || !menu) {
        console.error("Menü-Elemente nicht gefunden!");
        return;
    }

    menuButton.addEventListener("click", function () {
        if (menu.classList.contains("hidden")) {
            menu.classList.remove("hidden");
            menu.style.display = "block";
        } else {
            menu.classList.add("hidden");
            menu.style.display = "none";
        }
    });

    document.querySelectorAll("#menu a").forEach(link => {
        link.addEventListener("click", function () {
            document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.classList.remove("hidden");
            }
            menu.classList.add("hidden"); 
            menu.style.display = "none"; 
        });
    });
});
