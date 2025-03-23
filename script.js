document.addEventListener("DOMContentLoaded", function () {
    window.showSection = function (id) {
        document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
        let section = document.getElementById(id);
        if (section) section.classList.remove("hidden");
    };

    document.querySelectorAll(".menu-item > a").forEach(menu => {
        menu.addEventListener("click", function (event) {
            event.preventDefault();
            let dropdown = this.nextElementSibling;
            if (dropdown) dropdown.classList.toggle("show");
        });
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".menu-item")) {
            document.querySelectorAll(".dropdown").forEach(dropdown => {
                dropdown.classList.remove("show");
            });
        }
    });

    window.enlargeImage = function (event) {
        if (event.target.tagName === "IMG") {
            let overlay = document.createElement("div");
            overlay.classList.add("image-overlay");
            overlay.innerHTML = `<img src="${event.target.src}" class="large-image">
                                 <span class="close-btn" onclick="this.parentElement.remove()">✖</span>`;
            document.body.appendChild(overlay);
        }
    };

    let count = localStorage.getItem("visitorCount") || 0;
    count++;
    localStorage.setItem("visitorCount", count);
    document.getElementById("visitor-count").innerText = count;
});
