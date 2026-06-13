console.log("main loaded");

const BASE = "/Mytholotree/";

async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
        const url = BASE + "components/" + file;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed: " + url);
        }

        el.innerHTML = await res.text();

    } catch (err) {
        console.error(err);
    }
}

function loadCSS(file) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = BASE + file;
    document.head.appendChild(link);
}

document.addEventListener("DOMContentLoaded", () => {
    loadCSS("main.css");

    loadComponent("navbar", "navbar.html");
    loadComponent("footer", "footer.html");
});