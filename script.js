document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", function () {
            let dropdown = this.querySelector(".dropdown");
            if (dropdown) {
                dropdown.classList.toggle("show");
            }
        });
    });
});
