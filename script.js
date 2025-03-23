document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector("nav");
    const menuList = document.querySelector("nav ul");
    
    menu.addEventListener("click", function () {
        menuList.style.display = menuList.style.display === "block" ? "none" : "block";
    });

    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: "smooth"
                });
            }
        });
    });
});
